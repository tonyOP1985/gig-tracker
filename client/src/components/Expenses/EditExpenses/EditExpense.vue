<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex sm12 md10 offset-md1 lg8 offset-lg2>
        <v-card flat>
          <v-card-title>Edit Expense</v-card-title>
          <v-form @submit.prevent="saveRecord()">
            <v-container>
              <v-layout wrap>
                <v-flex xs6>
                  <v-menu v-model="purchaseDate"
                          :close-on-content-click="false"
                          full-width
                          offset-y
                          max-width="290">
                    <v-text-field slot="activator"
                                  :value="formattedDate"
                                  clearable
                                  readonly
                                  label="Date">
                    </v-text-field>
                    <v-date-picker no-title
                                   v-model="date"
                                   @change="purchaseDate = false">
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6>
                  <v-text-field prefix="$"
                                v-model="expense.total"
                                label="Total Cost">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <div v-if="expense.items.length">
              <EditItem v-for="(item, index) in expense.items" 
                        :key="index" 
                        :itemDetails="item">
              </EditItem>
            </div>
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <v-btn color="primary"
                         block
                         type="submit">
                      Save
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatDate } from '../../../mixins/formatDate.js';

import EditItem from './EditItem';

export default {
  components: {
    EditItem
  },
  mixins: [formatDate],
  data() {
    return {
      purchaseDate: false,
      amount: '',
      date: null
    }
  },
  created() {
    this.date = this.expense.date;
  },
  methods: {
    saveRecord() {
      console.log('Edit Expense / saveRecord got triggerd');
    }
  },
  computed: {
    ...mapGetters({
      expense: 'expenses/get_expense'
    })
  }
}
</script>