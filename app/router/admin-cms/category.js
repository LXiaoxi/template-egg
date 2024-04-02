module.exports = (app) => {
  const { router, controller } = app;
  router.post("/category/add", controller.adminCms.category.addCategory);
  router.put("/category/update", controller.adminCms.category.updateCategory);
  router.delete("/category/del/:id", controller.adminCms.category.delCategory);
  router.get("/category/list", controller.adminCms.category.categoryList);
  router.get("/category/:id", controller.adminCms.category.getCategory);
};
