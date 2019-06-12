<template>
    <div class="card" ref="div">
        <div class="card-header">
            <h5 v-if="!work_report.id">Cargando...</h5>
            <h5 v-else>
                <span class="float-right">
                    <a class="action btn btn-sm btn-danger mr-2" :href="pdfUrl" title="Ver PDF"><i class="oi oi-document"></i></a>
                </span>
                Reporte de {{ work_report.user.full_name }} | {{ work_report.date }}
            </h5>
        </div>
        <div class="card-body">        
            <div class="row">
                <div class="col">
                    <div class="text-center m-5" v-if="!work_report.id">Cargando...</div>
                    <work-report-details :work_report="work_report" :actions="1" v-else></work-report-details>
                    
                    <div class="text-center">
                        <a class="btn btn-default" @click="$router.go(-1)">Regresar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            id: {
                required: true
            }
        },
        data(){
            return {
                work_report: {}
            }
        },
        computed:{
          pdfUrl: function(){
            return window.apiURL + `/auth/work-reports/${this.work_report.id}/pdf`;
          }  
        },
        beforeMount() {
            this.fetchRecord();
        },
        methods: {
            fetchRecord: function() {
                let vm = this;
                
                axios.get('work-reports/' + vm.id )
                .then( resp => {
                    console.log(resp);
                    
                    vm.work_report = Object.assign({}, resp.data);
                    
                    console.log(vm.work_report, vm.work_report.id);
                    
                })
                .catch(error => {
                    console.log(error.response);
                    switch(error.response.status) {
                        default: {
                            alert('Ha ocurrido un error inesperado, si el error persiste contacte con el administrador del sistema.');
                        }
                    }
                })
            }
        }
    }
</script>