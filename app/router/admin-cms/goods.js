module.exports = (app) => {
  const { router, controller } = app;
  router.post("/goods/add", controller.adminCms.goods.addGoods);
  router.put("/goods/update", controller.adminCms.goods.updateGoods);
  router.delete("/goods/del/:id", controller.adminCms.goods.delGoods);
  router.get("/goods/list", controller.adminCms.goods.goodsList);
  router.get("/goods/:id", controller.adminCms.goods.getGoods);
};
