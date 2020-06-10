<template>
  <v-form @submit.prevent="saveGig(gig)">
    <v-container class="mt-6">
      <v-card flat outlined>
        <v-card-title class="primary white--text">{{ title }}</v-card-title>
        <v-card-text>
          <v-row class="mx-4">
            <v-col cols="12" md="6">
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="gig.date"
                    label="Date"
                    prepend-inner-icon="event"
                    v-bind="attrs"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="gig.date" @input="dateMenu = false" />
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="gig.pay"
                prefix="$"
                label="Pay" 
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="gig.city"
                label="City" 
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="gig.state"
                label="State" 
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="gig.mileage"
                label="Mileage" 
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="gig.band"
                label="Band" 
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="gig.venue"
                label="Venue" 
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="grey lighten-4">
          <v-spacer />
            <v-btn  
              @click="cancel()"
              color="error" 
              text
            >
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary" 
            >
              Save
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import TextField from '../../common/TextField';

export default {
  components: {
    TextField
  },

  props: {
    model: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      gig: this.model ? { ...this.model } : {
        date: '',
        pay: '',
        city: '',
        state: '',
        mileage: '',
        band: '',
        venue: ''
      },
      dateMenu: false,
    }
  },

  computed: {
    title() {
      return this.model ? 'Edit Gig' : 'New Gig';
    },
  },

  methods: {
    saveGig(gig) {
      this.$emit('save-gig', gig);
    },

    cancel() {
      this.$router.push({ name: 'gigs' });
    }
  }
}
</script>

<style scoped>
  .custom-input {
    border: solid black 1px;
    padding: 2px;
  }
</style>
