<template>
  <v-card>
    <v-card-title class="blue white--text elevation-0">
      Create PDF
      <v-spacer />
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-form @submit.prevent="createPDF">
      <v-card-text>
        <v-row>
          <v-col>
            <v-select 
              v-model="year"
              :items="years"
              label="Select Year"
            />
          </v-col>
          <v-col>
            <v-select 
              v-model="state"
              :items="states"
              label="Select State"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          block
          type="submit"
          color="primary"
          @click="createPDF"
        >
          Export PDF
        </v-btn>
      </v-card-actions>
    </v-form>
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
