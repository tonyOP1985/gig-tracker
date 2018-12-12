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
          <v-flex
              sm12 lg10 offset-lg1
              v-for="(input, index) in inputs"
              :key="index">
            <v-text-field
              :v-model="input.model"
              :label="input.label">
            </v-text-field>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

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
      },
      inputs : [
        { label: 'First Name', model: 'newUser.firstName' },
        { label: 'Last Name', model: 'newUser.lastName' },
        { label: 'Email', model: 'newUser.email' },
        { label: 'Password', model: 'newUser.password1' },
        { label: 'Confirm Password', model: 'newUser.password2' }
      ]
    }
  },
  methods: {
    async submit() {
      try {
        let user = await axios.post('/auth/register', {
          ...this.newUser
        });
      } catch(err) {
        console.log(err.response);
      }
    }
  }
}
</script>
