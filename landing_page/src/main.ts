import * as Vue from 'vue';
import './style.scss';
import { router } from './utils/router';
import App from './App.vue';
import { vuetify } from './plugins/vuetify';
import { IS_DEV } from './utils/constants';

console.info(`is dev = ${IS_DEV}`);

const app = Vue.createApp(App); 
app.use(router);
app.use(vuetify);
app.mount('#root');