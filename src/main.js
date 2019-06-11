require('./bootstrap.js');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import API from './API';

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';

Axios.defaults.baseURL = 'https://enterprise-evansjavier.c9users.io/api/auth';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN; 

window.axios = Axios;
window.API = API;


Vue.config.productionTip = false


axios.defaults.baseURL = 'https://enterprise-evansjavier.c9users.io/api/auth';

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

//console.log("token: " , token);

/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
