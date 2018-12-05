export const reset = {
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  }
};
