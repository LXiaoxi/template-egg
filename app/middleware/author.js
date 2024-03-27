module.exports = () => {
  return async function author(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    await next();
  };
};
