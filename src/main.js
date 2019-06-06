// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import API from './API';


import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL = 'https://enterprise-evansjavier.c9users.io/api/auth';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN; 

window.axios = axios;
window.API = API;

Vue.config.productionTip = false


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  router.push('schedule')
}

console.log("token: " , token);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
