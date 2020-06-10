<template>
  <v-card>
    <v-card-title>
      <v-row justify="space-between" no-gutters>
        <v-col col="12" md="6">
          <v-row>
            <span class="pl-2">Expenses</span>
          </v-row>
        </v-col>
        <v-col col="12" md="6">
          <v-row justify="end" class="pr-2">
            <v-btn color="primary" :to="{ name: 'addexpense' }">
              <v-icon class="mr-3">add</v-icon>
              Add Expense
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="px-0">
      <v-row justify="space-between" class="mx-1">
        <v-col col="12" md="4">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            hide-details
          />
        </v-col>
        <v-col col="12" md="4">
          <v-select
            :items="years"
            label="Year"
            hide-details
            v-model="year"
            @change="selectedYear"
          />
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="expenses"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="getExpense(item.id)"
          >
            edit
          </v-icon>
          <v-icon small class="mr-2">delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
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
