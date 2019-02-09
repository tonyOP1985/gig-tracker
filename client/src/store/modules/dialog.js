const state = {
  open: false
};

const getters = {
  is_open: state => {
    return state.open;
  }
};

const actions = {
  openDialog({ commit }) {
    commit('open_dialog');
  },
  closeDialog({ commit }) {
    commit('close_dialog');
  }
};

const mutations = {
  open_dialog(state) {
    state.open = true;
  },
  close_dialog(state) {
    state.open = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
