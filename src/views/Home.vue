<template>
  <div class="home">
    <div class="clock-container">
      <AppClock />
    </div>
    <div class="weather-container">
      <AppCurrentWeather />
      <!-- <AppNest /> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppClock from '@/components/AppClock.vue';
import AppCurrentWeather from '@/components/AppCurrentWeather.vue';
// import AppNest from '@/components/AppNest.vue';

export default {
  name: 'Home',
  components: {
    AppClock,
    AppCurrentWeather,
    // AppNest,
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  padding: 5rem; // 80px
  > div {
    &:first-child {
      flex-grow: 1;
    }
  }
}
</style>
