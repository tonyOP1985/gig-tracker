import axios from 'axios';
import { AuthenticationException } from '../../exceptions';

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
      await axios.post('/auth/register', {
        ...user
      });
      return {
        type: 'success',
        title: 'Success',
        text: 'User Successfully created.'
      }
    } catch(error) {
      if (error.response.data) {
        throw new AuthenticationException(error.response.data);
      } else {
        throw error;
      }
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
    } catch(error) {
      if (error.response.data) {
        throw new AuthenticationException(error.response.data);
      } else {
        throw error;
      }
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
