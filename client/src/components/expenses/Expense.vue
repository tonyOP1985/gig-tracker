<template>
  <v-container>
    <v-flex sm12 md12 lg8 offset-lg2 class="mb-5">
      <v-card class="pb-3">
        <v-card-title primnary-title>
          <v-layout wrap>
            <v-flex sm8 xs12 order-xs2>
              <v-layout>
                <v-flex>
                  <h3 class="blue-text">Date of purchase</h3>
                  <h2 class="mt-3">{{ expense.date }}</h2>
                </v-flex>
                <v-flex>
                  <h3 class="blue-text">Purchase total</h3>
                  <h2 class="mt-3">{{ expense.total }}</h2>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="expense.items"
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
import { mapGetters } from 'vuex';

export default {
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

  computed: {
    ...mapGetters({
      expense: 'expense/expense'
    })
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
