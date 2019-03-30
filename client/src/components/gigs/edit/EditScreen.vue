<template>
  <PostForm :model="model" parentPath="gig" @save-gig="saveGig"></PostForm>
</template>

<script>
import { mapGetters } from 'vuex';
// this is another test to check if Git is acatully working LOL
import PostForm from './PostForm';

export default {
  components: {
    PostForm
  },

  methods: {
    async saveGig(payload) {
      // NOTE: research scope issue occuring with payload and try/catch
      // only seems to occur with methods that catch emitted events
      let editedGig = payload;
      try {
        let gig = await this.$store.dispatch('gig/saveEditedGig', editedGig);
        // NOTE: payload will be changed out before end of development
        let payload = {
          userid: 13,
          year: 2019
        };
        await this.$store.dispatch('gig/initGigs', payload);
        this.$router.push({ name: 'gigs' });
        this.$notify(gig);
      } catch(error) {
        if (error.notifyParams) {
          this.$notify(error.notifyParams);
        } else {
          throw error;
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      model: 'gig/gig'
    })
  }
};
</script>
