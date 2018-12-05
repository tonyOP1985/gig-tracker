<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">Gigs</div>
      <v-spacer></v-spacer>
      <v-btn color="primary" outline round to="/addgig">
        <v-icon class="mr-3">add</v-icon>
        Add Gig
      </v-btn>
    </v-card-title>
    <v-data-table
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
  </v-card>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';

export default {
  name: 'gigs',
  data() {
    return {
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
