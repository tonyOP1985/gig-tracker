import axios from 'axios';
import { formatArrayDates, reduceDates } from '../../lib/date';
import { APIException, HTTPException } from '../../exceptions';

const state = {
  gigs: null,
  gig: null
};

const getters = {
  get_gigs: state => {
    if (state.gigs) {
      let gigs = formatArrayDates(state.gigs);
      return gigs;
    }
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
    try {
      // let user = rootState.authenticate.user;
      // TODO: Keep this two lines of code
      // replace 13 with user.id
      let gigs = await axios.get(`/gigs/year/${year}/13`);
      commit('set_gigs', gigs.data);
    } catch (error) {
      console.log('getAllGigs error', error);
    }
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
      return {
        group: 'default',
        title: 'Gig Updated',
        type: 'success'
      }
    } catch (error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }  
    }
  },
  async deleteGig({ commit }, id) {
    try {
      await axios.delete(`/gigs/${id}`);
      return {
        group: 'default',
        title: 'Gig Deleted',
        type: 'success'
      }
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
