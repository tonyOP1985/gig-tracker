<template>
  <div>
    <v-layout>
      <v-container>
        <h2>Hi, {{ userName }}!</h2>
      </v-container>
    </v-layout>
    <v-divider></v-divider>
    <!-- <v-layout> -->
      <v-container>
        <!-- <v-layout column> -->
        <v-flex sm12 md6 class="mb-5">
          <v-card class="pb-3">
            <v-card-title>
              <h3 class="blue-text">Recent Gigs</h3>
              <v-spacer></v-spacer>
              <v-btn to="/addgig" color="primary" outline round>
                <v-icon class="mr-3">add</v-icon>
                Add Gig
              </v-btn>
            </v-card-title>
            <v-list>
              <v-layout 
                  v-for="(gig, index) in get_gigs.slice(0, 3)"
                  :key="index"
                  column>
                <v-list-tile >
                  <v-list-tile-content>
                    <v-container grid-list-lg>
                      <v-layout>
                        <v-flex sm4>
                          <div>{{ gig.date }}</div>
                        </v-flex>
                        <v-flex sm2>
                          <div>${{ gig.pay }}</div>
                        </v-flex>
                        <v-flex sm4 offset-sm1>
                          <div>{{ gig.city }}, {{ gig.state }}</div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-layout>
            </v-list>
            <v-btn to="/gigs" color="primary" class="ml-3" outline round>
              <v-icon class="mr-3">view_list</v-icon>
              View All Gigs
            </v-btn>
          </v-card>
        </v-flex>
        <v-flex sm12 md6>
          <v-card class="pb-3">
            <v-card-title>
              <h3 class="blue-text">Recent Gigs</h3>
              <v-spacer></v-spacer>
              <v-btn to="/addgig" color="primary" outline round>
                <v-icon class="mr-3">add</v-icon>
                Add Gig
              </v-btn>
            </v-card-title>
            <v-list>
              <v-layout 
                  v-for="(gig, index) in get_gigs.slice(0, 3)"
                  :key="index"
                  column>
                <v-list-tile >
                  <v-list-tile-content>
                    <v-container grid-list-lg>
                      <v-layout>
                        <v-flex sm4>
                          <div>{{ gig.date }}</div>
                        </v-flex>
                        <v-flex sm2>
                          <div>${{ gig.pay }}</div>
                        </v-flex>
                        <v-flex sm4 offset-sm1>
                          <div>{{ gig.city }}, {{ gig.state }}</div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-layout>
            </v-list>
            <v-btn to="/gigs" color="primary" class="ml-3" outline round>
              <v-icon class="mr-3">list</v-icon>
              View All Gigs
            </v-btn>
          </v-card>
        </v-flex>
        <!-- </v-layout> -->
      </v-container>
    <!-- </v-layout> -->
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
    ...mapGetters('gigs', ['get_gigs'])
  }
}
</script>

<style scoped>
  .blue-text {
    color: #0D47A1;
  }
</style>

