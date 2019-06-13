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
                <canvas ref="canvas_sign" class="mx-auto d-block" id="firma" width="320" height="180" style='border: 2px solid black; max-width: 100%;'></canvas>
                
                <button id="reset-firma" class="btn btn-xs mt-2">Limpiar</button>
                
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
export default {
  name: 'ReportToSign',
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
      
      startToDraw(this);
      
      // initialize canvas variable
      vm.canvas = vm.$refs.canvas_sign;
    }
  },
  methods : {
    __: function(str){
      return str
    },
    firmarReporte: function (reporte_id){
            
        let canvas_64 = this.canvas.toDataURL();
        
        let firma = new URLSearchParams();
        
        firma.append('sign', canvas_64);
        
        if(this.firmado){
            
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

var startToDraw = function(vm) {
  // Canvas snippet
  var canvas_id  = "firma";
  var canvas     = document.getElementById(canvas_id);
  
  vm.firmado     = false;
  
  var context = canvas.getContext('2d');
  var clickX = [];
  var clickY = [];
  var clickDrag = [];
  var painting;
  
  const addClick = function(x, y, dragging) {
      if(x < 0)  x = y = NaN;
      
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
  }
  
  const draw = function() {
      // Empty the canvas
      clearCanvas();
      context.strokeStyle = "#111";
      context.lineJoin = "round";
      context.lineWidth = canvas.getAttribute('height') * 0.0085;
      
      for(let i = 0; i < clickX.length; i++) {
          // Begin the path
          context.beginPath();
          
          if(clickDrag[i] && i) {
              context.moveTo(clickX[i-1], clickY[i-1]);
          }
          else {
              context.moveTo( Math.abs(clickX[i] - 1), Math.abs(clickY[i]) );
          }
          
          context.lineTo(clickX[i], clickY[i]);
          
          context.closePath();
          
          context.stroke();
      }
  }
  
  const clearCanvas = function() {
      context.clearRect(0, 0, $(canvas).outerWidth() * 1.5 , $(canvas).outerHeight() * 1.5);
  }
  
  const eraseCanvas = function() {
      console.log("limpiando..");
      
      
      clearCanvas();
      clickX = [];
      clickY = [];
      clickDrag = [];
      
      vm.firmado = false;
  }
  
  const calibrateCanvas = function() {
      let beforeHeight = canvas.getAttribute('height');
          
      canvas.setAttribute('height', $('#' + canvas_id).innerHeight());
      canvas.setAttribute('width', $('#' + canvas_id).innerWidth());
      context = canvas.getContext('2d');
      
      let deltaH = canvas.getAttribute('height') / beforeHeight;
      
      for(let i = 0; i < clickX.length; i++) {
          clickX[i] = clickX[i] * (deltaH);
          clickY[i] = clickY[i] * (deltaH);
      }
      draw();
  }
  $('#'+canvas_id)
  .on('mousedown touchstart', function(e){
   
      console.log("start");
      
      painting = true;
      let x = e.pageX - $(this).offset().left;
      let y = e.pageY - $(this).offset().top;
      
      addClick(x, y);
      draw();
  })
  .on('mouseleave mouseup touchend touchleave', function(){
     painting = false; 
  })
  .on('mousemove touchmove', function(e){
      e.preventDefault();
      
      let deltaX = e.pageX || e.originalEvent.touches[0].pageX;
      let deltaY = e.pageY || e.originalEvent.touches[0].pageY;
      
      if(painting) {
          let x = deltaX - $(this).offset().left;
          let y = deltaY - $(this).offset().top;
          
          addClick(x, y, true);
          draw();
          
          vm.firmado = true;
      }
  });
  
  
  //window.onresize(calibrateCanvas);
  
  
  
  $('#modal-firma').modal({
      show : true,
      onOpenEnd: function() {
          calibrateCanvas();
      }
  });
  
  
  
  $('#desea-firmar .modal-trigger').on('click', function(){setTimeout(calibrateCanvas, 250); });
  $('#reset-firma').on('click', eraseCanvas);

}



</script>

<style scoped>

</style>
