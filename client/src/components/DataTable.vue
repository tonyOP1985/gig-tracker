<template>
  <v-data-table
      :headers="data.headers"
      :items="data.data">
    <template>
      <td v-for="(item, index ) in items" :key="index">{{item}}</td>
        <v-btn small color="primary">Edit</v-btn>
        <v-btn small color="error">Delete</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'dataTable',
  props: ['data']
}
</script>
