import axios from 'axios';
import { formatArrayDates } from '../../lib/date';

const state = {
  gigs: [],
  gig: []
};

const getters = {
  get_gigs: state => {
    return state.gigs;
  },
  get_gig: state => {
    return state.gig;
  }
};

const actions = {
  async getAllGigs({ commit }) {
    let gigs = await axios.get('/gigs');
    commit('set_gigs', gigs.data);
  },
  async getGig({ commit }, id) {
    let gig = await axios.get(`/gigs/${id}`);
    commit('set_gig', gig.data);
  },
  async addGig({ commit }, gig) {
    try {
      let newGig = await axios.post('/gigs', {
        ...gig
      });
    } catch(error) {
      console.log(error.response);
    };
  }
};

const mutations = {
  set_gigs(state, data) {
    let gigs = formatArrayDates(data.gigs);
    state.gigs = gigs;
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
