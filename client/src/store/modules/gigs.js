import axios from 'axios';
import { formatArrayDates, reduceDates } from '../../lib/date';
import { APIException, HTTPException } from '../../exceptions';


const state = {
  gigs: [],
  gig: {}
};

const getters = {
  get_gigs: state => {
    return state.gigs;
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
  async getGig({ commit, getters }, id) {
    // let gig = await axios.get(`/gigs/${id}`);
    // commit('set_gig', gig.data);
    let gig = getters.get_gigs.find(gig => gig.id === id);
    commit('set_gig', gig);
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
  updateGig({ commit }, gig) {
    commit('update_gig', gig);
  }
};

const mutations = {
  set_gigs(state, data) {
    let gigs = formatArrayDates(data.gigsByYear);
    state.gigs = gigs;
  },
  set_gig(state, data) {
    state.gig = data;
  },
  update_gig(state, gig) {
    state.gig = gig;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
