"use strict";

const Controller = require("egg").Controller;

class GoodsController extends Controller {
  // 添加规格
  async addGoods() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.goods.addGoods(data);
    ctx.body = res;
  }
  // 修改规格
  async updateGoods() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.adminCms.goods.updateGoods(data);
    ctx.body = res;
  }
  // 删除规格
  async delGoods() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.adminCms.goods.delGoods(id);
    ctx.body = res;
  }
  // 规格列表
  async goodsList() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.adminCms.goods.goodsList(query);
    ctx.body = res;
  }
  // 规格详情
  async getGoods() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.adminCms.goods.getGoods(id);
    ctx.body = res;
  }
}

module.exports = GoodsController;
