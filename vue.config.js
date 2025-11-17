const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://anubis-posts.onrender.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
