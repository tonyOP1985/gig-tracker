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
                label="Total Cost">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <div v-if="items.length">
          <AddItem
            v-for="(item, index) in items"
            :key="index"
            :index="index" />
        </div>
        <v-container>
          <v-layout column>
            <v-flex
                v-if="!items.length"
                xs12>
              <v-btn
                  @click="addItem"
                  block
                  dark
                  color="green">
                <v-icon class="mr-2">add</v-icon>
                Add Item
              </v-btn>
            </v-flex>
            <v-flex
                v-else
                xs12>
              <v-btn
                  @click="addItem"
                  block
                  dark
                  color="green">
                <v-icon class="mr-2">add</v-icon>
                Add Another Item
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn
                  @click="addExpense"
                  block
                  color="primary">
                Submit
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { decimalMixin } from '../../mixins/allowOnlyTwoDecimals.js';
import { reset } from '../../mixins/reset.js';
import { formatDate } from '../../mixins/formatDate.js';

import AddItem from './AddItem';

export default {
  name: 'addexpenseform',
  components: {
    AddItem
  },
  mixins: [decimalMixin, reset, formatDate],
  data() {
    return {
      purchaseDate: false,
      amount: '',
      date: ''
    }
  },
  methods: {
    addItem() {
      store.commit('items/add_item_to_items');
    },
    addExpense() {
      let payload = {
        user_id: this.user.id,
        date: this.date,
        total: this.amount,
        items: this.items
      };

      store.dispatch('expenses/addExpense', payload);
      store.commit('items/clear_items');
      this.reset();
    }
  },
  computed: {
    ...mapGetters({
      items: 'items/get_items',
      user: 'authenticate/get_user'
    })
  }
};
</script>
