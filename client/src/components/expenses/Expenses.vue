<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout column>
        <v-layout row xs12>
          <div class="headline">Expenses</div>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/addexpense">
            <v-icon class="mr-3">add</v-icon>
            Add Expense
          </v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm4 md2>
            <v-select
              :items="years"
              label="Year"
              single-line
              hide-details
              v-model="year"
              @change="selectedYear">
            </v-select>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="expenses"
        :search="search"
        disable-initial-sort>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>${{ props.item.total }}</td>
        <td>
          {{ props.item.items.length }} Items
          <v-btn small flat>
            <router-link
              :to="{ name: 'expense', params: {id: props.item.id}}"
              v-if="props.item.items.length">
              View Items
            </router-link>
          </v-btn>
        </td>
        <td>
          <v-btn small
                 flat
                 @click="getExpense(props.item.id)">
            <v-icon
                small
                color="green"
                class="mr-2">
              edit
            </v-icon>
          </v-btn>
          <v-btn small flat>
            <v-icon small
                    color="red">
              delete
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { windowWidth } from '../../mixins/windowWidth.js';

export default {
  mixins: [windowWidth],

  data() {
    return {
      year: '',
      search: '',
      windowWidth: 0,
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Total', value: 'total' },
        { text: 'Number of Items', value: 'items' },
        { text: 'Actions', value: 'id', sortable: false }
      ]
    }
  },

  methods: {
    selectedYear() {
      try {
        // NOTE: payload will be changed out before end of development
        let payload = {
          userid: 13,
          year: this.year
        };
        this.$store.dispatch('expense/initExpenses', payload);
      } catch(error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      }
    },
  
    async getExpense(id) {
      try {
        await this.$store.dispatch('expense/expense', id);
        this.$router.push({ name: 'expense' });
      } catch(error) {
        console.log('expense error', error);
      }
    }
  },

  computed: {
    ...mapGetters({
      expenses: 'expense/expenses',
      years: 'expense_years'
    })
  }
};
</script>
