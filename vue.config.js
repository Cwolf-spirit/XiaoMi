const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      "/api": {
        target: "http://mall-pre.springboot.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api")) // 对应接口
      .set("@img", resolve("src/assets/imgs")) // 对应图片
      .set("@components", resolve("src/components")) // 对应组件
      .set("@storage", resolve("src/storage")) // 对应本地存储
      .set("@utils", resolve("src/utils")) // 对应本地工具
      .set("@views", resolve("src/views")) // 对应页面
      .set("@container", resolve("src/container")) // 对应布局容器
      .set("@layout", resolve("src/layout")); // 对应布局容器组件
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: "./src/style/common.scss"
        })
        .end();
    });
  }
};
