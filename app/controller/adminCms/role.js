"use strict";

const Controller = require("egg").Controller;

class RoleController extends Controller {
  // 添加角色
  async addRole() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.role.addRole(data);
    ctx.body = res;
  }

  // 修改角色
  async updateRole() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.role.updateRole(data);
    ctx.body = res;
  }

  // 删除角色
  async delRole() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.adminCms.role.delRole(id);
    ctx.body = res;
  }

  // 获取角色列表
  async listRole() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.adminCms.role.listRole(query);
    ctx.body = res;
  }
  async getRole() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.adminCms.role.getRole(id);
    ctx.body = res;
  }
}

module.exports = RoleController;
