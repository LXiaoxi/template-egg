"use strict";

module.exports = (app) => {
  class userController extends app.Controller {
    // 系统管理员登录
    async adminLogin() {
      const { ctx } = this;
      const data = ctx.request.body;
      const res = await ctx.service.adminCms.user.adminLogin(data);
      ctx.body = res;
    }
    // 系统管理员添加
    async adminAdd() {
      const { ctx } = this;
      const data = ctx.request.body;
      const res = await ctx.service.adminCms.user.adminAdd(data);
      ctx.body = res;
    }
    // 系统管理员列表
    async adminList() {
      const { ctx } = this;
      const params = ctx.query;
      const res = await ctx.service.adminCms.user.adminList(params);
      ctx.body = res;
    }
    // 系统管理员删除
    async adminDelete() {
      const { ctx } = this;
      const { id } = ctx.params;
      const res = await ctx.service.adminCms.user.adminDelete(id);
      ctx.body = res;
    }
    // 系统管理员修改
    async adminUpdate() {
      const { ctx } = this;
      const data = ctx.request.body;
      const res = await ctx.service.adminCms.user.adminUpdate(data);
      ctx.body = res;
    }
  }
  return userController;
};
