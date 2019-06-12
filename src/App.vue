<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
          
            <router-link v-if="isLoggedIn" :to="{path : '/schedule'}" class="nav-link">
              <img src="https://dataprocontrol.presencialaboral.esimg/logo.png" width="auto" height="45px" class="d-inline-block" />
            </router-link>
                      
            <router-link v-else :to="{path : '/login'}" class="navbar-brand">
              <img src="https://dataprocontrol.presencialaboral.esimg/logo.png" width="auto" height="45px" class="d-inline-block" />
            </router-link>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                      
                      <li class="nav-item" v-if="isLoggedIn">
                          <router-link :to="{name : 'schedule-records'}" class="nav-link">
                            Fichas
                          </router-link>
                      </li>
                      <li class="nav-item" v-if="isLoggedIn">
                          <router-link :to="{name : 'work-reports' }" class="nav-link">
                            Reportes
                          </router-link>
                      </li>
                </ul>
  
                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    <li class="nav-item dropdown" v-if="isLoggedIn">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ (currentUser && currentUser.name) || 'usuario' }} <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#" @click.prevent="logout">
                                Cerrar sesión
                            </a>
                        </div>
                    </li>
                
                    <li class="nav-item" v-else>
                        <router-link :to="{name : 'login'}" class="nav-link">
                          Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="py-4">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-10 offset-md-1">
                    <div class="alert-container"></div>
                    <router-view/>
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<style>
  .table td, .table th {
    vertical-align: middle;
  }
  
  .dataTables_length, .dataTables_filter {
    display: none !important;
  }
</style>
<script>
  
    export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
      currentUser: function(){ return this.$store.getters.user }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        });
      });
    }
    
  }
  
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body{
  background-color: #f8fafc;
}

</style>
