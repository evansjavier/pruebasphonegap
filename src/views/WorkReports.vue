<template>
    <div class="card" ref="div">
        <div class="card-header"><h5>Reportes</h5></div>
        <div class="card-body">
            <div ref="table-container">
                <table class="table table-striped w-100" ref="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Estado</th>
                            <th>Fecha</th>
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
                
                id && vm.$router.push({'name':'work-reports.show', params: {"id":  id } });
                
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
                    url: axios.defaults.baseURL + '/work-reports'
                },
                columns: [
                    {data: 'id'},
                    {
                        data: function( row, type, vale, meta) {
                            switch(row.state) {
                                case 'PENDING': 
                                    return 'Pendiente';
                                
                                case 'SIGNED': 
                                    return 'Firmado';
                                
                                default:
                                    return '-';
                            }  
                        },
                        name: 'state'
                        
                    },
                    {
                        data: function ( row, type, val, meta ){
                            return row.report_date;
                            
                        },
                        name: 'report_date'
                        
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
                    
                    this.api().columns().every(function (index, a) {
                        var column = this;
                        let field_name = columns[index].name || columns[index].data;
                        var $input;
                        
                        switch(field_name) {
                            case 'report_date': {
                               $input =  $('<input>').attr({
                                    type: 'date',
                                    class: 'form-control form-control-sm'
                                });
                                
                                break;
                            }
                            
                            case 'state': {
                               $input =  $('<select></select>').attr({
                                    class: 'form-control form-control-sm'
                                });
                                
                                let options = {
                                    '-' : null,
                                    'Pendiente': 'PENDING' ,
                                    'Firmado': 'SIGNED' 
                                };
                                
                                for (let v in options) {
                                    $('<option></option>').attr({
                                        value: options[v] || ''
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