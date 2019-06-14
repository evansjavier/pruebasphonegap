<template>
    <!-- Modal -->
    <div class="modal fade" id="modal-firma" tabindex="-1" role="dialog" aria-labelledby="signReportModalTitle" aria-hidden="true" ref="modal-firma">
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
            
            
            <div class="text-center" v-if="work_report.id">
                <h6 class="text-center my-4">Por favor, firme si está de acuerdo:</h6>
                <SignCanvas ref="canvas"/>
                <button @click="resetFirma" class="btn btn-xs mt-2">Limpiar</button>
                
            </div>
            
            
           
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
            <button type="button" class="btn btn-primary" @click="firmarReporte( work_report.id )" v-if="work_report.id">Guardar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import SignCanvas from './SignCanvas';

export default {
  name: 'ReportToSign',
  components: {
    SignCanvas
  },
  data() {
    return {
        work_report: false,
        canvas : null,
        firmado: false
    }
  },
  computed : {
      user: function(){ return this.$store.getters.user  },
      user_fullname: function(){ return this.$store.getters.user.name + " " + this.$store.getters.user.last_name },
      company_name: function(){ return this.$store.getters.user.company_name },
  },
  created(){
    let vm = this;
    
    // get report data
      vm.$http
        .get('work_report_to_sign')
        .then((resp) => {
            // Hay reporte
            if( resp.data.id ){
              vm.work_report = Object.assign({}, resp.data);
              console.log('reporte', vm.work_report);
              
            }
        })
        .catch((error, data) => {
            console.log(error);
            switch(error.response.status) {
                case 404: {
                    //console.log("sin reporte por firmar")
                    break;
                }
                default: {
                    alert('Ha ocurrido un error inesperado, si el error persiste contacta con el administrador del sistema.');
                    console.log('Error: ', error.response.status)
                }
            }
        });
  },
  mounted: function(){
      let vm = this;
  },
  updated: function() {
    let vm = this;
    
    if(vm.work_report.id) {
      // Initialize modal
      $(this.$refs['modal-firma']).modal({
          show : true,
      });
      
    }
  },
  methods : {
    __: function(str){
      return str
    },
    resetFirma: function () {
      this.$refs.canvas.eraseCanvas();
    },
    firmarReporte: function (reporte_id){
            
        let canvas_64 = this.$refs.canvas.canvas.toDataURL();
        
        let firma = new URLSearchParams();
        
        firma.append('sign', canvas_64);
        
        if(this.$refs.canvas.hasSign){
            
            this.$http.post('/work-reports/' + reporte_id + '/sign', firma ).then(response => {
                //console.log(response.data);
                $('#modal-firma').modal('hide');
                
                alert("Se ha guardado la firma.")
                this.$router.go() // refresh
                
            })
            .catch(error => {
                alert("Hubo un error.")
                console.log(error);
            })
        }
        else{
            alert("Por favor, firme primero...");
        }
        
        
    }   
  }
  
}
</script>

<style scoped>

</style>
