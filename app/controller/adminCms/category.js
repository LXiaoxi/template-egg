"use strict";

const Controller = require("egg").Controller;

class CategoryController extends Controller {
  // 添加规格
  async addCategory() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.category.addCategory(data);
    ctx.body = res;
  }
  // 修改规格
  async updateCategory() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.category.updateCategory(data);
    ctx.body = res;
  }
  // 删除规格
  async delCategory() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.adminCms.category.delCategory(id);
    ctx.body = res;
  }
  // 规格列表
  async categoryList() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.adminCms.category.categoryList(query);
    ctx.body = res;
  }
  // 规格详情
  async getCategory() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.adminCms.category.getCategory(id);
    ctx.body = res;
  }
}

module.exports = CategoryController;
