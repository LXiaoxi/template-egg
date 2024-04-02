"use strict";

const Controller = require("egg").Controller;

class SpecController extends Controller {
  // 添加规格
  async addSpec() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.spec.addSpec(data);
    ctx.body = res;
  }
  // 修改规格
  async updateSpec() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.spec.updateSpec(data);
    ctx.body = res;
  }
  // 删除规格
  async delSpec() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.adminCms.spec.delSpec(id);
    ctx.body = res;
  }
  // 规格列表
  async specList() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.adminCms.spec.specList(query);
    ctx.body = res;
  }
  // 规格详情
  async getSpec() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.adminCms.spec.getSpec(id);
    ctx.body = res;
  }
}

module.exports = SpecController;
