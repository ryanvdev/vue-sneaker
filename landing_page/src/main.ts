import * as Vue from 'vue';
import './style.scss';
import { router } from './utils/router';
import App from './App.vue';
import { vuetify } from './plugins/vuetify';
import { IS_DEV } from './utils/constants';
import {Ripple} from 'vuetify/directives';

console.info(`is dev = ${IS_DEV}`);

const app = Vue.createApp(App); 

// middlewares
app.use(vuetify);
app.use(router);

// directives =======

app.directive('ripple', Ripple);

// ==================

app.mount('#root');