<template>
  <v-card class="rounded-card" flat>
    <v-layout>
      <v-flex>
        <v-card-title class="headline">Sign In</v-card-title>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Email*"
            type="email"
            v-model="user.email"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Password*"
            type="password"
            v-model="user.password"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex>
          <v-card-actions>
            <v-btn block color="primary" @click="login">Sign In</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-layout class="mt-1">
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
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        let loggedIn = await store.dispatch('authenticate/loginUser', this.user);
        this.$router.push({ name: 'dashboard' });
      } catch(error) {
        this.$notify(error.notifyParams);
      };
    }
  },
  computed: {
    loggedInUser() {
      return this.get_user;
    },
    ...mapGetters('authenticate', ['get_user'])
  }
};
</script>
