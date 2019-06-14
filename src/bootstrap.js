try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    window.moment = require('moment');
    
    moment.locale('es');
    
    require('bootstrap');
} catch (e) {}

import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import '@icon/open-iconic/open-iconic.css';
import 'vue-loading-overlay/dist/vue-loading.css';