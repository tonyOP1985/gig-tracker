import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Gigs from './views/Gigs.vue';
import Expenses from './views/Expenses.vue';
import Expense from './views/Expense.vue';
import AddGig from './views/AddGig.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gigs',
      name: 'gigs',
      component: Gigs
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses
    },
    {
      path: '/expenses/:id',
      name: 'expense',
      component: Expense
    },
    {
      path: '/addgig',
      name: 'addGig',
      component: AddGig
    }
  ],
});
