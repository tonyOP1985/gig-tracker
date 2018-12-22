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

const actions = {};

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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
