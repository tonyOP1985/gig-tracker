<template>
  <v-layout>
    <v-flex xs6>
      <v-menu
          v-model="gigDate"
          :close-on-content-click="false"
          full-width
          max-width="290">
        <v-text-field
          slot="activator"
          :value="formattedDate"
          clearable
          readonly
          label="Date">
        </v-text-field>
        <v-date-picker
          v-model="gig.date"
          @change="gigDate = false">
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        prefix="$"
        v-model="amount"
        @keypress="allowOnlyTwoDecimals"
        label="Pay">
      </v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'dateandpay'
}
</script>
