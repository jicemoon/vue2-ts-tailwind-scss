import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/index.scss';
import SvgIcon from './components/global/SvgIcon/index';

Vue.config.productionTip = false;

Vue.use(SvgIcon);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
