import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

import gig from './modules/gig';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gigYears: null,
    expenseYears: null,
    states: null
  },

  getters: {
    gig_years: state => {
      return state.gigYears;
    },
  
    expense_years: state => {
      return state.expenseYears;
    },
  
    states: state => {
      return state.states;
    }
  },

  actions: {
    async getYears({ commit }, userid) {
      try {
        let years = await Axios.get(`/years/${userid}`);
        commit('set_gig_years', years.data.gigYears);
        commit('set_expense_years', years.data.expenseYears);
      } catch(error) {
        console.log('getYears', error);
      }
    },
  
    async states({ commit }, userid) {
      try {
        let states = await Axios.get(`/states/${userid}`);
        commit('set_states', states.data);
      } catch(error) {
        console.log('initStates', error);
      }
    }
  },

  mutations: {
    set_gig_years(state, years) {
      state.gigYears = years;
    },
  
    set_expense_years(state, years) {
      state.expenseYears = years;
    },

    set_states(state, states) {
      state.states = states;
    }
  },

  modules: {
    gig
  }
});
