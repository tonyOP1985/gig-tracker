import axios from 'axios';
import { formatArrayDates } from '../../lib/date';
import { APIException } from '../../exceptions';

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
  async getAllExpenses({ commit, rootState }, year) {
    // let user = rootState.authenticate.user;
    // TODO: replace 13 with user.id
    let expenses = await axios.get(`/expenses/${year}/${13}`);
    commit('set_expenses', expenses.data.expensesByYear);
  },
  getExpense({ commit }, id) {
    let expense = state.expenses.find(expense => expense.id == id);
    commit('set_expense', expense);
  },
  async addExpense({ dispatch }, payload) {
    try {
      await axios.post('/expenses/items', payload);
      dispatch('getAllExpenses');
      return {
        group: 'default',
        title: 'Expense Added',
        type: 'success'
      }
    } catch(error) {
      if (error.response.data) {
        throw new APIException(error.response.data);
      } else {
        throw error;
      }
    };
  }
};

const mutations = {
  set_expenses(state, data) {
    let expenses = formatArrayDates(data);
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