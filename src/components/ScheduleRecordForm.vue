<template>
    <div class="text-center">
        <div class="">
            <div class="card-body" v-show="['ready', 'submitting', 'error'].indexOf(status) != -1 ">
                <div class=" text-center">
                    <h2>{{ info.current_date }}</h2>
                    <p class="lead mb-2">¿Ha realizado este horario?</p>
                    <p class="font-weight-bold"> {{ info.hours }}</p>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <label class="btn btn-success exec-btn">
                                <input type="radio" v-model="schedule_record.executed" value="1">
                                Si
                            </label>
                        </div>
                        <div class="col-auto">
                            <label class="btn btn-danger exec-btn" data-toggle="modal" data-target="#motiveModal">
                                <input type="radio" v-model="schedule_record.executed" value="0">
                                No
                            </label>
                        </div>
                        <div class="col-12">
                            <span class="text-danger" v-text="errors.executed[0]"></span>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="motiveModal" tabindex="-1" role="dialog" aria-labelledBy="motiveModal" aria-hidden="true">
                    <div class="modal-dialog " role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Motivo</h4>
                            </div>
                            <div class="modal-body">
                               <div class="form-group">
                                   <select id="schedule_record_motive" :class="'form-control ' + (hasError('motive_id') ? 'is-invalid' : '' )" v-model="schedule_record.motive_id" @change="expandDetails()">
                                       <option value='' disabled>Seleccione un motivo</option>
                                       <option v-for="motive in motive_list" :value="motive.id" :need_details="motive.need_details ? 1 : 0">{{ motive.title }}</option>
                                   </select>
                                   <span class="text-danger" v-text="errors.motive_id[0]"></span>
                               </div>
                               <div class="more-details-container" style="display: none;">
                                   <div class="form-group row text-left">
                                       <div class="col-12">
                                           <h6 class="font-weight-bold">Horario #1</h6>
                                       </div>
                                       <div class="col">
                                           <label>Hora de entrada</label>
                                           <input :class="'form-control form-control-sm ' + (hasError('entry_time') ? 'is-invalid' : '' ) " type="time" placeholder="00:00" required v-model="schedule_record.entry_time">
                                           <span class="text-danger small" v-text="errors.entry_time[0]"></span>
                                       </div>
                                       <div class="col">
                                           <label>Hora de salida</label>
                                           <input :class="'form-control form-control-sm ' + (hasError('departure_time') ? 'is-invalid' : '' ) " type="time" placeholder="00:00" required v-model="schedule_record.departure_time">
                                           <span class="text-danger small" v-text="errors.departure_time[0]"></span>
                                       </div>
                                   </div>
                                   <div class="form-group row text-left" v-if="info.sec_schedule_entry_time && info.sec_schedule_departure_time">
                                       <div class="col-12">
                                           <h6 class="font-weight-bold">Horario #2</h6>
                                       </div>
                                       <div class="col">
                                           <label>Hora de entrada</label>
                                           <input :class="'form-control form-control-sm ' + (hasError('sec_entry_time') ? 'is-invalid' : '' ) " type="time" placeholder="00:00" required v-model="schedule_record.sec_entry_time">
                                           <span class="text-danger small" v-text="errors.sec_entry_time[0]"></span>
                                       </div>
                                       <div class="col">
                                           <label>Hora de salida</label>
                                           <input :class="'form-control form-control-sm ' + (hasError('sec_departure_time') ? 'is-invalid' : '' ) " type="time" placeholder="00:00" required v-model="schedule_record.sec_departure_time">
                                           <span class="text-danger small" v-text="errors.sec_departure_time[0]"></span>
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <textarea id="schedule_record_more_details" maxlength="250" :class="'form-control ' + (hasError('more_details') ? 'is-invalid' : '' ) " placeholder="Detalla el motivo" v-model="schedule_record.motive_details"></textarea>
                                       <span class="text-danger" v-text="errors.motive_details[0]"></span>
                                   </div>
                               </div>
                               <div class="text-center">
                                   <button class="btn btn-primary" @click.prevent="submitSignIn()">Aceptar</button>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body text-center justify-content-center align-items-center d-flex" v-if="['initial', 'sent', 'fatal-error'].indexOf(status) != -1">
                <span class="lead p-4" v-show="status == 'initial'">Cargando...</span>
                <span class="lead p-4" v-if="status == 'fatal-error'">
                    {{ message }}
                </span>
                <div class="p-4" v-show="status == 'sent'">
                    <h5 class="font-weight-bold">Hemos recibido tu ficha de hoy.</h5>
                    <p class="m-1">Gracias por tu colaboraci&oacute;n</p>
                    <p class="m-1">{{ info.current_date }}</p>
                </div>
            </div>
        </div>
        <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledBy="successModal" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Gracias por su colaboraci&oacute;n</h4>
                    </div>
                    <div class="modal-body text-left">
                       <div v-if="schedule_record.executed == 1">
                           <h4 class="m-0">{{ info.current_date}}</h4>
                           <p class="lead m-0">{{ info.hours }}</p>
                       </div>
                       <div v-else>
                           <p class="font-weight-bold m-0">{{ motive_list.some((motive) => motive.id == this.schedule_record.motive_id ) && motive_list.find((motive) => motive.id == this.schedule_record.motive_id ).title  }}</p>
                           <p class="m-0">{{ schedule_record.motive_details }}</p>
                       </div>
                       <div class="text-center py-4">
                           <button class="btn btn-primary"  data-dismiss="modal" aria-label="Close">Aceptar</button>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    label {
        position: relative;
        margin-bottom: 0;
        cursor: pointer;
    }
    
    input[type=radio] {
        visiblity: hidden;
        position: absolute;
        bottom: 0;
        left: 50%;
        z-index: -1;
    }
    
    .exec-btn {
        width: 50px;
    }
</style>
<script type="text/javascript">
    import $ from 'jquery';
    
    export default {
       
        watch: {
            status: function( ) {
                console.log(this.status);
            },
            schedule_record: {
                handler(){
                    if(this.schedule_record.executed == 1) {
                        this.schedule_record.motive_id = null;
                        this.schedule_record.motive_details = null;
                        this.submitSignIn();
                    }
                },
                deep: true
            }  
        },
        data() {
            return {
                status: 'initial',
                errors: {
                    executed: [],
                    motive_id: [],
                    motive_details: [],
                    entry_time: [],
                    departure_time: [],
                    sec_entry_time: [],
                    sec_departure_time: []
                },
                schedule_record: {
                    executed: null,
                    motive_id: '',
                    motive_details: null,
                    entry_time: null,
                    departure_time: null,
                    sec_entry_time: null,
                    sec_departure_time: null
                },
                info: {
                    current_date: '',
                    hours: '',
                },
                message: '',
                
                motive_list: []
              
            }
        },
        mounted: function() {
            let vm = this;
            
          // Verify's if the user has already sign
          axios.get('schedule-records/today')
            .then((resp) => {
                let schedule_record = resp.data;
                
                if(typeof undefined == typeof schedule_record.id) {
                    vm.status = 'ready';
                    vm.fillMotives();
                    vm.schedule_record = Object.assign(vm.schedule_record, 
                        {
                            entry_time: schedule_record.schedule_entry_time,
                            departure_time: schedule_record.schedule_departure_time,
                            sec_entry_time: schedule_record.sec_schedule_entry_time,
                            sec_departure_time: schedule_record.sec_schedule_departure_time
                        }
                    );
                }
                else {
                    vm.status = 'sent';
                }
                
                vm.info = Object.assign(schedule_record, 
                    { 
                        current_date: schedule_record.date, 
                        hours: schedule_record.schedule,
                    }
                );
                
            })
            .catch((error) => {
                vm.status = 'fatal-error';
                
                switch(error.response.status) {
                    case 400: 
                    case 403: {
                        vm.message = error.response.data.message;
                        break;
                    }
                    
                    default: {
                        vm.message = "Ha ocurrido un error inesperado, si este persiste contacte con el administrador del sistema.";
                    }
                }
            })
        },
        methods: {
            expandDetails: function() {
                let vm = this;
                
                let $option = $('#schedule_record_motive').find('option[value="' + vm.schedule_record.motive_id + '"]');
                let $more_details = $('#schedule_record_more_details');
                
                if($option.length > 0 && $option.attr('need_details') > 0) {
                    $more_details.parents('.more-details-container').slideDown();
                }
                else {
                    $more_details.parents('.more-details-container').slideUp();
                }
            },
            submitSignIn: function() {
                let vm = this;
                
                vm.status = 'submitting';
                
                vm.resetErrors();
                
                let schedule_submit = new URLSearchParams();
                
                schedule_submit.append('executed', vm.schedule_record.executed ? vm.schedule_record.executed : '');
                schedule_submit.append('motive_id', vm.schedule_record.motive_id ? vm.schedule_record.motive_id : '');
                schedule_submit.append('motive_details', vm.schedule_record.motive_details ? vm.schedule_record.motive_details : '' );
                
                schedule_submit.append('entry_time', vm.schedule_record.entry_time ? vm.schedule_record.entry_time : '' );
                schedule_submit.append('departure_time', vm.schedule_record.departure_time ? vm.schedule_record.departure_time : '' );
                schedule_submit.append('sec_entry_time', vm.schedule_record.sec_entry_time ? vm.schedule_record.sec_entry_time : '' );
                schedule_submit.append('sec_departure_time', vm.schedule_record.sec_departure_time ? vm.schedule_record.sec_departure_time : '' );
                
                
                axios
                .post('sign-on', schedule_submit)
                .then((resp) => {
                    $('#motiveModal').modal('hide');
                    $('#successModal').modal();
                    
                    vm.status = 'sent';
                    console.log(schedule_submit);
                    
                })
                .catch((error, data) => {
                    vm.status = 'error';
                    
                    switch(error.response.status) {
                        case 422: {
                            vm.errors = Object.assign(vm.errors, error.response.data.errors);
                            
                            break;
                        }
                        default: {
                            alert('Ha ocurrido un error inesperado, si el error persiste contacta con el administrador del sistema.');
                        }
                    }
                })
            },
            fillMotives: function() {
                let vm = this;
                
                let motives = [];
                
                axios.get('motive/list')
                .then((resp) => {
                    motives = resp.data;
                })
                .catch((error) => {
                   switch(error.response.status) {
                       default: {
                           motives = {
                               id: null,
                               title: 'Ocurrio un error al buscar los motivos de tu empresa.',
                               need_details: false,
                           }
                           break;
                       }
                   }
                })
                .then(() => {
                    vm.motive_list = motives;
                });
            },
            hasError: function(field) {
                
                return this.errors[field] && this.errors[field].length > 0;
            },
            resetErrors: function() {
                let reset_errors = {};
                
                for(let error in this.errors) {
                    reset_errors[error] = [];
                }
                
                this.errors = Object.assign(this.errors, reset_errors);
                
            }
        }
    }
</script>