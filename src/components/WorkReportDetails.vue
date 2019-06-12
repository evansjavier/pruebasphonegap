<template>
    <div>
        <h4>Empresa / Trabajador</h4>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <tbody>
                    <tr>
                        <th>Empresa</th>
                        <td>{{ work_report.user.companies.map((c) => c.name).join(',') }}</td>
                        <th>Usuario</th>
                        <td>{{ work_report.user.full_name }}</td>
                    </tr>
                    <tr>
                        <th>CIF</th>
                        <td>{{  work_report.user.companies.map((c) => c.cif).join(',') }}</td>
                        <th>CIF</th>
                        <td>{{  work_report.user.dni }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-if="work_report.is_signed">Firmado el {{ work_report.signed_at.date }}</p>
        </div>
        
           
        <h4>Jornadas Realizadas</h4>
        <div class="table-responsive" id="data-table">
           <table class="table table-striped table-bordered table-sm text-center">
               <thead>
                   <tr>
                       <th rowspan="2">D&iacute;a</th>
                       <th colspan="3">Horario #1</th>
                       <th colspan="3" v-if="work_report.has_two_hours">Horario #2</th>
                       <th v-if="actions" rowspan="2">Acciones</th>
                   </tr>
                   <tr>
                       <th>Hora de Entrada</th>
                       <th>Hora de Salida</th>
                       <th>Horas</th>
                       
                       <th v-if="work_report.has_two_hours">Hora de Entrada</th>
                       <th v-if="work_report.has_two_hours">Hora de Salida</th>
                       <th v-if="work_report.has_two_hours">Horas</th>
                       
                   </tr>
               </thead>
               <tbody>
                   <tr v-for=" schedule_record in work_report.schedule_records">
                       <td>{{ schedule_record.date }}</td>
                       <td>{{ schedule_record.entry_time }}</td>
                       <td>{{ schedule_record.departure_time }}</td>
                       <td>{{ schedule_record.first_working_hours }}</td>
                       
                      
                       <td v-if="work_report.has_two_hours">{{ schedule_record.sec_entry_time }}</td>
                       <td v-if="work_report.has_two_hours">{{ schedule_record.sec_departure_time }}</td>
                       <td v-if="work_report.has_two_hours">{{ schedule_record.second_working_hours }}</td>
                       
                       <td v-if="actions">
                           <div class="d-md-flex justify-content-md-center">
                               <router-link class="action btn btn-sm btn-primary mr-2"  :to="{name:'schedule-records.show', params: { id: schedule_record.id} }" title="Ver">
                                   <i class="oi oi-eye"></i>
                               </router-link>
                            </div>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            work_report: {
                type: Object,
                required: true
            },
            actions: {
                default: false
            }
        }
    }
</script>