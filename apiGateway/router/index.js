const Router = require('koa-router');

const apiAdapter = require('./apiAdapter');
const config = require('../config.json');

const router = new Router();

const companyService = apiAdapter(config.COMPANY_SERVICE_BASE_URL);
const usersService = apiAdapter(config.USER_SERVICE_BASE_URL);
const webpageAPI = apiAdapter(config.WEBPAGE_URL);

router.get(['/companies', '/companies/*'], async ctx => {
  const resp = await companyService.get(ctx.path);
  ctx.body = resp.data;
});

router.post('/companies', async ctx => {
  const resp = await companyService.post(ctx.path, ctx.body);

  if (resp.status >= 200 && resp.status <= 299) {
    ctx.body = null;
  } else {
    throw new Error(resp.statusText);
  }
});

router.get(['/users', '/users/*'], async ctx => {
  const resp = await usersService.get(ctx.path);
  ctx.body = resp.data;
});

router.post('/users', async ctx => {
  const resp = await usersService.post(ctx.path, ctx.body);

  if (resp.status >= 200 && resp.status <= 299) {
    ctx.body = null;
  } else {
    throw new Error(resp.statusText);
  }
});

router.get('/', async ctx => {
  const resp = await webpageAPI.get(ctx.path);
  ctx.body = resp.data;
});

module.exports = router;
