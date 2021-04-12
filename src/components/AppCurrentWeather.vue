<template>
  <div class="app-weather">
    <!-- <div>Outside</div> -->
    <div class="current">
      <div class="icon">
        <i :class="status.classNames"></i>
      </div>
      <div class="current-temp">{{ tempCurrent }}&#176;</div>
      <div class="description">{{ status.description | TitleCase }}</div>
    </div>
    <div class="high-low">
      <div class="high">{{ tempHigh }}&deg;</div>
      <div class="low">{{ tempLow }}&deg;</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentTemp: '69',
      status: {
        id: 0,
        main: '',
        description: '',
        icon: '',
        classNames: '',
        nightDay: '',
      },
      tempCurrent: 0,
      tempHigh: 0,
      tempLow: 0,
    };
  },
  created() {
    this.getWeather();
    // Update weather every hour
    setInterval(() => {
      this.getWeather();
    }, 1000 * 60 * 60);
  },
  methods: {
    getWeather() {
      const zipcode = '48320';
      axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: zipcode,
            key: process.env.VUE_APP_GOOGLE_API_KEY,
          },
        })
        .then((googleResponse) => {
          if (googleResponse.data.results.length > 0) {
            const latitude = googleResponse.data.results[0].geometry.location.lat;
            const longitude = googleResponse.data.results[0].geometry.location.lng;

            axios
              .get('https://api.openweathermap.org/data/2.5/onecall', {
                params: {
                  lat: latitude,
                  lon: longitude,
                  appid: process.env.VUE_APP_OPENWEATHER_API_KEY,
                  units: 'imperial',
                  exclude: 'minutely,hourly',
                },
              })
              .then((response) => {
                const { data } = response;
                // eslint-disable-next-line
                console.log(data);
                // Determine if it's day or night
                const date = new Date();
                const sunrise = new Date(data.current.sunrise * 1000); // Convert a Unix timestamp to time
                const sunset = new Date(data.current.sunset * 1000);
                // Add logic for day/night and icons
                const prefix = 'wi wi-fw wi-owm-';
                const code = data.current.weather[0].id;
                // eslint-disable-next-line no-unused-vars
                let icon = prefix + code;
                // eslint-disable-next-line no-unused-vars
                let nightDay = 'day';
                // Note: 7xx and 9xx do not get prefixed w/ day/night
                if (code >= 600 && code <= 700) {
                  nightDay = 'snow';
                  icon = prefix + code;
                } else if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                  if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
                    nightDay = 'day';
                    icon = `${prefix}day-${code}`;
                  } else {
                    nightDay = 'night';
                    icon = `${prefix}night-${code}`;
                  }
                }
                this.tempCurrent = Math.round(data.current.temp);
                this.tempHigh = Math.round(data.daily[0].temp.max);
                this.tempLow = Math.round(data.daily[0].temp.min);
                this.status = {
                  id: data.current.weather[0].id,
                  main: data.current.weather[0].main,
                  description: data.current.weather[0].description,
                  icon: data.current.weather[0].icon,
                  classNames: icon,
                  nightDay,
                };
              })
              .catch((bitError) => {
                // eslint-disable-next-line
                console.log(bitError);
                // res.send(weather);
              });
          } else {
            // Error getting data from Google
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-weather {
  width: 100%;
  font-size: 2rem; // 24px
  .icon {
    // font-size: 8rem; // 128px
    // padding: 0 15px;
    text-align: center;
    font-size: 5rem; // 80px
  }
  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  .current {
    text-align: right;
  }
  .current-temp {
    font-size: 8rem; // 128px
    line-height: 8rem; // 128px
    padding-left: 1rem; // 16px
  }
  .description {
    width: 100%;
    text-align: center;
  }
  .high-low {
    // justify-content: space-around;
    > div {
      padding: 0 1rem; // 16px
    }
  }
  > .temp-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .current {
    }
    .inside {
      font-size: 5rem; // 80px
      padding-left: 50px;
      // color: $peppermint;
    }
  }
}
</style>
