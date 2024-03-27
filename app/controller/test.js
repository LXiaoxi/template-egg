const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    const res = await ctx.service.test.abc(data);
    ctx.body = res;
  }
}

module.exports = HomeController;
