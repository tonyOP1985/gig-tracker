<template>
  <v-card>
    <v-toolbar color="blue darken-1">
      <v-toolbar-title class="font-weight-bold white--text">Sign in to Gig-Tracker</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Email*"
            type="email"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Password*"
            type="password"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex>
          <v-card-actions>
            <v-btn block color="primary">Sign In</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-layout class="mt-5">
        <v-flex xs12>
          <v-card-text>
            <p class="text-xs-center">
              Don't have an account?
              <router-link to="/register">Sign Up</router-link>
            </p>
            <p class="text-xs-center">
              Forgot your password?
              <router-link to="/reset">Reset It</router-link>
            </p>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'login'
}
</script>
