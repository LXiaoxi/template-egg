"use strict";

const Controller = require("egg").Controller;

class MenuController extends Controller {
  // 添加菜单
  async addMenu() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.menu.addMenu(data);
    ctx.body = res;
  }
  // 查询菜单
  async listMenu() {
    const { ctx } = this;
    const res = await ctx.service.adminCms.menu.listMenu();
    ctx.body = res;
  }
  // 修改菜单
  async updateMenu() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.menu.updateMenu(data);
    ctx.body = res;
  }
  // 删除菜单
  async delMenu() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.adminCms.menu.delMenu(id);
    ctx.body = res;
  }
}

module.exports = MenuController;
