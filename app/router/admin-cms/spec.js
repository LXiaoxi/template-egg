module.exports = (app) => {
  const { router, controller } = app;
  router.post("/spec/add", controller.adminCms.spec.addSpec);
  router.put("/spec/update", controller.adminCms.spec.updateSpec);
  router.delete("/spec/del/:id", controller.adminCms.spec.delSpec);
  router.get("/spec/list", controller.adminCms.spec.specList);
  router.get("/spec/:id", controller.adminCms.spec.getSpec);
};
