"use strict";

const Service = require("egg").Service;

class MenuService extends Service {
  // 添加菜单
  async addMenu(data) {
    const { app, ctx } = this;
    data.createUserId = ctx.userInfo.id;

    await app.mysql.insert("menu", data);
    return { code: 200, msg: "成功" };
  }
  // 查询菜单
  async listMenu() {
    const { app } = this;
    const res = await app.mysql.select("menu");
    res.map((item) => {
      item.children = [];
      return item;
    });
    return { code: 200, msg: "成功", data: res };
  }
  // 修改菜单
  async updateMenu(data) {
    const { app, ctx } = this;
    data.updateUserId = ctx.userInfo.id;
    const newData = {
      menuType: data.menuType,
      icon: data.icon,
      menuName: data.menuName,
      orderNum: data.orderNum,
      visible: data.visible,
      status: data.status,
    };
    const res = await app.mysql.update("menu", newData, {
      where: { id: data.id },
    });
    if (res.affectedRows) {
      return { code: 200, msg: "修改成功" };
    } else {
      return { code: 500, msg: "修改失败" };
    }
  }
  // 删除菜单
  async delMenu(id) {
    const { app } = this;
    const res = await app.mysql.delete("menu", { id });
    if (res.affectedRows == 1) {
      return { code: 200, msg: "删除成功" };
    } else {
      return { code: 500, msg: "该数据不存在" };
    }
  }
}

module.exports = MenuService;
