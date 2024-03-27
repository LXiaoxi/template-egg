/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  require("./router/test")(app);
  require("./router/admin-cms/user")(app);
  require("./router/admin-cms/menu")(app);
  require("./router/admin-cms/role")(app);
};
