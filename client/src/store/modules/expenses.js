import axios from 'axios';
import { formatArrayDates } from '../../lib/date';
import { APIException } from '../../exceptions';

const state = {
  expenses: null,
  expense: null
};

const getters = {
  get_expenses: state => {
    if (state.expenses) {
      let expenses = formatArrayDates(state.expenses);
      return expenses;
    }
  },
  get_expense: state => {
    return state.expense;
  }
};

const actions = {
  async getAllExpenses({ commit, rootState }, year) {
    try {
      // let user = rootState.authenticate.user;
    // TODO: replace 13 with user.id
      let expenses = await axios.get(`/expenses/${year}/${13}`);
      commit('set_expenses', expenses.data.expensesByYear);
    } catch (error) {
      console.log('expenses error', error);
    }
  },
  async getExpense({ commit }, id) {
    try {
      let expense = await axios.get(`/expenses/expense/${id}`);
      commit('set_expense', expense.data);
    } catch (error) {
      console.log('getExpense error', error);
    }
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
    // let expenses = formatArrayDates(data);
    // state.expenses = expenses;
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