"use strict";

const Service = require("egg").Service;

class GoodsService extends Service {
  async addGoods(data) {
    const { app, ctx } = this;
    data.createUserId = ctx.userInfo.id;
    const res = await app.mysql.insert("goods", data);
    if (res.affectedRows) {
      return { code: 200, msg: "添加成功" };
    } else {
      return { code: 500, msg: "添加失败" };
    }
  }
  async updateGoods(data) {
    const { app, ctx } = this;
    data.updateUserId = ctx.userInfo.id;
    delete data.createTime;
    delete data.updateTime;
    const res = await app.mysql.update("goods", data, { id: data.id });
    if (res.affectedRows) {
      return { code: 200, msg: "修改成功" };
    } else {
      return { code: 500, msg: "修改失败" };
    }
  }
  async delGoods(id) {
    const { app } = this;
    const res = await app.mysql.delete("goods", { id });
    if (res.affectedRows) {
      return { code: 200, msg: "删除成功" };
    } else {
      return { code: 500, msg: "删除失败" };
    }
  }
  async goodsList(query) {
    const { app } = this;
    const res = await app.mysql.query(`
      SELECT * from goods
      WHERE name like '%${query.name ? query.name : ""}%'
      AND status like '%${query.status ? query.status : ""}%'
      LIMIT ${Number(query.pageSize) || 10}
      OFFSET ${Number(query.pageNum - 1) * query.pageSize || 0} 
    `);
    const total = await app.mysql.count("goods");
    return { code: 200, msg: "成功", data: res, total };
  }
  async getGoods(id) {
    const { app } = this;
    const res = await app.mysql.select("goods", { where: { id } });
    return { code: 200, msg: "成功", data: { ...res[0] } };
  }
}

module.exports = GoodsService;
