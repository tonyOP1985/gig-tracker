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
    <v-layout align-center justify-center fill-height column>
      <h1 class="white--text banner text-xs-center">Gig Tracker</h1>
      <div>
        <v-btn
            to="/register"
            large
            outline
            round
            color="white">
          <b>Sign Up</b>
        </v-btn>
        <v-btn
            to="/login"
            large
            outline
            round
            color="white">
          <b>Sign In</b>
        </v-btn>
      </div>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  name: 'homepage'
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
</style>

