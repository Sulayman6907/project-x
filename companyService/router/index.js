const Router = require('koa-router');

const router = new Router();

router.get('/api/companies', async ctx => {
  ctx.body = null;
});

module.exports = router;
