<template>
  <div class="app-clock">
    <time class="today-date">
      {{ todayDate }}
    </time>
    <time class="today-time" v-html="todayTime"></time>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      time: new Date(),
    };
  },
  computed: {
    todayDate() {
      return format(this.time, 'EEEE, MMMM d, yyyy');
    },
    todayTime() {
      return `${format(this.time, 'h:mm')}<small>${format(this.time, 'aaa')}</small>`;
    },
  },
  mounted() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
time {
  display: block;
  // text-align: center;
  small {
    font-size: 65%;
  }
  &.today-date {
    // font-size: 3rem; // 48px
    font-size: 2.5rem; // 40px
    line-height: 2.5rem; // 40px
  }
  &.today-time {
    font-size: 8rem; // 128px
  }
}
</style>
