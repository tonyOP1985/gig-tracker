<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
      <v-toolbar flat color="blue darken-4">
        <router-link to="/">
          <v-toolbar-title class="white--text">Gig Tracker</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn flat class="white--text" @click="drawer = !drawer">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="(item, index) in menuItems" :key="index">
          <v-list-tile-action>
            <v-btn :to="item.route" flat>
              <v-icon class="mr-3">{{ item.icon }}</v-icon>
              {{ item.name }}
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="blue darken-4" dark>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hamburger"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text">Gig Tracker</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
            v-for="(item, index) in toolbarItems"
            :key="index"
            flat
            :to="item.link">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import store from '@/store/store.js';

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
    font-family: 'Open Sans', sans-serif;
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

