<template>
  <v-card flat>
    <v-card-title>
      <h3 class="blue-text">Edit Gig</h3>
      <v-spacer></v-spacer>
      <v-btn
          flat
          fab
          @click.stop="closeDialog">
        <v-icon color="grey lighten-1">clear</v-icon>
      </v-btn>
    </v-card-title>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex sm6 xs12>
          <v-menu
              v-model="gigDate"
              :close-on-content-click="false"
              full-width
              offset-y
              max-width="290">
            <v-text-field
              slot="activator"
              :value="formattedDate"
              clearable
              readonly
              label="Date">
            </v-text-field>
            <v-date-picker
              no-title
              reactive
              v-model="date"
              
              @change="gigDate = false">
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex sm6 xs12>
          <!-- <v-text-field
            prefix="$"
            v-model="gig.amount"
            @keypress="allowOnlyTwoDecimals"
            label="Pay">
          </v-text-field> -->
        </v-flex>
        <v-flex sm4 xs6>
          <v-text-field
            label="City"
            v-model="gig.city">
          </v-text-field>
        </v-flex>
        <v-flex sm4 xs6>
          <v-combobox
            v-model="gig.state"
            :items="statesList"
            @change="getAbbreviation"
            label="State"
            clearable>
          </v-combobox>
        </v-flex>
        <v-flex sm4 xs12>
          <v-text-field
            label="Milage"
            hint="Milage will be rounded up"
            v-model="gig.mileage">
          </v-text-field>
        </v-flex>
        <v-flex sm6 xs12>
          <v-text-field
            label="Band"
            v-model="gig.band">
          </v-text-field>
        </v-flex>
        <v-flex sm6 xs12>
          <v-text-field
            label="Venue"
            v-model="gig.venue">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn block color="primary" @click="editGig">Submit</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import store from '@/store';
import moment from 'moment';
import { mapGetters, mapState } from 'vuex';
import { states } from '../../lib/states.js';
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js'
import { formatDate } from '../../mixins/formatDate.js';

export default {
  name: 'editGig',
  mixins: [decimalMixin, reset, formatDate],
  props: ['gig'],
  data() {
    return {
      gigDate: false,
      date: new Date(this.gig.date).toISOString().substr(0, 10)
    }
  },
  methods: {
    editGig() {
      this.gig.date = moment(this.date).format('MM/DD/YYYY');
      console.log(this.gig);
    },
    closeDialog() {
      store.dispatch('dialog/closeDialog');
    },
    getAbbreviation() {
      let getAbbreviation = states.find((state) => {
        if (this.gig.state === state.abbreviation) {
          this.gig.state = state.abbreviation;
        }
      });
    }
  },
  computed: {
    statesList() {
      return states.map(state => state.abbreviation);
    }
  }
};
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
