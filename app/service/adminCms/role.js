"use strict";

const Service = require("egg").Service;

class RoleService extends Service {
  async addRole(data) {
    const { app, ctx } = this;
    data.createUserId = ctx.userInfo.id;
    const roleInfo = { ...data };
    delete roleInfo.menuId;
    const res = await app.mysql.insert("role", roleInfo);
    const res1 = await app.mysql.insert("role_menu", {
      roleId: res.insertId,
      menuId: JSON.stringify(data.menuId),
    });
    if (res.affectedRows && res1.affectedRows) {
      return { code: 200, msg: "插入成功" };
    } else {
      return { code: 500, msg: "插入失败" };
    }
  }
  async updateRole(data) {
    const { app, ctx } = this;
    const roleInfo = {
      id: data.id,
      roleName: data.roleName,
      roleDesc: data.roleDesc,
      status: data.status,
      updateUserId: ctx.userInfo.id,
    };
    const res = await app.mysql.update("role", roleInfo, {
      where: { id: roleInfo.id },
    });
    const res1 = await app.mysql.update(
      "role_menu",
      {
        menuId: JSON.stringify(data.menuId),
      },
      { where: { roleId: roleInfo.id } }
    );
    if (res.affectedRows && res1.affectedRows) {
      return { code: 200, msg: "修改成功" };
    } else {
      return { code: 500, msg: "修改失败" };
    }
  }
  async delRole(id) {
    const { app } = this;
    const res1 = await app.mysql.delete("role", { id });
    const res2 = await app.mysql.delete("role_menu", { roleId: id });
    if (res1.affectedRows && res2.affectedRows) {
      return { code: 200, msg: "删除成功" };
    } else {
    }
  }
  async listRole(query) {
    const { app } = this;
    const likeSql = `SELECT * from role
    WHERE roleName like '%${query.roleName ? query.roleName : ""}%'
    AND status LIKE '%${query.status ? query.status : ""}%'
    LIMIT ${Number(query.pageSize) || 10000} 
    OFFSET ${(query.pageNum - 1) * query.pageSize || 0}`;

    const data = await app.mysql.query(likeSql);
    const total = await app.mysql.count("role");
    return { code: 200, msg: "查询成功", data, total };
  }

  async getRole(id) {
    const { app } = this;
    const data = await app.mysql.query(`
    select r.*,rm.menuId from role r
    join role_menu rm
    on r.id = rm.roleId and r.id = ${id}
    `);
    const newMenu = [];
    const newMenuId = data[0].menuId
      .slice(1, data[0].menuId.length - 1)
      .split(",");
    for (let item of newMenuId) {
      const res = await app.mysql.select("menu", { where: { id: item } });
      console.log(res, "res");
      if (res.length > 0) {
        res[0].children = [];
        newMenu.push(res[0]);
      }
    }
    const parent = [];
    const children = [];
    for (let item of newMenu) {
      if (item.menuType == "M") {
        parent.push(item);
      } else if (item.menuType == "C") {
        children.push(item);
      }
    }
    const newData = [];
    parent.forEach((item) => {
      children.forEach((i) => {
        if (item.id == i.parentId) {
          item.children.push(i);
        }
      });
      newData.push(item);
    });
    data[0].menu = newData;
    return { code: 200, msg: "成功", data: { ...data[0] } };
  }
}

module.exports = RoleService;
