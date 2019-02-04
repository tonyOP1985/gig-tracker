import axios from "axios";

const state = {
  years: []
};

const getters = {
  get_years: state => {
    return state.years.years;
  }
};

const actions = {
  async getYears({ commit }, id) {
    let years = await axios.get(`/years/${id}`);
    commit('set_years', years.data);
  }
};

const mutations = {
  set_years(state, years) {
    state.years = years;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
