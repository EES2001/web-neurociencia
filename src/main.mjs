import { createApp } from 'vue';
import App from './App.vue';
import io from 'socket.io-client';

const socket = io('https://ees.com');  // Cambia esto al dominio que obtendrás de Vercel

const app = createApp(App);

app.provide('socket', socket);

app.mount('#app');


