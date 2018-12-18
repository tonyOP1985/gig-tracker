<template>
  <v-content>
    <v-toolbar class="elevation-0 transparent">
      <v-toolbar-title>
        Gig-Tracker
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/splash">Home</v-btn>
        <v-btn flat to="/login">Sign In</v-btn>
        <v-btn flat to="register">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3 md6 offset-md3>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'auth'
}
</script>

<style scoped>
  .v-toolbar__title {
    font-family: 'Oswald', sans-serif;
    font-size: 2em;
    color: #0D47A1;
  }

  .v-toolbar {
    background-color: rgb(250, 250, 250);
  }
</style>

