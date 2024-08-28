module.exports = {
  presets: [
    '@babel/preset-env', // Preset para convertir ES6+ a ES5
    '@babel/preset-typescript' // Preset opcional para TypeScript, si lo usas
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // Plugin opcional para manejar el uso de helpers
  ]
};




