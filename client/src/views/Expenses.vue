<template>
  <v-card class="mt-5">
    <v-card-title>Expenses</v-card-title>
    <v-data-table
        :headers="headers"
        :items="get_expenses.expenes"
        hide-actions>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>${{ props.item.total }}</td>
        <td>{{ props.item.items.length }}</td>
        <v-btn small color="primary">Edit</v-btn>
        <v-btn small color="error">Delete</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';

export default {
  name: 'expenses',
  data() {
    return {
      headers: [
        { text: 'Date', value: false},
        { text: 'Total', value: false },
        { text: 'Number of Items', value: false },
        { text: 'Actions', value: false, sortable: false }
      ],
      expenseData: {}
    }
  },
  computed: {
    expenses() {
      return this.get_expenses.expenses;
    },
    ...mapGetters('expenses', ['get_expenses'])
  }
}
</script>
