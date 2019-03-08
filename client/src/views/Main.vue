<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
      <v-toolbar class="elevation-0" color="blue">
        <router-link to="/">
          <v-toolbar-title class="font-weight-bold white--text">Gig Tracker</v-toolbar-title>
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
    <v-toolbar app color="blue" class="elevation-0" dark>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hamburger"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="font-weight-bold white--text">Gig Tracker</v-toolbar-title>
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
        <v-btn
          flat
          to="/login"
          @click="logout">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </div>
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
          name: 'Dashboard',
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
  async mounted() {
    try {
      let date = new Date();
      let year = date.getFullYear().toString();
      await store.dispatch('gigs/getAllGigs', year);
      await store.dispatch('expenses/getAllExpenses', year);
      await store.dispatch('years/getYears', '13');
    } catch (error) {
      console.log('Main.vue error', error);
    }
  },
  methods: {
    logout() {
      store.dispatch('authenticate/logout');
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
