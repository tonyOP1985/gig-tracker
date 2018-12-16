import axios from 'axios';

const state = {};

const getters = {};

const actions = {
  async registerUser({ commit }, user) {
    let register = await axios.post('/auth/register', {
      ...user
    });
    console.log(register);
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
