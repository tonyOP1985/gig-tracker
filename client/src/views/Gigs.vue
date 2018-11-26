<template>
  <v-card class="mt-5">
    <v-card-title primary-title>
      <div class="headline">Gigs</div>
      <v-spacer></v-spacer>
      <v-btn>
        <v-icon class="mr-3">add</v-icon>
        Add Gig
      </v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="get_gigs.gigs">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td>${{ props.item.pay }}</td>
        <td>{{ props.item.venue }}</td>
        <td>{{ props.item.band }}</td>
        <td>{{ props.item.city }}, {{ props.item.state }}</td>
        <td>{{ props.item.mileage }} miles</td>
        <v-btn small color="primary">Edit</v-btn>
        <v-btn small color="error">Delete</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';

import DataTable from '../components/DataTable';

export default {
  name: 'gigs',
  components: {
    DataTable
  },
  data() {
    return {
      headers: [
        { text: 'Date', value: false },
        { text: 'Pay', value: false },
        { text: 'Venue', value: false },
        { text: 'Band', value: false },
        { text: 'Location', value: false },
        { text: 'Milage', value: false },
        { text: 'Actions', value: false, sortable: false}
      ]
    }
  },
  computed: {
    ...mapGetters('gigs', ['get_gigs'])
  }
};
</script>
