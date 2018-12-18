<template>
  <v-app class="white">
    <router-view></router-view>
  </v-app>
</template>

<script>
import store from '@/store';

export default {
  name: 'App',
  data () {
    return {
      search: '',
      drawer: false,
      menuItems: [
        { name: 'View Gigs', icon: 'view_list', route: '/gigs' },
        { name: 'View Expenses', icon: 'list', route: '/expenses' },
        { name: 'Sign Up', icon: 'person', route: '/' },
        { name: 'Sign In', icon: 'person', route: '/' }
      ],
      toolbarItems: [
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'Gigs',
          link: '/gigs'
        },
        {
          name: 'Expenses',
          link: '/expenses'
        },
        {
          name: 'Sign Up',
          link: '/register'
        }
      ]
    }
  },
  mounted() {
    store.dispatch('gigs/getAllGigs');
    store.dispatch('expenses/getAllExpenses');
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }

  #app {
    /* font-family: 'Open Sans', sans-serif; */
    font-family: 'Roboto', sans-serif;
  }

  .v-btn {
    min-width: 24px;
  }

  @media screen and (min-width: 959px) {
    .hamburger {
      display: none;
    }
  }
</style>

