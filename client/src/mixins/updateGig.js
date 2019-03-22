export const updateGig = {
  methods: {
    updateGig(event) {
      this.$store.dispatch('gig/updateGig', {
        path: `${this.parentPath}.${event.target.name}`,
        newValue: event.target.value
      });
    }
  }
};
