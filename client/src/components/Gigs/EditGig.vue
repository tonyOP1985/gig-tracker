<template>
  <v-layout justify-center>
    <v-flex xs12 sm9 md7>
      <v-card-title>
        <h3 class="blue-text">Edit Gig</h3>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-container grid-list-md>
        <v-form @submit.prevent="updateGig(gig)">
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
              <v-text-field
                prefix="$"
                :value="gig.pay"
                label="Pay">
              </v-text-field>
            </v-flex>
            <v-flex sm4 xs6>
              <v-text-field
                label="City"
                :value="gig.city">
              </v-text-field>
            </v-flex>
            <v-flex sm4 xs6>
              <v-combobox
                :value="gig.state"
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
                :value="gig.mileage">
              </v-text-field>
            </v-flex>
            <v-flex sm6 xs12>
              <v-text-field
                label="Band"
                :value="gig.band">
              </v-text-field>
            </v-flex>
            <v-flex sm6 xs12>
              <v-text-field
                label="Venue"
                :value="gig.venue">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn block color="primary" type="submit">Save</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store';
import moment from 'moment';
import { mapGetters } from 'vuex';
import { states } from '../../lib/states.js';
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js'
import { formatDate } from '../../mixins/formatDate.js';

export default {
  name: 'editGig',
  mixins: [decimalMixin, reset, formatDate],
  data() {
    return {
      gigDate: false,
      date: null
    }
  },
  created() {
    this.date = this.gig.date;
  },
  methods: {
    async updateGig(gig) {
      try {
        gig.date = this.date;
        await store.dispatch('gigs/updateGig', gig);
        this.$router.push({ name: 'gigs' });
      } catch (error) {
        console.log('error', error);
      }
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
    ...mapGetters({
      gig: 'gigs/get_gig'
    })
  }
};
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
