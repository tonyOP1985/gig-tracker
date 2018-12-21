<template>
  <v-container>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card>
        <v-card-title>
          <h3 class="blue-text">Add New Gig</h3>
        </v-card-title>
        <v-container>
          <v-layout column>
            <v-flex xs12>
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
                  v-model="date"
                  @change="gigDate = false">
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prefix="$"
                v-model="amount"
                @keypress="allowOnlyTwoDecimals"
                label="Pay">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="City"
                v-model="gig.city">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="gig.state"
                :items="statesList"
                @change="getAbbreviation"
                label="State"
                clearable>
              </v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Milage"
                hint="Milage will be rounded up"
                v-model="gig.mileage">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Band"
                v-model="gig.band">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Venue"
                v-model="gig.venue">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn block color="primary" @click="addGig">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import store from '@/store';
import { states } from '../../lib/states.js';
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js'
import { formatDate } from '../../mixins/formatDate.js';

export default {
  name: 'addGig',
  mixins: [decimalMixin, reset, formatDate],
  data() {
    return {
      gigDate: false,
      amount: '',
      date: '',
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
      this.gig.date = this.date;
      store.dispatch('gigs/addGig', this.gig);
      store.dispatch('gigs/getAllGigs');
      this.reset();
      this.$router.push('/gigs');
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
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
