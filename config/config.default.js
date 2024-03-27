/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1709086103435_4989";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // mysql配置信息
  config.mysql = {
    client: {
      host: "localhost",
      port: "3306",
      user: "root",
      password: "123456",
      database: "cherish-grain",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // 配置错误信息
  config.onerror = {
    all(err, ctx) {
      // 定义所有响应类型的错误处理方法
      // 定义了 config.all 后，其他错误处理不再生效
      ctx.body = '{ code: 500, message: "服务器发送错误" }';
      ctx.status = 500;
    },
  };
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: ["http://localhost:5173"],
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };
  // 配置中间件
  config.middleware = ["author", "notfoundHandler", "token"];
  // 登录鉴权
  // config.jwt = {
  //   secret: "123456",
  //   enable: true,
  //   ignore: ["/user/login", "/user/password/*"], // 哪些不需要验证
  //   // match: "/user",
  //   sign: {
  //     expiresIn: "24h",
  //   },
  // };

  return {
    ...config,
    ...userConfig,
  };
};
