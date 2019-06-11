import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'

import Login from './views/Login.vue'
import Secure from './views/Secure.vue'
import ScheduleRecordForm from './components/ScheduleRecordForm.vue'


Vue.use(Router)

let router = new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleRecordForm
    },
    
  ]
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})


export default router