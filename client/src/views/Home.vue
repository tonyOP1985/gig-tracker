<template>
  <div>
    <v-layout>
      <v-container>
        <h2>Hi, {{ userName }}!</h2>
      </v-container>
    </v-layout>
    <v-divider></v-divider>
    
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex sm12 md6 class="mb-5">
          <v-card class="pb-3">
            <v-container>
              <v-card-title>
                <h4 class="blue-text display-1">Gigs</h4>
              </v-card-title>
              <v-divider></v-divider>
                <v-layout>
                  <v-container grid-list-lg>
                    <span class="title mb-5">Most Recent Gig</span>
                    <v-layout>
                      <v-flex sm4>
                        <div>{{ recentGig.date }}</div>
                      </v-flex>
                      <v-flex sm4>
                        <div>${{ recentGig.pay }}</div>
                      </v-flex>
                      <v-flex sm41>
                        <div>{{ recentGig.city }}, {{ recentGig.state }}</div>
                      </v-flex>
                    </v-layout>
                    <router-link
                      :to="{ name: 'gigs'}">
                      View Gig Details
                    </router-link>
                  </v-container>
                  <v-divider></v-divider>
                </v-layout>
              <v-card-actions>
                <v-btn
                    :to="{ name: 'gigs' }"
                    color="primary"
                    class="ml-3"
                    flat>
                  View All Gigs
                </v-btn>
                <v-btn
                    :to="{ name: 'addgig' }"
                    color="primary"
                    flat>
                  Add Gig
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>


        <v-flex sm12 md6 class="mb-5">
          <v-card class="pb-3">
            <v-container>
              <v-card-title>
                <h4 class="blue-text display-1">Expenses</h4>
              </v-card-title>
              <v-divider></v-divider>
                <v-layout>
                  <v-container grid-list-lg>
                    <span class="title mb-5">Most Recent Expense</span>
                    <v-layout>
                      <v-flex sm4>
                        <div>{{ recentExpense.expense.date }}</div>
                      </v-flex>
                      <v-flex sm4>
                        <div>${{ recentExpense.expense.total }}</div>
                      </v-flex>
                      <v-flex sm4 v-if="recentExpense.items === 1">
                        <div>{{ recentExpense.items }} item</div>
                      </v-flex>
                      <v-flex sm4 v-else-if="recentExpense.items > 1">
                        <div>{{ recentExpense.items }} items</div>
                      </v-flex>
                      <v-flex sm4 v-else>
                        <div>{{ recentExpense.items }} item</div>
                      </v-flex>
                    </v-layout>
                    <router-link
                      :to="{ name: 'expense', params: {id: recentExpense.expense.id}}">
                      View Expense Details
                    </router-link>
                  </v-container>
                  <v-divider></v-divider>
                </v-layout>
              <v-card-actions>
                <v-btn
                    :to="{ name: 'expenses' }"
                    color="primary"
                    class="ml-3"
                    flat>
                  View All Expenses
                </v-btn>
                <v-btn
                    :to="{ name: 'addexpenses' }"
                    color="primary"
                    flat>
                  Add Expense
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      userName: 'Juvia'
    }
  },
 computed: {
   recentGig() {
     return this.get_gigs[0];
   },
   recentExpense() {
     return {
       expense: this.get_expenses[0],
       items: this.get_expenses[0].items.length
     }
   },
    ...mapGetters({
      get_gigs: 'gigs/get_gigs',
      get_expenses: 'expenses/get_expenses'
    })
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>
