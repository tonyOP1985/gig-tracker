<template>
  <v-container>
    <v-form>
      <v-layout justify-space-between>
        <v-flex>
          <h3 class="blue--text">{{ itemDetails.item }}</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-text-field v-model="itemDetails.item"
                        clearable
                        required
                        label="Item Name">
          </v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field prefix="$"
                        v-model="itemDetails.price"
                        required
                        clearable
                        label="Price">
          </v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field v-model="itemDetails.quantity"
                        type="number"
                        min="1"
                        required
                        clearable
                        label="Item Quantity">
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex sm2>
          <v-btn flat
                 color="red">
            <v-icon class="mr-2">delete</v-icon>
            Revome Item
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['itemDetails'],
  data() {
    return {
      item: '',
      amount: '',
      quantity: ''
    }
  }
}
</script>