<template>
    <div class="card" ref="div">
        <div class="card-header"><h5>Ficha #{{ id }} @disabledBadge($scheduleRecord)</h5></div>
        <div class="card-body">        
            <div class="row">
                <div class="col col-md-8 offset-md-2">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Empresa</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Usuario</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Fecha</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Horario</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Horario Realizado</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Horas</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Realizado</th>
                                        <td>{{ '' }}</td>
                                    </tr>
                                    
                                    <tr v-if="1">
                                        <th>Motivo</th>
                                        <td>
                                            <b>{{ '' }}</b>
                                            <br>
                                            <i v-if="1">{{ '' }}</i>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="text-center">
                            
                            <router-link :to="{name: 'schedule-records' }" class="btn btn-default">Regresar</router-link>
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
                schedule_record: {}
            }
        },
        beforeMount() {
            this.fetchRecord();
        },
        methods: {
            fetchRecord: function() {
                let vm = this;
                
                axios.get('schedule-records/' + vm.id )
                    .then( resp => {
                        console.log(resp);
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
            }
        }
    }
</script>