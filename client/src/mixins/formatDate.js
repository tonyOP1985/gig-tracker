import moment from 'moment';

export const formatDate = {
  computed: {
    formattedDate() {
      return this.date ? moment(this.date).format('MM/DD/YYYY') : '';
    }
  }
};
