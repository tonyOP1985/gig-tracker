export const decimalMixin = {
  methods: {
    allowOnlyTwoDecimals($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $$event.which);

      // Only allow number and one dot
      if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.amount.indexOf('.') != -1)) {
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      if (this.amount != null && this.amount.indexOf('.') > -1 && (this.amount.split('.')[1].length > 1)) {
        $event.preventDefault();
      }
    }
  }
};
