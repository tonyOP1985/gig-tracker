<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">Expenses</div>
      <v-spacer></v-spacer>
      <v-btn color="primary" outline round>
        <v-icon class="mr-3">add</v-icon>
        Add Expense
      </v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="get_expenses"
        disable-initial-sort>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>${{ props.item.total }}</td>
        <td>
          {{ props.item.items.length }} Items
          <v-btn 
            :to="{ name: 'expense', params: {id: props.item.id}}"
            v-if="props.item.items.length"
            small>
            View Items
          </v-btn>
        </td>
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
        { text: 'Actions', value: 'id', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('expenses', ['get_expenses'])
  }
}
</script>
