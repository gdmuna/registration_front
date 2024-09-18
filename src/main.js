import { createApp } from 'vue';

import router from './router';

import './style.css';

import App from './App.vue';
import Varlet from '@varlet/ui';
import '@varlet/touch-emulator';
import VueApexCharts from 'vue3-apexcharts';

import '@varlet/ui/es/style';

const app = createApp(App);

app.use(router).use(Varlet).use(VueApexCharts).mount('#app');
