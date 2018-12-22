<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex>
        <h3 class="blue--text">{{ item }}</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <v-text-field
          v-model="item"
          clearable
          label="Item Name">
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          prefix="$"
          v-model="amount"
          @keypress="allowOnlyTwoDecimals"
          clearable
          label="Price">
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
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
            @click="addItemDetails(index)"
            flat
            color="blue accent-1">
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
import { mapGetters } from 'vuex';
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
    },
    addItemDetails(index) {
      let details = this.get_items[index];
      details.item = this.item;
      details.amount = this.amount;
      details.quantity = this.quantity;
      let payload = {
        details,
        index
      };
      store.commit('items/add_details_to_item', payload);
    }
  },
  computed: {
    ...mapGetters('items', ['get_items'])
  }
};
</script>
