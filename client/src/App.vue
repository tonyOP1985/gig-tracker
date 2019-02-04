<template>
  <v-app class="white">
    <notifications 
      group="default"
      class="notify"
      position="bottom right"
      :duration="5000"
      :max="1"/>
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
  }
};
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

  /* .notification > .notification-title {
    font-size: 20px;
  } */

  @media screen and (min-width: 959px) {
    .hamburger {
      display: none;
    }
  }
</style>

