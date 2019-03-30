<template>
  <v-form @submit.prevent="saveGig(gig)">
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
                  <TextField label="Date" 
                             v-model="gig.date"
                             name="date"></TextField>
                </v-flex>
                <v-flex sm6 xs12>
                  <TextField label="Pay" 
                             v-model="gig.pay" 
                             name="pay"></TextField>
                </v-flex>
                <v-flex sm4 xs6>
                  <TextField label="City" 
                             v-model="gig.city" 
                             name="city"></TextField>
                </v-flex>
                <v-flex sm4 xs6>
                  <TextField label="State" 
                             v-model="gig.state" 
                             name="state"></TextField>
                </v-flex>
                <v-flex sm4 xs12>
                  <TextField label="Mileage" 
                             v-model="gig.mileage" 
                             name="mileage"></TextField>
                </v-flex>
                <v-flex sm6 xs12>
                  <TextField label="Band" 
                             v-model="gig.band" 
                             name="band"></TextField>
                </v-flex>
                <v-flex sm6 xs12>
                  <TextField label="Venue" 
                             v-model="gig.venue" 
                             name="venue"></TextField>
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
import TextField from '../../common/TextField';

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
    saveGig(gig) {
      // debugger;
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
