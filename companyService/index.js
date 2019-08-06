const Koa = require('koa');
var bodyParser = require('koa-bodyparser');

const router = require('./router');
const config = require('./config.json');

const PORT = config.PORT || 3000;
const app = new Koa();

app.use(bodyParser()); // parse request's body
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
