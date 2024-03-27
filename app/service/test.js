"use strict";

const Service = require("egg").Service;

class TestService extends Service {
  async abc(data) {
    const { app } = this;
    const res = await app.mysql.query("select * from user where user_id > 2");
    console.log(res, "res");
    return { code: 200, msg: "ss", data: res };



    
  }
}

module.exports = TestService;
