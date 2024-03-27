module.exports = (app) => {
  const { router, controller } = app;
  router.post("/role/add", controller.adminCms.role.addRole);
  router.put("/role/update", controller.adminCms.role.updateRole);
  router.delete("/role/del/:id", controller.adminCms.role.delRole);
  router.get("/role/list", controller.adminCms.role.listRole);
  router.get("/role/:id", controller.adminCms.role.getRole);
};
