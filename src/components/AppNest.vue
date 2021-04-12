<template>
  <div class="app-nest">
    <div>Hallway</div>
    <div>{{ tempCurrent }}&#176;</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      location: 'Hallway',
      tempCurrent: '--',
    };
  },
  created() {
    this.getCurrentTemp();
    setInterval(() => {
      // Update nest temp every hour
      this.getCurrentTemp();
    }, 1000 * 60 * 60);
  },
  methods: {
    getCurrentTemp() {
      axios
        .get('/home-nest-api')
        .then((response) => {
          const { data } = response;
          this.location = data.where;
          this.tempCurrent = Math.round(data.data.current_state.temperature);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  },
};
</script>
