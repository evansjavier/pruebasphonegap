<template>
    <div class="card" ref="div">
        <div class="card-header"><h5>Fichas</h5></div>
        <div class="card-body">
            <div ref="table-container">
                <table class="table table-striped w-100" ref="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Realizado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Realizado</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>
<style>
    div.dataTables_wrapper div.dataTables_paginate ul.pagination {
        flex-wrap: wrap;
    }
    
    div.dataTables_wrapper div.dataTables_info {
        white-space: normal;
    }
</style>
<script>
    import DataTable from 'datatables.net-bs4';
    
    export default {
        mounted() {
            let vm = this;
            
            $(this.$refs['div']).on('click', '.action.action-view', function(){
                let id = $(this).parents('tr').find('td').first().text();
                
                console.log(id);
                
                id && vm.$router.push({'name':'schedule-records.show', params: {"id":  id } });
                
            });
            
            $('table').dataTable({
                processing: true,
                serverSide: true,
                pageLength: 5,
                lengthMenu: [],
                searching: true,
                language: require('../assets/dt.spanish').default,
                ajax: {
                    dataType: 'json',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    url: axios.defaults.baseURL + '/schedule-records'
                },
                columns: [
                    {data: 'id', name: 'id'},
                    {
                        data: function ( row, type, val, meta ){
                            try {
                                let date = new Date(row.date);
                                
                                return moment(row.date).format('L') ;
                            }
                            catch ( error ){
                                return row.date;
                            }
                            
                        }, 
                        name: 'date'
                        
                    },
                    {data: 'schedule', name: 'schedule', searchable: false, orderable: false},
                    {data: 'executed', 
                        render: function(data){
                            return data > 0 ? "Si" : "No";
                        },
                        'className' : 'text-center',
                        name: 'executed'
                    },
                    {
                        data: null, 
                        defaultContent: 
                            '<div class="d-flex justify-content-center">'
                                + ' <btn class="action action-view btn btn-sm btn-primary" title="Ver"><i class="oi oi-eye"></i></btn>'
                            +'</div>',
                        searchable: false,
                        orderable: false,
                    }
                ],
                initComplete: function () {
                    let columns = this.api().init().columns;
                    
                    this.api().columns().every(function (index) {
                        var column = this;
                        var $input;
                        
                        switch(columns[index].name) {
                            
                            case 'date': {
                               $input =  $('<input>').attr({
                                    type: 'date',
                                    class: 'form-control form-control-sm'
                                });
                                
                                break;
                            }
                            
                            case 'executed': {
                               $input =  $('<select></select>').attr({
                                    class: 'form-control form-control-sm'
                                });
                                
                                let options = {
                                    '-' : '',
                                    'No': 0 ,
                                    'Si': 1
                                };
                                
                                for (let v in options) {
                                    $('<option></option>').attr({
                                        value: options[v]
                                    })
                                    .text(v)
                                    .appendTo($input);
                                }
                                
                                break;
                            }
                            
                            default: {
                                return;
                            }
                        }
                        
                        $input.appendTo($(column.footer()).empty())
                        .on('change', function () {
                            column.search($(this).val(), false, false, true).draw();
                        });
                    });
                    
                    $(vm.$refs['table-container']).find('table').parent().addClass('table-responsive');
                }
            });
        }
    }
</script>