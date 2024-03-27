module.exports = (app) => {
  const { router, controller } = app;
  router.post("/user/login", controller.adminCms.user.adminLogin);
  router.post("/user/add", controller.adminCms.user.adminAdd);
  router.delete("/user/del/:id", controller.adminCms.user.adminDelete);
  router.get("/user/list", controller.adminCms.user.adminList);
  router.put("/user/update", controller.adminCms.user.adminUpdate);
};
