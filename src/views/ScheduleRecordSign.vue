<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col">
                <div class="card">
                    <div class="card-header">Bienvenido, {{ user_fullname }}</div>
    
                    <div class="card-body">
                            <div v-if="false" class="alert alert-success" role="alert">
                            
                            </div>
                            
                            <div class="text-center">
                                <p class="m-0 font-weight-bold">Empleado</p>
                                <p class="">{{ user_fullname }} </p>
                                
                                <p class="m-0 font-weight-bold">Empresa</p>
                                <p>{{ company_name }}</p>
                            </div>
                        
                            <ScheduleRecordForm />
                    </div>
                    <div class="card-footer text-center border-none">
                        Si tienes alguna duda o consulta puedes escribirnos a <a href="mailto:contacto@dataprolegal.com">contacto@dataprolegal.com</a>
                    </div>
                </div>
            </div>
        </div>
        
        <ReportToSign />
    </div>
</template>


<script>
  import ScheduleRecordForm from '../components/ScheduleRecordForm'
  import ReportToSign from '../components/ReportToSign'

  export default {
    computed : {
      user_fullname: function(){ return this.$store.getters.user.name + " " + this.$store.getters.user.last_name },
      company_name: function(){ return this.$store.getters.user.company_name }
    },
    name: 'schedule-view',
    components: {
      ScheduleRecordForm,
      ReportToSign
    }
  }
</script>