import axios from 'axios';

const state = {
  user: null,
  token: null
};

const getters = {
  get_user: state => {
    return state.user;
  }
};

const actions = {
  async registerUser({ commit }, user) {
    try {
      let register = await axios.post('/auth/register', {
        ...user
      });
      console.log(register);
      this._vm.$notify({
        type: 'success',
        title: 'Success',
        text: 'User Successfully created.'
      });
    } catch(error) {
      this._vm.$notify({
        type: 'error',
        title: 'Error',
        text: error.response.data
      });
    };
  },
  async loginUser({ commit }, user) {
    try {
      let loggedInUser = await axios.post('/auth/login', {
        ...user
      });
      commit('set_user', loggedInUser.data.user);
      commit('set_token', loggedInUser.data.token);
      localStorage.setItem('token', loggedInUser.data.token);
      this._vm.$notify({
        type: 'success',
        title: 'Success',
        text: loggedInUser.data.message
      });
    } catch(error) {
      this._vm.$notify({
        type: 'error',
        title: 'Error',
        text: error.response.data
      });
    };
  },
  logout({ commit }) {
    commit('clear_user');
    commit('clear_token');
    localStorage.removeItem('token');
  }
};

const mutations = {
  set_user(state, user) {
    state.user = user;
  },
  clear_user(state) {
    state.user = null;
  },
  set_token(state, token) {
    state.token = token;
  },
  clear_token(state) {
    state.token = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
