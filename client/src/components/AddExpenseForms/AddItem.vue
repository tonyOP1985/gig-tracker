<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex>
        <h3 class="blue--text">{{ item }}</h3>
      </v-flex>
    </v-layout>
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
          prefix="$"
          v-model="amount"
          @keypress="allowOnlyTwoDecimals"
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
    <v-layout>
      <v-flex sm2>
        <v-btn
            flat
            color="green">
          <v-icon class="mr-2">save</v-icon>
          Save Item
        </v-btn>
      </v-flex>
      <v-flex sm2>
        <v-btn
            @click="removeItem(index)"
            flat
            color="red">
          <v-icon class="mr-2">delete</v-icon>
          Revome Item
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '@/store';
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js';

export default {
  name: 'addItem',
  mixins: [decimalMixin, reset],
  props: ['index'],
  data() {
    return {
      item: '',
      amount: '',
      quantity: ''
    }
  },
  methods: {
    removeItem(index) {
      console.log(this.index);
      store.commit('items/remove_item', index);
    }
  }
};
</script>
