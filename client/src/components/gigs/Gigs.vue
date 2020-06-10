<template>
  <v-card flat class="px-0">
    <v-dialog v-model="dialog" width="400">
      <PDFConfig @close-dialog="dialog = false" @create-pdf="exportPDF" />
    </v-dialog>
    <v-card-title>
      <v-row justify="space-between" no-gutters>
        <v-col col="12" md="6">
          <v-row>
            <span class="pl-2">Gigs</span>
            <v-btn
              text
              color="primary"
              @click="dialog = true">
              Create PDF
            </v-btn>
          </v-row>
        </v-col>
        <v-col col="12" md="6">
          <v-row justify="end" class="pr-2">
            <v-btn color="primary" :to="{ name: 'addGig' }">
              <v-icon class="mr-3">add</v-icon>
              Add Gig
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
        :items="gigs"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editEvent(item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="toggleDialog({ id: item.id, bool: true })"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
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
