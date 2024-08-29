import Vue from "vue";
import App from "./App.vue";
import io from "socket.io-client";

// Crear una instancia de Vue
new Vue({
  el: "#app",
  render: (h) => h(App),
  data: {
    socket: io("web-neurociencia-hr6g.vercel.app"), // Cambia esto al dominio correcto
  },
  created() {
    this.socket.on("startCountdown", (number) => {
      this.$data.countdownNumber = number;
      this.$data.currentScreen = "game";
    });

    this.socket.on("gameResult", (data) => {
      this.$data.currentScreen = "result";
      // Aquí deberías agregar el código para generar la gráfica de barras con los resultados.
    });
  },
});
