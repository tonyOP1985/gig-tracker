import Vue from 'vue';
import Router from 'vue-router';
import Splash from './views/Splash.vue';
import Main from './views/Main.vue';
import Home from './views/Home.vue';
import Gigs from './components/Gigs/Gigs.vue';
import Expenses from './components/Expenses/Expenses.vue';
import Expense from './components/Expenses/Expense.vue';
import AddGig from './components/Gigs/AddGig.vue';
import AddExpense from './views/AddExpense.vue';
import Auth from './views/Auth.vue';
import Login from './components/UserForms/Login.vue';
import Register from './components/UserForms/Register.vue';
import ResetPassword from './components/UserForms/ResetPassword.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/splash',
      name: 'splash',
      component: Splash,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      component: Auth,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/reset',
          name: 'reset',
          component: ResetPassword,
        }
      ]
    },
    {
      path: '/',
      component: Main,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
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
