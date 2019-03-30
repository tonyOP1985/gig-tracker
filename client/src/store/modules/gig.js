import Axios from 'axios';
import { APIException } from '../../exceptions';
import set from 'lodash.set';

const state = {
  gigs: [],
  gig: {}
};

const getters = {
  gigs: state => {
    return state.gigs;
  },

  gig: state => {
    return state.gig;
  }
};

const actions = {
  async queryGigs({ commit }, url) {
    try {
      let gigs = await Axios.get(`/gigs${url}`);
      commit('set_gigs', gigs.data);
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }  
    }
  },

  async gig({ commit }, id) {
    try {
      let gig = await Axios.get(`/gigs/${id}`);
      commit('set_gig', gig.data);
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }
    }
  },

  async saveGig({ commit }, gig) {
    try {
      gig.user_id = 13;
      await Axios.post('/gigs', gig);
      commit('clearGig'); 
      return {
        group: 'default',
        title: 'Gig Saved',
        type: 'success'
      }
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }
    }
  },

  async saveEditedGig({ commit }, gig) {
    try {
      await Axios.put(`/gigs/${gig.id}`, gig);
      return {
        group: 'default',
        title: 'Gig Saved',
        type: 'success'
      } 
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }
    }
  },

  async deleteGig({ commit }, id) {
    try {
      await Axios.delete(`/gigs/${id}`);
      return {
        group: 'default',
        title: 'Gig Deleted',
        type: 'success'
      }
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }
    }
  },

  updateGig({ commit }, payload) {
    commit('update_gig', payload);
  },

  setGig({ commit }, gig) {
    commit('set_gig', gig);
  },

  clearGig({ commit }) {
    commit('clear_gig');
  }
};

const mutations = {
  set_gigs(state, gigs) {
    state.gigs = gigs;
  },

  set_gig(state, gig) {
    state.gig = gig;
  },

  update_gig(state, payload) {
    set(state, payload.path, payload.newValue);
  },

  clear_gig(state) {
    state.gig = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
