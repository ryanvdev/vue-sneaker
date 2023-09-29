import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify, {type ToastContainerOptions} from 'vue3-toastify';
import { vuetify } from './plugins/vuetify';
import { Ripple } from 'vuetify/directives';
import { router } from './utils/router';

import { IS_DEV } from './utils/constants';
import App from './App.vue';

import 'vue3-toastify/dist/index.css';
import './style.scss';

console.info(`is dev = ${IS_DEV}`);

const pinia = createPinia();
const app = createApp(App);

// middlewares
app.use(Vue3Toastify, {
    autoClose: 5000,
    position: 'top-right',
    theme: 'dark',
    closeOnClick: true,
    closeButton: true,
    limit: 3,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    clearOnUrlChange: false,
} as ToastContainerOptions );
app.use(vuetify);
app.use(router);
app.use(pinia);

// directives =======

app.directive('ripple', Ripple);

// ==================

app.mount('#root');