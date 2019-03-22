<template>
  <v-form @submit.prevent="saveGig()">
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm8 md8>
          <v-card flat>
            <v-card-title>
              <h3 color="blue">Edit Gig</h3>
            </v-card-title>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex sm6 xs12>
                  <TextField label="Date" v-model="gig.date"></TextField>
                </v-flex>
                <v-flex sm6 xs12>
                  <TextField label="Pay" v-model="gig.pay"></TextField>
                </v-flex>
                <v-flex sm4 xs6>
                  <TextField label="City" v-model="gig.city"></TextField>
                </v-flex>
                <v-flex sm4 xs6>
                  <TextField label="State" v-model="gig.state"></TextField>
                </v-flex>
                <v-flex sm4 xs12>
                  <TextField label="Mileage" v-model="gig.mileage"></TextField>
                </v-flex>
                <v-flex sm6 xs12>
                  <TextField label="Band" v-model="gig.band"></TextField>
                </v-flex>
                <v-flex sm6 xs12>
                  <TextField label="Venue" v-model="gig.venue"></TextField>
                </v-flex>
                <v-flex xs12>
                  <v-btn type="submit"
                         color="primary" 
                         block>Save</v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-btn @click="cancel()"
                         color="error" 
                         block>Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import TextField from '../common/TextField';

export default {
  components: {
    TextField
  },

  props: ['model'],

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
      }
    }
  },

  methods: {
    async saveGig() {
      try {
        let gig = await this.$store.dispatch('gig/saveEditedGig');
        // NOTE: payload will be changed out before end of development
        let payload = {
          userid: 13,
          year: 2019
        };
        await this.$store.dispatch('gig/getGigs', payload);
        this.$router.push({ name: 'gigs' });
        this.$notify(gig);
      } catch(error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      }
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
