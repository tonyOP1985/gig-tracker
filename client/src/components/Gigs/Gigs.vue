<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout column>
        <v-layout row xs12>
          <div class="headline">Gigs</div>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/addgig">
            <v-icon class="mr-3">add</v-icon>
            Add Gig
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
              :items="get_gig_years"
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
    <!-- Large screens -->
    <v-data-table
        v-if="windowWidth > 959"
        :headers="headers"
        :items="get_gigs"
        :search="search"
        disable-initial-sort>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>${{ props.item.pay }}</td>
        <td>{{ props.item.venue }}</td>
        <td>{{ props.item.band }}</td>
        <td>{{ props.item.city }}, {{ props.item.state }}</td>
        <td>{{ props.item.mileage }} miles</td>
        <td>
          <v-btn
              flat
              small
              @click.stop="openDialog(props.item)">
            <v-icon
                small
                color="green"
                class="mr-2">
              edit
            </v-icon>
          </v-btn>
          <v-btn
              flat
              small>
            <v-icon
                small
                color="red">
              delete
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <!-- Medium and small screens -->
    <v-data-iterator
        v-else-if="windowWidth <= 959"
        content-class="v-layout"
        :items="get_gigs"
        :rows-per-page-items="[4,8]"
        :pagination.sync="pagination"
        :search="search"
        row
        wrap>
      <v-flex
          slot="item"
          slot-scope="props"
          class="mb-2"
          xs12
          sm6
          offset-sm3>
        <v-card>
          <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Date:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.date }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Pay:</v-list-tile-content>
                <v-list-tile-content class="align-end">${{ props.item.pay }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Venue:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.venue }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Band:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.band }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Location:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.city }}, {{ props.item.state }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Mileage:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mileage }} miles</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-actions>
              <v-btn
                  flat
                  color="green"
                  @click.stop="openDialog(props.item)">
                Edit
              </v-btn>
              <v-btn
                  flat
                  color="red">
                Delete
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-data-iterator>

   
    <v-dialog
        v-model="is_open"
        max-width="600px" 
        persistent>
      <EditGig :gig="gig"/>
    </v-dialog>
  </v-card>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { windowWidth } from '../../mixins/windowWidth.js';

import EditGig from './EditGig';

export default {
  name: 'gigs',
  components: {
    EditGig
  },
  mixins: [windowWidth],
  data() {
    return {
      search: '',
      month: '',
      year: '',
      gig: null,
      windowWidth: 0,
      pagination: {
        rowsPerPage: 4
      },
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Pay', value: 'pay' },
        { text: 'Venue', value: 'venue' },
        { text: 'Band', value: 'band'},
        { text: 'Location', value: 'city' },
        { text: 'Mileage', value: 'mileage' },
        { text: 'Actions', sortable: false}
      ]
    }
  },
  methods: {
    selectedYear() {
      if (this.year) {
        store.dispatch('gigs/getAllGigs', this.year);
      }
    },
    // getGig(id) {
    //   store.dispatch('gigs/getGig', id);
    // },
    openDialog(gig) {
      this.gig = gig;
      store.dispatch('dialog/openDialog');
    }
  },
  computed: {
    ...mapGetters({
      get_gigs: 'gigs/get_gigs',
      get_gig_years: 'years/get_gig_years',
      is_open: 'dialog/is_open'
    })
  }
};
</script>
