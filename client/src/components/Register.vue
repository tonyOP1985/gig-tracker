<template>
  <v-container sm12>
    <v-layout row wrap>
      <v-flex lg4>
        <v-card>
          <v-card-title>
            <h3>Sign Up!</h3>
            <v-spacer></v-spacer>
            <router-link to="/register">Log In</router-link>
          </v-card-title>
          <v-flex sm12 lg10 offset-lg1>
            <v-text-field
              v-model="newUser.firstName"
              label="First Name">
            </v-text-field>
             <v-text-field
              v-model="newUser.lastName"
              label="Last Name">
            </v-text-field>
             <v-text-field
              v-model="newUser.email"
              label="Email">
            </v-text-field>
             <v-text-field
              v-model="newUser.password1"
              label="Password">
            </v-text-field>
             <v-text-field
              v-model="newUser.password2"
              label="Confirm Password">
            </v-text-field>
          </v-flex>
          <v-btn
              @click="submit"
              color="primary"
              class="ml-4"
              outline
              round>
            Sign Up!
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  name: 'register',
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    async submit() {
      store.dispatch('authenticate/registerUser', this.newUser);
    }
  }
}
</script>
