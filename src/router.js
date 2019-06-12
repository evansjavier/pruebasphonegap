import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'

import Login from './views/Login.vue'
import Secure from './views/Secure.vue'
import ScheduleRecordForm from './components/ScheduleRecordForm.vue'
import ScheduleRecords from './views/ScheduleRecords.vue';
import ScheduleRecordsShow from './views/ScheduleRecordsShow.vue';
import WorkReports from './views/WorkReports';
import WorkReportsShow from './views/WorkReportsShow.vue';

import ScheduleRecordSign from './views/ScheduleRecordSign';

Vue.use(Router)

let router = new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
/*    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
*/
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleRecordSign
    },
    {
      path: '/schedule-records',
      name: 'schedule-records',
      component: ScheduleRecords
    },
    {
      path: '/schedule-records/:id',
      name: 'schedule-records.show',
      component: ScheduleRecordsShow,
      props: true
    },
    {
      path: '/work-reports',
      name: 'work-reports',
      component: WorkReports
    },
    {
      path: '/work-reports/:id',
      name: 'work-reports.show',
      component: WorkReportsShow,
      props: true
    }
    
  ]
})


router.beforeEach((to, from, next) => {
  // Closed menu if it's open
  if($('body').width() < 768) {
    if($('#navbarSupportedContent').hasClass('show')) {
      $('#navbarSupportedContent').siblings('[data-toggle]').click();
    }
  }
  
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