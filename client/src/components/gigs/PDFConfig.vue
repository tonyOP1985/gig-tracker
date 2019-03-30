<template>
  <v-card>
    <v-toolbar dark color="blue">
      <v-toolbar-title>Create PDF</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="createPDF">
        <v-layout row wrap justify-center>
          <v-flex xs12 sm4 class="mr-1">
            <v-combobox v-model="year"
                        :items="years"
                        label="Select Year">
            </v-combobox>
          </v-flex>
          <v-flex xs12 sm4 class="ml-1">
            <v-combobox v-model="state"
                        :items="states"
                        label="Select State">
            </v-combobox>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <v-flex xs4>
            <v-btn block
                   type="submit"
                   color="primary"
                   @click="createPDF">
              Export PDF
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      year: '',
      state: ''
    }
  },

  methods: {
    close() {
      this.$emit('close-dialog');
    },

    async createPDF() {
      const userid = 13;
      let query = '';
      if (this.year.length && this.state.length) {
        query = `?userid=${userid}&year=${this.year}&state=${this.state}`;
      } else if (this.year.length) {
        query = `?userid=${userid}&year=${this.year}`;
      } else if (this.state.length) {
        query = `?userid=${userid}&state=${this.state}`;
      }

      this.$emit('create-pdf', query);
      this.close();
    }
  },

  computed: {
    ...mapGetters({
      years: 'gig_years',
      states: 'states'
    })
  }
};
</script>
