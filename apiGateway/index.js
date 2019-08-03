const Koa = require('koa');

const router = require('./router');
const config = require('./config.json');

const PORT = config.PORT || 3000;
const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(router.routes());

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
