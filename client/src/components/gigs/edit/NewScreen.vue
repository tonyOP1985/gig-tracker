<template>
  <PostForm parentPath="gig" @save-gig="saveGig"></PostForm>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';

import PostForm from './PostForm';

export default {
  components: {
    PostForm
  },

  methods: {
    saveGig: async function(payload) {
      // NOTE: research scope issue occuring with payload and try/catch
      // only seems to occur with methods that catch emitted events
      let newGig = payload;
      try {
        let gig = await this.$store.dispatch('gig/saveGig', newGig);
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
