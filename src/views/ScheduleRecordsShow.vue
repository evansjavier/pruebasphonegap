<template>
    <div class="card" ref="div">
        <div class="card-header"><h5>Ficha #{{ id }}</h5></div>
        <div class="card-body">        
            <div class="row">
                <div class="col col-md-8 offset-md-2">
                        <div class="text-center m-5" v-if="typeof undefined == typeof schedule_record.id">Cargando...</div>
                        <div class="table-responsive" v-else>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Empresa</th>
                                        <td>{{ schedule_record.company.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Usuario</th>
                                        <td>{{ schedule_record.user.full_name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Fecha</th>
                                        <td>{{ schedule_record.date }}</td>
                                    </tr>
                                    <tr>
                                        <th>Horario</th>
                                        <td>{{ schedule_record.schedule }}</td>
                                    </tr>
                                    <tr>
                                        <th>Horario Realizado</th>
                                        <td>{{ schedule_record.working_schedule }}</td>
                                    </tr>
                                    <tr>
                                        <th>Horas</th>
                                        <td>{{ schedule_record.working_hours }}</td>
                                    </tr>
                                    <tr>
                                        <th>Realizado</th>
                                        <td>{{ schedule_record.executed ? 'Si' : 'No' }}</td>
                                    </tr>
                                    
                                    <tr v-if="!schedule_record.executed">
                                        <th>Motivo</th>
                                        <td>
                                            <b>{{ schedule_record.motive }}</b>
                                            <br>
                                            <i>{{ schedule_record.motive_details }}</i>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        <div class="text-center">
                            
                            <a class="btn btn-default" @click="$router.go(-1)">Regresar</a>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    div.dataTables_wrapper div.dataTables_info {
        nowrap: normal;
    }
    
    div.dataTables_wrapper div.dataTables_paginate ul.pagination {
        nowrap: normal;
        flex-wrap: wrap;
    }
    
    div.dataTables_wrapper .table-responsive {
        position: static;
    }
    
</style>
<script>
    export default {
        props: {
            id: {
                required: true
            }
        },
        data(){
            return {
                schedule_record: {}
            }
        },
        beforeMount() {
            this.fetchRecord();
        },
        methods: {
            fetchRecord: function() {
                let vm = this;
                let loader = this.$loading.show();
                
                axios.get('schedule-records/' + vm.id )
                .then( resp => {
                    console.log(resp);
                    
                    vm.schedule_record = Object.assign({}, resp.data);
                    
                    console.log(vm.schedule_record, vm.schedule_record.id);
                    
                })
                .catch(error => {
                    console.log(error.response);
                    switch(error.response.status) {
                        default: {
                            alert('Ha ocurrido un error inesperado, si el error persiste contacte con el administrador del sistema.');
                        }
                    }
                })
                .then(() => {
                    loader.hide();
                })
            }
        }
    }
</script>