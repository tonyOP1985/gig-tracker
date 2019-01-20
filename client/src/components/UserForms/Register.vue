<template>
  <v-card class="rounded-card" flat>
    <v-layout>
      <v-flex>
        <v-card-title class="headline">Sign Up</v-card-title>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Email*"
            type="email"
            v-model="newUser.email"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="First Name*"
            type="text"
            v-model="newUser.firstName"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Last Name*"
            type="text"
            v-model="newUser.lastName"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Password*"
            type="password"
            v-model="newUser.password1"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="Confirm Password*"
            type="password"
            v-model="newUser.password2"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex>
          <v-card-actions>
            <v-btn
              @click="registerUser"
              block
              color="primary">
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-layout class="mt-1">
        <v-flex xs12>
          <v-card-text>
            <p class="text-xs-center">
              Already have an account?
              <router-link to="login">Sign In</router-link>
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

export default {
  name: 'register',
  data() {
    return {
      newUser: {
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    async registerUser() {
      try {
        let newUser = await store.dispatch('authenticate/registerUser', this.newUser);
        this.$router.push({ name: 'login' });
        this.$notify(newUser);
      } catch(error) {
        this.$notify(error.notifyParams);
      };
    }
  }
}
</script>

<style scoped>
  .rounded-card {
    border-radius: 10px;
  }
</style>
