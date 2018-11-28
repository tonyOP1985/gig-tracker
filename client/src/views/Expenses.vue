<template>
  <v-card class="mt-5">
    <v-card-title primary-title>
      <div class="headline">Expenses</div>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon class="mr-3">add</v-icon>
        Add Expense
      </v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="get_expenses.expenses"
        disable-initial-sort>
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.date }}</td>
          <td>${{ props.item.total }}</td>
          <td>{{ props.item.items.length }}</td>
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
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-container fluid grid-list-sm>
          <v-card flat>
            <v-data-table
                :headers="itemHeaders"
                :items="props.item.items"
                hide-actions>
              <template slot="items" slot-scope="props">
                <td>{{ props.item.item }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>${{ props.item.price }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-container>
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
        { text: 'Date', value: 'date' },
        { text: 'Total', value: 'total' },
        { text: 'Number of Items', value: 'items' },
        { text: 'Actions', value: false, sortable: false }
      ],
      itemHeaders: [
        { text: 'Item', value: 'item', sortable: false },
        { text:'Quantity', value: 'quantity', sortable: false },
        { text: 'Price', value: 'price', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('expenses', ['get_expenses'])
  }
}
</script>
