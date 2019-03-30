<template>
  <v-text-field v-bind="$attrs"
                v-on="$listeners"
                :value="value">
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
};
</script>
