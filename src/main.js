import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('TitleCase', (value) => value.toLowerCase().replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase()));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
