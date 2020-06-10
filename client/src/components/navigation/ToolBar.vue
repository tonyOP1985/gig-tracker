<template>
  <v-app-bar
    app
    dark 
    color="blue"
    class="elevation-0"
  >
    <v-app-bar-nav-icon @click="drawer = !drawer"/>
    <router-link to="/">
      <v-toolbar-title class="font-weight-bold white--text">Gig Tracker</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="(item, index) in toolbarItems"
             :key="index"
             text
             :to="item.link">
        {{ item.name }}
      </v-btn>
      <v-btn text
             to="/login"
             @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      toolbarItems: [{
          name: 'Dashboard',
          link: '/'
        }, {
          name: 'Gigs',
          link: '/gigs'
        }, {
          name: 'Expenses',
          link: '/expenses'
        }
      ]
    }
  },
  methods: {
    logout() {
      console.log('You clicked this button for some reason.');
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
  .v-toolbar__title {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 2em;
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
