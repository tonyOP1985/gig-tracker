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
                  v-model="date"
                  @change="gigDate = false">
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prefix="$"
                v-model="pay"
                @keypress="allowOnlyTwoDecimals"
                label="Pay">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="City">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-combobox
                v-model="usState"
                :items="statesList"
                @change="getAbbreviation"
                label="State"
                clearable>
              </v-combobox>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Milage"
                hint="Milage will be rounded up">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6>
              <v-text-field
                label="Band">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Venue">
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
import moment from 'moment';
import { states } from '../lib/states.js';
import { decimalMixin } from '../mixins/allowOnlyTwoDecimals.js';

export default {
  name: 'addGig',
  mixins: [decimalMixin],
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      gigDate: false,
      pay: '',
      usState: ''
    }
  },
  methods: {
    addGig() {
      //
    },
    getAbbreviation() {
      let getAbbreviation = states.find((state) => {
        if (this.usState === state.name) {
          this.usState = state.abbreviation;
        }
      });
    }
  },
  computed: {
    formattedDate() {
      return this.date ? moment(this.date).format('MM/DD/YYYY') : '';
    },
    statesList() {
      return states.map(state => state.name);
    },
    twoDecimals(value) {
      this.pay = parseFloat(this.pay).toFixed(2);
      console.log(this.pay);
    }
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
