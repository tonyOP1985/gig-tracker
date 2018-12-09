<template>
  <v-container grid-list-lg>
    <AddExpenseForm />
  </v-container>
</template>

<script>
import AddExpenseForm from '../components/AddExpenseForms/AddExpenseForm';

export default {
  name: 'addExpense',
  components: {
    AddExpenseForm
  }
}
</script>
