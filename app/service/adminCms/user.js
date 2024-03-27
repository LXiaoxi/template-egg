"use strict";

const Service = require("egg").Service;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
class UserService extends Service {
  // 设置token
  async setToken(obj) {
    const { ctx, app } = this;
    const token = jwt.sign({ ...obj }, app.config.jwt.secret, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  }
  // 系统管理员登录
  async adminLogin(data) {
    /**
     * 判断该用户名密码是否正确
     * 正确: 设置token, 将查询的数据返回给用户
     * 不正确: 提示用户该用户名或者密码错误
     */
    const { ctx, app } = this;
    const { userName, password } = data;
    const res = await app.mysql.select("user", {
      where: { userName, password },
    });
    if (res[0].status == "1") {
      return { code: 500, msg: "该用户状态不可登录" };
    }
    const res1 = await app.mysql.select("user_role", {
      where: { userId: res[0].id },
    });
    res[0].roleId = res1[0].roleId;
    if (res.length > 0) {
      let token = await this.setToken(res[0]);
      const userInfo = { ...res[0] };
      delete userInfo.password;
      return { code: 200, msg: "成功", data: { token, userInfo } };
    } else {
      return { code: 500, msg: "用户名或者密码错误" };
    }
  }
  // 系统管理员添加
  async adminAdd(data) {
    /**
     * 判断用户名是否存在
     * 存在: 返回500,提示用户该用户名已存在
     * 不存在: 插入改数据,返回200,提示用户注册成功
     */
    const { app } = this;
    const { userName, password } = data;
    const userInfo = { ...data };
    delete userInfo.roleId;
    const res = await app.mysql.select("user", { where: { userName } });
    if (res.length > 0) {
      return { code: 500, msg: "该用户名已存在!" };
    }
    const res1 = await app.mysql.insert("user", userInfo);
    const res2 = await app.mysql.insert("user_role", {
      userId: res1.insertId,
      roleId: data.roleId,
    });
    if (res1.affectedRows && res2.affectedRows) {
      return { code: 200, msg: "插入成功" };
    } else {
      return { code: 500, msg: "插入成功" };
    }
  }
  // 系统管理员列表
  async adminList(params) {
    const { app } = this;
    let { pageSize, pageNum } = params;
    const total = await app.mysql.count("user", { isDelete: "1" });
    const data = await app.mysql.query(`
      SELECT u.id, u.userName,u.password,u.status, u.createTime,u.createUserId, u.updateTime,u.updateUserId,r.roleName, ur.roleId from user u
      JOIN user_role ur
      on u.id = ur.userId 
      JOIN role r
      on ur.roleId = r.id
      where u.userName like '%${params.userName ? params.userName : ""}%'
      and u.status like '%${params.status ? params.status : ""}%'
      and u.isDelete = '1'
      limit ${pageSize ?? 10}
      offset ${(pageNum - 1) * pageSize ?? 0}
    `);
    return { code: 200, msg: "成功", data, total };
  }
  // 系统管理员删除
  async adminDelete(id) {
    const { app } = this;
    const res = await app.mysql.update(
      "user",
      { isDelete: "0" },
      { where: { id } }
    );
    if (res.affectedRows == 1) {
      return { code: 200, msg: "删除成功" };
    } else {
      return { code: 500, msg: "错误" };
    }
  }
  // 系统管理员修改
  async adminUpdate(data) {
    const { app, ctx } = this;
    const userInfo = {
      userName: data.userName,
      status: data.status,
      password: data.password,
      updateUserId: ctx.userInfo.id,
    };
    const res1 = await app.mysql.update("user", userInfo, {
      where: { id: data.id },
    });
    const res2 = await app.mysql.update(
      "user_role",
      { roleId: data.roleId },
      { where: { userId: data.id } }
    );
    if (res1.affectedRows && res2.affectedRows) {
      return { code: 200, msg: "修改成功" };
    } else {
      return { code: 500, msg: "修改失败" };
    }
  }
}

module.exports = UserService;
