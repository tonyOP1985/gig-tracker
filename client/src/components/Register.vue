<template>
  <v-container lg8 offset-lg2>
    <v-layout column>
      <v-text-field
          v-model="newUser.firstName"
          clearable
          label="First Name">
        </v-text-field>
        <v-text-field
          v-model="newUser.lastName"
          clearable
          label="Last Name">
        </v-text-field>
        <v-text-field
          v-model="newUser.email"
          clearable
          label="Email">
        </v-text-field>
        <v-text-field
          v-model="newUser.password1"
          clearable
          label="Password">
        </v-text-field>
        <v-text-field
          v-model="newUser.password2"
          clearable
          label="Confirm Password">
        </v-text-field>
        <v-btn color="primary" @click="submit">
          Sign Up!
        </v-btn>
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
      }
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
