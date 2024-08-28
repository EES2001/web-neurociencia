module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint", // Usamos babel-eslint para compatibilidad con las nuevas características de JavaScript
    sourceType: "module",
  },
  env: {
    browser: true, // Este entorno define las variables globales comunes a los navegadores.
    node: true, // Para que ESLint entienda el entorno de Node.js
  },
  extends: [
    "eslint:recommended", // Reglas recomendadas por ESLint
    "plugin:vue/recommended", // Reglas recomendadas para Vue.js
    "@vue/standard", // Reglas estándar para código Vue.js
  ],
  plugins: [
    "vue", // Agrega el plugin de ESLint para Vue.js
  ],
  rules: {
    quotes: ['quotes': 'off'], // Fuerza el uso de comillas simples
    semi: ["error", "always"], // Fuerza el uso de punto y coma
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // Permite el uso de console.log durante el desarrollo
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // Permite el uso de debugger durante el desarrollo
    indent: ["error", 2], // Fuerza la indentación de 2 espacios
    "space-before-function-paren": ["error", "never"], // Controla el espacio antes de la declaración de funciones
  },
};
