import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const app = createApp(App);
app.use(router);
app.use(VueToast);
app.mount('#app');
