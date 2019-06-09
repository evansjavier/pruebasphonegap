<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
          
            <router-link :to="{path : '/'}" class="navbar-brand">
              <img src="https://dataprolegal.com/wp-content/uploads/2018/06/Logo-comunidad_3.png" width="auto" height="45px" class="d-inline-block" />
            </router-link>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                      
                     <li class="nav-item" v-if="isLoggedIn">
                          <router-link :to="{path : '/schedule-records-index'}" class="nav-link">
                            Fichas
                          </router-link>
                      </li>
                </ul>
  
                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    
                        <li class="nav-item" v-if="!isLoggedIn">
                            <router-link :to="{name : 'login'}" class="nav-link">
                              Login
                            </router-link>
                        </li>
                    
                        <li class="nav-item dropdown" v-else>
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                USERNAME <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" @click.prevent="logout">
                                    Cerrar sesión
                                </a>
                            </div>
                        </li>
                    
                </ul>
            </div>
        </div>
    </nav>
    <main class="py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="alert-container"></div>
                    <router-view/>
                </div>
            </div>
        </div>
    </main>
  </div>
</template>


<script>
  export default {
    name: 'App',
    computed : {
      isLoggedIn : function(){ return !!localStorage.getItem('token') }
    },
    methods: {
      logout: function () {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          this.$router.push('login')
      }
    },
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  background-color: #f8fafc;
}

</style>
