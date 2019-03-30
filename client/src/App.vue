<template>
  <v-app class="white">
    <notifications group="default"
                   class="notify"
                   position="bottom right"
                   :duration="5000"
                   :max="1"/>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  created() {
    let url = `?userid=${13}&year=${2019}`
    this.$store.dispatch('gig/queryGigs', url);
    this.$store.dispatch('getYears', 13);
    this.$store.dispatch('states', 13);
  },

  data () {
    return {
      //
    }
  }
}
</script>
