<template>
  <v-card>
    <v-dialog v-model="dialog" width="500">
      <PDFConfig @close-dialog="dialog = false" @create-pdf="exportPDF" />
    </v-dialog>
    <v-card-title primary-title>
      <v-layout column>
        <v-layout row xs12>
          <div class="headline pt-2">Gigs</div>
          <v-btn flat
                 color="primary"
                 @click="dialog = true">
            Create PDF
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :to="{ name: 'addGig' }">
            <v-icon class="mr-3">add</v-icon>
            Add Gig
          </v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-text-field v-model="search"
                          append-icon="search"
                          label="Search"
                          single-line
                          hide-details>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm4 md2>
            <v-select :items="years"
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
    <v-data-table v-if="windowWidth > 959"
                  :headers="headers"
                  :items="gigs"
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
          <v-btn flat
                 small
                 @click="getGig(props.item.id)">
            <v-icon small
                    color="green"
                    class="mr-2">
              edit
            </v-icon>
          </v-btn>
          <v-btn flat small>
            <v-icon small
                    color="red"
                    @click="deleteGig(props.item.id)">
              delete
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <!-- Medium and small screens -->
    <v-data-iterator v-else-if="windowWidth <= 959"
                     content-class="v-layout"
                     :items="gigs"
                     :rows-per-page-items="[4,8]"
                     :pagination.sync="pagination"
                     :search="search"
                     row
                     wrap>
      <v-flex slot="item"
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
            <v-btn flat
                   color="green"
                   @click="getGig(props.item.id)">
              Edit
            </v-btn>
            <v-btn flat
                   color="red"
                   @click="deleteGig(props.item.id)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-card>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import store from '@/store';
import { mapGetters } from 'vuex';
import { windowWidth } from '../../mixins/windowWidth.js';

import PDFConfig from './PDFConfig';

export default {
  name: 'gigs',

  components: {
    PDFConfig
  },

  mixins: [windowWidth],

  data() {
    return {
      search: '',
      month: '',
      year: '',
      gig: null,
      date: null,
      dialog: false,
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
      ],
      pdfColumns: [
        { title: 'Date', dataKey: 'date' },
        { title: 'Pay', dataKey: 'pay' },
        { title: 'Venue', dataKey: 'venue' },
        { title: 'Band', dataKey: 'band' },
        { title: 'City', dataKey: 'city' },
        { title: 'State', dataKey: 'state' },
        { title: 'Mileage', dataKey: 'mileage' }
      ]
    }
  },

  methods: {
    selectedYear() {
      try {
        // NOTE: hard coded userid to be removed later
        const url = `?userid=${13}&year=${this.year}`;
        store.dispatch('gig/queryGigs', url);
      } catch(error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      }
    },

    async getGig(id) {
      try {
        await store.dispatch('gig/gig', id);
        this.$router.push({ name: 'editGig', params: { id } });
      } catch (error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      }
    },

    async deleteGig(id) {
      try {
        let gig = await store.dispatch('gig/deleteGig', id);
        // NOTE: payload will be changed out before end of development
        let payload = {
          userid: 13,
          year: 2019
        };
        await store.dispatch('gig/initGigs', payload);
        this.$notify(gig);
      } catch (error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      }
    },
  
    async exportPDF(queryStr) {
      const query = queryStr;
      try {
        let gigs = await this.$store.dispatch('gig/queryGigs', query);
        const doc = new jsPDF();
        doc.autoTable(this.pdfColumns, this.gigs);
        doc.save('gigs.pdf');
      } catch(error) {
        console.log('export PDF error', error);
      }
    }
  },

  computed: {
    ...mapGetters({
      gigs: 'gig/gigs',
      years: 'gig_years'
    })
  }
};
</script>
