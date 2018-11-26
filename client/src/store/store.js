import Vue from 'vue';
import Vuex from 'vuex';

import gigs from './modules/gigs';
import expenses from './modules/expenses';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gigs,
    expenses
  },
  strict: debug
});