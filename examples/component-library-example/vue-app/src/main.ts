import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import 'component-library';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  'app-scaffold',
  'flex-box',
];

new Vue({
  render: (h) => h(App),
}).$mount('#app');
