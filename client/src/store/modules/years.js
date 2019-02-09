import axios from "axios";
import { APIException, HTTPException } from '../../exceptions';

const state = {
  gigYears: [],
  expenseYears: []
};

const getters = {
  get_gig_years: state => {
    return state.gigYears;
  },
  get_expense_years: state => {
    return state.expenseYears;
  }
};

const actions = {
  async getYears({ commit }, id) {
    try {
      let years = await axios.get(`/years/${id}`);
      commit('set_gig_years', years.data.years.gigYears);
      commit('set_expense_years', years.data.years.expenseYears);
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
  set_gig_years(state, years) {
    state.gigYears = years;
  },
  set_expense_years(state, years) {
    state.expenseYears = years;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
