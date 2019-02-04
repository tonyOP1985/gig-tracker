import axios from 'axios';
import { formatArrayDates, reduceDates } from '../../lib/date';
import { APIException, HTTPException } from '../../exceptions';

const gigsByYear = (gigs, year) => {
  return gigs.filter((gig) => {
    return gig.date.substring(gig.date.length - 4) === year;
  });
};

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
  }
};

const mutations = {
  set_gigs(state, data) {
    let gigs = formatArrayDates(data.gigsByYear);
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
