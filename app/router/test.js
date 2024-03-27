module.exports = (app) => {
  const { router, controller } = app;
  router.get("/index/abc", controller.test.index);
};
