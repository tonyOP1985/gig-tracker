import axios from 'axios';
import { formatArrayDates, reduceDates, formatDate } from '../../lib/date';
import { APIException, HTTPException } from '../../exceptions';

const state = {
  gigs: [],
  gig: {}
};

const getters = {
  get_gigs: state => {
    let gigs = formatArrayDates(state.gigs);
    return gigs;
  },
  get_gig: state => {
    return state.gig;
  },
  get_years: (state) => {
    return reduceDates(state.gigs);
  }
};

const actions = {
  async getAllGigs({ commit }, year) {
    // let user = rootState.authenticate.user;
    // TODO: Keep this two lines of code
    // replace 13 with user.id
    let gigs = await axios.get(`/gigs/year/${year}/13`);
    commit('set_gigs', gigs.data);
  },
  async getGig({ commit }, id) {
    let gig = await axios.get(`/gigs/${id}`);
    commit('set_gig', gig.data);
  },
  async addGig({ commit }, gig) {
    try {
      await axios.post('/gigs', {
        ...gig
      });
      return {
        group: 'default',
        title: 'Gig Added',
        type: 'success'
      }
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }  
    };
  },
  async updateGig({ commit }, gig) {
    try {
      let id = gig.id;
      await axios.put(`/gigs/${id}`, {
        ...gig
      });
      commit('update_gig', gig);
    } catch (error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }  
    }
  }
};

const mutations = {
  set_gigs(state, data) {
    state.gigs = data.gigsByYear;
  },
  set_gig(state, data) {
    state.gig = data;
  },
  update_gig(state, updatedGig) {
    state.gigs.find((gig, index) => {
      if (gig.id === updatedGig.id) {
        updatedGig.date = formatDate(updatedGig.date);
        state.gigs[index] = updatedGig;
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
