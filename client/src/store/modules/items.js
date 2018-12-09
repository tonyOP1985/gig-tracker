const state = {
  itemsNumber: 0
};

const getters = {
  items_number: state => {
    return state.itemsNumber;
  }
};

const actions = {};

const mutations = {
  add_items_number(state) {
    state.itemsNumber++;
  },
  remove_from_items_number(state) {
    state.itemsNumber--;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
