import Vue from 'vue';
import Vuex from 'vuex';

import gigs from './modules/gigs';
import expenses from './modules/expenses';
import items from './modules/items';
import authenticate from './modules/authenticate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gigs,
    expenses,
    items,
    authenticate
  }
});
