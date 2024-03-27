module.exports = (app) => {
  const { router, controller } = app;
  router.post("/menu/add", controller.adminCms.menu.addMenu);
  router.get("/menu/list", controller.adminCms.menu.listMenu);
  router.put("/menu/update", controller.adminCms.menu.updateMenu);
  router.delete("/menu/del/:id", controller.adminCms.menu.delMenu);
};
