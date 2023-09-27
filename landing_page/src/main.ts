import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vuetify } from './plugins/vuetify';
import { Ripple } from 'vuetify/directives';
import { router } from './utils/router';

import { IS_DEV } from './utils/constants';
import App from './App.vue';

import './style.scss';

console.info(`is dev = ${IS_DEV}`);

const pinia = createPinia();
const app = createApp(App);

// middlewares
app.use(vuetify);
app.use(router);
app.use(pinia);

// directives =======

app.directive('ripple', Ripple);

// ==================

app.mount('#root');