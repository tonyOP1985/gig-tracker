import axios from 'axios';
import { formatArrayDates } from '../../lib/date';

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
  getExpense({ commit }, id) {
    let expense = state.expenses.find(expense => expense.id == id);
    commit('set_expense', expense);
  },
  async addExpense({ commit, dispatch }, payload) {
    try {
      let newExpense = await axios.post('/expenses/items', payload);
      dispatch('getAllExpenses');
    } catch(error) {
      this._vm.$notify({
        type: 'error',
        title: 'Error',
        text: error.response.data
      });
    };
  }
};

const mutations = {
  set_expenses(state, data) {
    let expenses = formatArrayDates(data.expenses);
    state.expenses = expenses;
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