"use strict";

const Service = require("egg").Service;

class SpecService extends Service {
  // 添加规格
  async addSpec(data) {
    const { app, ctx } = this;
    data.createUserId = ctx.userInfo.id;
    const res = await app.mysql.insert("spec", data);
    if (res.affectedRows) {
      return { code: 200, msg: "插入成功" };
    }
  }
  // 修改规格
  async updateSpec(data) {
    const { app, ctx } = this;
    data.updateUserId = ctx.userInfo.id;
    const res = await app.mysql.update("spec", data, {
      where: { id: data.id },
    });
    if (res.affectedRows) {
      return { code: 200, msg: "修改成功" };
    }
  }
  // 删除规格
  async delSpec(id) {
    const { app } = this;
    const res = await app.mysql.delete("spec", { id });
    if (res.affectedRows) {
      return { code: 200, msg: "删除成功" };
    }
  }
  // 规格列表
  async specList(query) {
    const { app } = this;
    const res = await app.mysql.query(`
      SELECT * from spec
      WHERE specName like '%${query.specName ? query.specName : ""}%'
      LIMIT ${Number(query.pageSize) || 10}
      OFFSET ${Number(query.pageNum - 1) * query.pageSize || 0} 
    `);
    const total = await app.mysql.count("spec");
    return { code: 200, msg: "成功", data: res, total };
  }
  // 规格详情
  async getSpec(id) {
    const { app } = this;
    const res = await app.mysql.select("spec", { where: { id } });
    return { code: 200, msg: "成功", data: { ...res } };
  }
}

module.exports = SpecService;
