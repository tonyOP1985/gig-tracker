<template>
  <v-content class="blue" fill-height>
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
  name: 'splash'
}
</script>

<style scoped>
  .banner {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 3em;
  }
</style>

