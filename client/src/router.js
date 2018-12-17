import Vue from 'vue';
import Router from 'vue-router';
import Splash from './views/Splash.vue';
import LoginUser from './views/LoginUser.vue';
import Main from './views/Main.vue';
import Home from './views/Home.vue';
import Gigs from './views/Gigs.vue';
import Expenses from './views/Expenses.vue';
import Expense from './views/Expense.vue';
import AddGig from './views/AddGig.vue';
import AddExpense from './views/AddExpense.vue';
import RegisterUser from './views/RegisterUser.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/splash',
      name: 'splash',
      component: Splash
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    },
    {
      path: '/register',
      name: 'registerUser',
      component: RegisterUser
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          component: Home,
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
          path: '/expense/:id',
          name: 'expense',
          component: Expense
        },
        {
          path: '/addgig',
          name: 'addGig',
          component: AddGig
        },
        {
          path: '/addexpense',
          name: 'addExpense',
          component: AddExpense
        }
      ]
    }
  ]
});
