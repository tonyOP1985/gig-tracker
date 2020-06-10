import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue';
import Gigs from './components/gigs/Gigs.vue';
import EditScreen from './components/gigs/edit/EditScreen.vue';
import NewScreen from './components/gigs/edit/NewScreen.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          redirect: { name: 'gigs' }
        },
        {
          path: '/gigs',
          name: 'gigs',
          component: Gigs
        },
        // {
        //   path: '/gig/edit/:id',
        //   name: 'editGig',
        //   component: EditScreen
        // },
        // {
        //   path: '/gig/new',
        //   name: 'addGig',
        //   component: NewScreen
        // }
      ]
    }
  ]
})
