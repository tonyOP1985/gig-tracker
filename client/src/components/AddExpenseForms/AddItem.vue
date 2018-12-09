<template>
  <v-container>
    <v-layout>
      <v-flex xs6>
        <v-text-field
          v-model="item"
          clearable
          label="Item Name">
        </v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          v-model="amount"
          clearable
          label="Price">
        </v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          v-model="quantity"
          type="number"
          min="1"
          clearable
          label="Item Quantity">
        </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js';

export default {
  name: 'addItem',
  mixins: [decimalMixin, reset],
  data() {
    return {
      item: '',
      amount: '',
      quantity: ''
    }
  }
};
</script>
