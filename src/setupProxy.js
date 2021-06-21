const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/jx", {
      //遇见/api前缀的请求，就会触发该代理配置
      target: "http://172.18.89.50:9000/", //请求发给谁
      changeOrigin: true, //控制服务器收到的请求头中Host字段的值
      pathRewrite: { "^/jx": "/jx" }, //重写请求路径
    }),
    // 飞飞
    // proxy('/jx', { //遇见/api前缀的请求，就会触发该代理配置
    //     target: 'http://172.18.87.40:9000/', //请求发给谁
    //     changeOrigin: true,//控制服务器收到的请求头中Host字段的值
    //     pathRewrite: {'^/jx': '/jx'} //重写请求路径
    // }),

    /* 唐yan */
    // proxy("/jx", {
    //   //遇见/api前缀的请求，就会触发该代理配置
    //   target: "http://172.18.87.69:9000/", //请求发给谁
    //   changeOrigin: true, //控制服务器收到的请求头中Host字段的值
    //   pathRewrite: { "^/jx": "/jx" }, //重写请求路径
    // }),

    proxy("/CertStore", {
      target: "http://172.18.87.68:9768/",
      changeOrigin: true,
      pathRewrite: { "^/api": "/api" },
    })
  );
};
