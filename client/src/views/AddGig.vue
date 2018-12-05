<template>
  <v-container>
    <v-flex sm12 md10 offset-md1 lg8 offset-lg2>
      <v-card>
        <v-card-title>
          <h3 class="blue-text">Add New Gig</h3>
        </v-card-title>
        <v-container grid-list-lg>
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

          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="City"
                v-model="gig.city">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-combobox
                v-model="gig.state"
                :items="statesList"
                @change="getAbbreviation"
                label="State"
                clearable>
              </v-combobox>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Milage"
                hint="Milage will be rounded up"
                v-model="gig.mileage">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="Band"
                v-model="gig.band">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Venue"
                v-model="gig.venue">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn outline round color="primary" class="ml-4 mb-3" @click="addGig">Submit</v-btn>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import store from '@/store/store.js';
import moment from 'moment';
import { states } from '../lib/states.js';
import { decimalMixin } from '../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../mixins/reset.js'

export default {
  name: 'addGig',
  mixins: [decimalMixin, reset],
  data() {
    return {
      gigDate: false,
      amount: '',
      usState: '',
      gig: {
        date: '',
        pay: '',
        city: '',
        state: this.usState,
        mileage: '',
        band: '',
        venue: ''
      }
    }
  },
  methods: {
    addGig() {
      this.gig.pay = this.amount;
      store.dispatch('gigs/addGig', this.gig);
      store.dispatch('gigs/getAllGigs');
      this.reset();
      this.$router.push('/gigs');
    },
    getAbbreviation() {
      let getAbbreviation = states.find((state) => {
        if (this.gig.state === state.name) {
          this.gig.state = state.abbreviation;
        }
      });
    }
  },
  computed: {
    formattedDate() {
      return this.gig.date ? moment(this.gig.date).format('MM/DD/YYYY') : '';
    },
    statesList() {
      return states.map(state => state.name);
    }
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
