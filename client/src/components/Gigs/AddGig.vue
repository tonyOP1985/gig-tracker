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
import { mapGetters } from 'vuex';
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
    async addGig() {
      try {
        this.gig.pay = this.amount;
        this.gig.date = this.date;
        // this.gig.user_id = this.get_user.id;
        this.gig.user_id = 13;
        let newGig = await store.dispatch('gigs/addGig', this.gig);
        await store.dispatch('gigs/getAllGigs');
        this.reset();
        this.$router.push('/gigs');
        this.$notify(newGig);
      } catch (error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      };
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
    },
    ...mapGetters('authenticate', ['get_user'])
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
