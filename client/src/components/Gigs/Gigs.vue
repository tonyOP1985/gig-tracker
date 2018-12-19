<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">Gigs</div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/addgig">
        <v-icon class="mr-3">add</v-icon>
        Add Gig
      </v-btn>
    </v-card-title>
    <v-data-table
        v-if="windowWidth > 959"
        :headers="headers"
        :items="get_gigs"
        disable-initial-sort>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>${{ props.item.pay }}</td>
        <td>{{ props.item.venue }}</td>
        <td>{{ props.item.band }}</td>
        <td>{{ props.item.city }}, {{ props.item.state }}</td>
        <td>{{ props.item.mileage }} miles</td>
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

    <v-container v-else-if="windowWidth <= 959" grid-list-sm align-center>
      <v-layout column>
        <v-flex xs12 sm4 offset-sm4
            v-for="(item, index) in get_gigs"
            :key="index">
          <v-card>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Date:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.date }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Pay:</v-list-tile-content>
                <v-list-tile-content class="align-end">${{ item.pay }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Venue:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.venue }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Band:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.band }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Location:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.city }}, {{ item.state }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Mileage:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.mileage }} miles</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-actions>
              <v-btn flat color="green">Edit</v-btn>
              <v-btn flat color="red">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { windowWidth } from '../../mixins/windowWidth.js';

export default {
  name: 'gigs',
  mixins: [windowWidth],
  data() {
    return {
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
  computed: {
    ...mapGetters('gigs', ['get_gigs'])
  }
};
</script>
