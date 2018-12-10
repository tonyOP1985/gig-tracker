<template>
  <v-container>
    <v-flex sm12 md12 lg8 offset-lg2 class="mb-5">
      <v-card class="pb-3">
        <v-card-title primnary-title>
          <v-layout>
            <v-flex md6>
              <h3 class="blue-text">Date of purchase</h3>
              <h2 class="display-1 mt-3">{{ get_expense.date }}</h2>
            </v-flex>
            <v-flex md7>
              <h3 class="blue-text">Purchase total</h3>
              <h2 class="display-1 mt-3">{{ get_expense.total }}</h2>
            </v-flex>
            <v-flex md3 align-self-start>
              <v-btn to="/expenses" color="primary" outline round>
                Return to Expenses
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="get_expense.items"
            hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.item }}</td>
            <td>{{ props.item.price }}</td>
            <td>{{ props.item.quantity }}</td>
            <td>
              <v-icon
                  small
                  class="mr-2">
                edit
              </v-icon>
              <v-icon small>
                delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  name: 'expense',
  data() {
    return {
      headers: [
        { text: 'Item', value: 'item' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'id' }
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('expenses/getExpense', to.params.id);
    next();
  },
  updated() {
    store.dispatch('expenses/getExpense', this.$route.params.id);
  },
  created() {
    store.dispatch('expenses/getExpense', this.$route.params.id);
  },
  computed: {
    ...mapGetters('expenses', ['get_expense']),
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
