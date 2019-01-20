export const validate = {
  data() {
    return {
      valid: true,
      rules: [v => !!v || 'Required']
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};