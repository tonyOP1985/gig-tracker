export const windowWidth = {
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    })
  },
  beforeDestroy () {
    window.addEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth () {
      this.windowWidth = document.documentElement.clientWidth;
    }
  }
};
