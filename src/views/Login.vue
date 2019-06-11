<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col">
            <div class="card">
                <div class="card-header">Acceder</div>

                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Correo electrónico</label>
    
                            <div class="col-md-6">
                                <input v-model="email" id="email" type="email" class="form-control" :class="{'is-invalid' : errors.email.lenght }" name="email" required autocomplete="email" autofocus>
    
                                <span v-for="error in errors.email" class="invalid-feedback" role="alert">
                                    <strong>{{ $error }}</strong>
                                </span>
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Contraseña</label>
    
                            <div class="col-md-6">
                                <input v-model="password" id="password" type="password" class="form-control" :class="{'is-invalid' : errors.password.lenght }" name="password" required autocomplete="current-password">
    
                                <span v-for="error in errors.email" class="invalid-feedback" role="alert">
                                    <strong>{{ $error }}</strong>
                                </span>
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input v-model="remember_me" class="form-check-input" type="checkbox" name="remember" id="remember">
    
                                    <label class="form-check-label" for="remember">
                                        Recuérdame
                                    </label>
                                </div>
                            </div>
                        </div>
    
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button class="btn btn-primary">
                                    Acceder
                                </button>
                            </div>
                        </div>
                        
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
  export default {
    data(){
      return {
        email : "",
        password : "",
        remember_me : "",
        errors : {
                    email : [],
                    password : [],
                    remember_me : [],
                }
      }
    },
    
    methods: {
      login: function () {
        let email = this.email 
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/schedule'))
       .catch(err => console.log(err))
      }
    }
  }
</script>
<style>
    .card-header:first-child {
        border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
    }
    
    .card-header {
        padding: .75rem 1.25rem;
        margin-bottom: 0;
        background-color: rgba(0,0,0,.03);
        border-bottom: 1px solid rgba(0,0,0,.125);
        
    }
</style>