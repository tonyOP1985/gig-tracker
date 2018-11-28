<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
      <v-toolbar flat>
        <v-toolbar-title>
          Tony Oliver-Paull
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="(item, index) in menuItems" :key="index">
          <v-list-tile-action>{{ item }}</v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="blue" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Gig Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/gigs">
          Gigs
        </v-btn>
        <v-btn flat to="/expenses">
          Expenses
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
        'View Gigs',
        'View Expenses',
        'Sign Up',
        'Sign In'
      ]
    }
  },
  mounted() {
    store.dispatch('gigs/getAllGigs');
    store.dispatch('expenses/getAllExpenses');
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>

