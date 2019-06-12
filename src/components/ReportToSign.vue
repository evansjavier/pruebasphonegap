<template>
    <!-- Modal -->
    <div class="modal fade" id="modal-firma" tabindex="-1" role="dialog" aria-labelledby="signReportModalTitle" aria-hidden="true">
      <div class="modal-dialog mx-auto" role="document" style="max-width: 90%;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="signReportModalTitle"><b>Tienes un reporte por firmar</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card">
                <div class="card-header text-center">
                    <h5 v-if="!work_report.id">Cargando...</h5>
                    <h5 v-else>Reporte de {{ work_report.user.full_name }} | {{ work_report.date }}</h5>
                </div> 
                <div class="card-body">        
                    <div class="row">
                      <div class="col-md-10 offset-md-1">
                        <div class="text-center m-5" v-if="!work_report.id">Cargando...</div>
                        <work-report-details :work_report="work_report" v-else></work-report-details>
                      </div>
                    </div>
                </div>
            </div>
            
            
            <div class="text-center">
                <h6 class="text-center my-4">Por favor, firme si está de acuerdo:</h6>
                <canvas class="mx-auto d-block" id="firma" width="320" height="180" style='border: 2px solid black; max-width: 100%;'></canvas>
                
                <button id="reset-firma" class="btn btn-xs mt-2">Limpiar</button>
                
            </div>
            
            
            
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
            <button type="button" class="btn btn-primary" @click="firmarReporte( work_report.id )">Guardar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ReportToSign',
  data() {
    return {
        work_report: false
    }
  },
  computed : {
      user: function(){ return this.$store.getters.user  },
      user_fullname: function(){ return this.$store.getters.user.name + " " + this.$store.getters.user.last_name },
      company_name: function(){ return this.$store.getters.user.company_name }
  },
  mounted: function(){
    //
    
      this.$http
        .get('work_report_to_sign')
        .then((resp) => {
            // Hay reporte
            if( resp.data.id ){
              this.work_report = Object.assign({}, resp.data);
              console.log('reporte', this.work_report);
            }
        })
        .catch((error, data) => {
            switch(error.response.status) {
                case 422: {
                    break;
                }
                default: {
                    alert('Ha ocurrido un error inesperado, si el error persiste contacta con el administrador del sistema.');
                    console.log('Error: ', error.response.status)
                }
            }
        }),
        
        
        
        // Initialize modal
        $('#modal-firma').modal({
            show : true,
            onOpenEnd: function() {
                //calibrateCanvas();
            }
        });
        
        
        
  },
  methods : {
    __: function(str){
      return str
    },
    firmarReporte: function(){
      console.log("firmando");
    }
  }
  
}
</script>

<style scoped>

</style>
