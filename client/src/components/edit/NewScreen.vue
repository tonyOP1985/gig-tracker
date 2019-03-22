<template>
  <PostForm :model="model" parentPath="gig" @save-gig="saveGig"></PostForm>
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
    async saveGig() {
      try {
        let gig = await this.$store.dispatch('gig/saveGig');
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
    }
  },
  
  computed: {
    ...mapGetters({
      model: 'gig/gig'
    })
  }
};
</script>
