import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : localStorage.getItem('user') || {}
  },
  mutations: {
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, data) {
            state.status = 'success'
            state.token = data.token
            state.user = data.user
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
    },
  },
  actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({url: API.login, data: user, method: 'POST' })
              .then(resp => {

                const token = resp.data.access_token
                const user = resp.data.user
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                
                commit('auth_success', { token : resp.data.access_token, user : resp.data.user })
                
                
                resolve(resp)

              })
              .catch(err => {
                console.log("STORE: login error", err);
                
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
              })
            })
        },
        logout({commit}){
          return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
            resolve()
          })
        }
  },
  getters : {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      user: state => {
        return (typeof state.user == typeof '') ? 
          JSON.parse(state.user) :
          state.user
      },
  }
})