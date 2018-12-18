<template>
  <v-card class="rounded-card" flat>
    <v-layout>
      <v-flex>
        <v-card-title class="headline">Reset Password</v-card-title>
      </v-flex>
    </v-layout>
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
      <v-layout class="mt-3">
        <v-flex>
          <v-card-actions>
            <v-btn block color="primary">
              Send
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'reset'
}
</script>
