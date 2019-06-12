require('./bootstrap.js');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import API from './API';
import VueLoading from 'vue-loading-overlay';

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import 'vue-loading-overlay/dist/vue-loading.css';

window.axios   = Axios;
window.API     = API;
window.baseURL = 'https://dataprocontrol.presencialaboral.es';
window.apiURL  = window.baseURL + '/api';

Vue.config.productionTip = false
Vue.component('work-report-details', require('./components/WorkReportDetails.vue').default);
Vue.component('loading', VueLoading);

axios.defaults.baseURL = window.baseURL + '/api/auth';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN; 

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}


Vue.use(VueLoading, {
  color: '#00a4f4',
  loader: 'dots'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
