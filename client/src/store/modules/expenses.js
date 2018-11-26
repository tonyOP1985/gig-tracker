import axios from 'axios';

const state = {
  expenses: [],
  expense: []
};

const getters = {
  get_expenses: state => {
    return state.expenses;
  },
  get_expense: state => {
    return state.expense;
  }
};

const actions = {
  async getAllExpenses({ commit }) {
    let expenses = await axios.get('/expenses');
    commit('set_expenses', expenses.data);
  },
  async getExpense({ commit }, id) {
    let expense = await axios.get(`/expenses/${id}`);
    commit('set_expense', expense.data);
  }
};

const mutations = {
  set_expenses(state, data) {
    state.expenses = data;
  },
  set_expense(state, data) {
    state.expense = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};