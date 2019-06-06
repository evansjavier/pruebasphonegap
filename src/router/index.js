import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/views/Login'

import ScheduleRecordForm from '@/views/ScheduleRecordForm'


Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { 
      path: '/schedule',
      name: 'schedule',
      component: ScheduleRecordForm
    }
    
  ]
})
