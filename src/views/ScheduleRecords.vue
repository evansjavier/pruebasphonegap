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
                //  language: require('datatables.net-plugins/i18n/Spanish.lang'),
                ajax: {
                    dataType: 'json',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    url: axios.defaults.baseURL + '/schedule-records'
                },
                columns: [
                    {data: 'id'},
                    {data: 'date'},
                    {data: 'schedule'},
                    {data: 'executed', 
                        render: function(data){
                            return data > 0 ? "Si" : "No";
                        }
                    },
                    {data: null, 
                        defaultContent: 
                            '<div class="d-flex justify-content-center">'
                                + ' <btn class="action action-view btn btn-sm btn-primary" title="Ver"><i class="oi oi-eye"></i></btn>'
                            +'</div>'    
                    }
                ],
                initComplete: function () {
                    let columns = this.api().init().columns;
                    
                    this.api().columns().every(function (index) {
                        var column = this;
                        var $input;
                        
                        switch(columns[index].data) {
                            
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
                                    0: 'No',
                                    1: 'Si'
                                };
                                
                                for (let v in options) {
                                    $('<option></option>').attr({
                                        value: v
                                    })
                                    .text(options[v])
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