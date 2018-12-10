const state = {
  items: [],
  item: {
    item: '',
    amount: '',
    quantity: ''
  }
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
