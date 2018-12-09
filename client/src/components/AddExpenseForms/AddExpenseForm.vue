<template>
  <v-layout>
    <v-flex sm12 md10 offset-md1 lg8 offset-lg2>
      <v-card>
        <v-card-title>Add New Expense</v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs6>
              <v-menu
                  v-model="purchaseDate"
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
                  @change="purchaseDate = false">
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
        </v-container>
        <v-layout justify-space-between>
          <v-flex sm3>
            <v-btn
                outline
                round
                color="primary"
                class="ml-4 mb-3">
              Submit
            </v-btn>
          </v-flex>
          <v-flex sm3>
            <v-btn
                outline
                round
                color="primary"
                class="ml-4 mb-3">
              <v-icon class="mr-2">add</v-icon>
              Add Item
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js';
import { formatDate } from '../../mixins/formatDate.js';

export default {
  name: 'addexpenseform',
  mixins: [decimalMixin, reset, formatDate],
  data() {
    return {
      purchaseDate: false,
      amount: '',
      date: '',
      expense: {
        date: '',
        amount: ''
      }
    }
  }
};
</script>
