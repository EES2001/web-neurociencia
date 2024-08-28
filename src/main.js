import Vue from "vue";
import App from "./App.vue";
import io from "socket.io-client";

// Conectar Socket.IO al servidor
const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT); // Asegúrate de que esta URL coincide con la del servidor

// Hacer que el socket esté disponible en todos los componentes
Vue.prototype.$socket = socket;

// Configuración para desactivar la producción y habilitar el modo de desarrollo
Vue.config.productionTip = false;

// Crear y montar la instancia de Vue
new Vue({
  render: (h) => h(App),
}).$mount("#app");
