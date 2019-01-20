const state = {
  items: []
};

const getters = {
  items_number: state => {
    return state.itemsNumber;
  },
  get_items: state => {
    return state.items;
  }
};

const actions = {
  removeItem({ commit }, index) {
    commit('remove_item', index);
  },
  addItemToItems({ commit }) {
    commit('add_item_to_items');
  },
  addDetailsToItem({ commit }, payload) {
    commit('add_details_to_item', payload);
  },
  clearItems({ commit }) {
    commit('clear_items');
  }
};

const mutations = {
  remove_item(state, index) {
    state.items.splice(index, 1);
  },
  add_item_to_items(state) {
    let newItem = {};
    state.items.push(newItem);
  },
  add_details_to_item(state, payload) {
    state.items[payload.index] = payload.details;
  },
  clear_items(state) {
    state.items = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
