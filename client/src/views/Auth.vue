<template>
  <v-content class="blue" fill-height>
    <v-toolbar class="elevation-0" color="blue">
      <v-toolbar-title class="font-weight-bold white--text">Gig Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/splash" class="white--text">
          <b>Home</b>
        </v-btn>
        <v-btn flat to="/register" class="white--text">
          <b>Sign Up</b>
        </v-btn>
        <v-btn flat to="/login" class="white--text">
          <b>Sign In</b>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3 md6 offset-md3 lg4 offset-lg4>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'second'
}
</script>

<style scoped>
  .banner {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 3em;
  }

  .v-toolbar__title {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 2em;
  }

  .rounded-card {
    border-radius: 10px;
  }
</style>
