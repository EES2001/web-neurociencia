// vue.config.js

module.exports = {
  // Base URL for your application
  publicPath:
    process.env.NODE_ENV === "production" ? "/your-production-path/" : "/",

  // Output directory
  outputDir: "dist",

  // Directory where static assets are placed
  assetsDir: "assets",

  // Enable linting on save
  lintOnSave: process.env.NODE_ENV !== "production",

  // Transpile dependencies (useful for modern JS)
  transpileDependencies: ["vue", "vuex", "vue-router", "babel-polyfill"],

  // Development server configuration
  devServer: {
    proxy: "http://localhost:3000", // Adjust this according to your backend server configuration
    open: true, // Automatically open the browser after server starts
    hot: true, // Enable hot module replacement
    port: 8080, // Specify port for dev server
  },

  // Webpack configuration
  configureWebpack: {
    entry: "./src/main.js",
    resolve: {
      alias: {
        "@": require("path").resolve(__dirname, "src"),
      },
    },
  },

  // Advanced Webpack configuration
  chainWebpack: (config) => {
    // Handling of specific file types or configurations
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        // Modify options for vue-loader here if needed
        return options;
      });
  },

  // CSS related options
  css: {
    sourceMap: process.env.NODE_ENV !== "production",
  },

  // Enable production source map
  productionSourceMap: false,

  // PWA configuration
  pwa: {
    name: "Brain to Brain",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },

  // Plugin options (e.g., for linting, etc.)
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },
};
