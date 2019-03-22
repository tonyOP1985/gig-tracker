<template>
  <PostForm :model="model" parentPath="gig" @save-gig="saveGig"></PostForm>
</template>

<script>
import { mapGetters } from 'vuex';

import PostForm from './PostForm';

export default {
  components: {
    PostForm
  },

  computed: {
    ...mapGetters({
      model: 'gig/gig'
    })
  }
};
</script>
