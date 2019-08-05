const Router = require('koa-router');

const apiAdapter = require('./apiAdapter');
const config = require('../config.json');

const router = new Router();

const companyService = apiAdapter(config.COMPANY_SERVICE_BASE_URL);
const usersService = apiAdapter(config.USER_SERVICE_BASE_URL);
const webpageAPI = apiAdapter(config.WEBPAGE_URL);

router.get(['/api/companies', '/api/companies/*'], async ctx => {
  const resp = await companyService.get(ctx.path);
  ctx.body = resp.data;
});

router.post('/api/companies', async ctx => {
  const resp = await companyService.post(ctx.path, ctx.request.body);

  if (resp.status >= 200 && resp.status <= 299) {
    ctx.body = resp.data || null;
  } else {
    throw new Error(resp.statusText);
  }
});

router.get(['/api/users', '/api/users/*'], async ctx => {
  const resp = await usersService.get(ctx.path);
  ctx.body = resp.data;
});

router.put('/api/users/*', async ctx => {
  const resp = await usersService.put(ctx.path, ctx.request.body);
  ctx.body = resp.data;
});

router.delete('/api/users/*', async ctx => {
  const resp = await usersService.delete(ctx.path);
  ctx.body = resp.data;
});

router.post('/api/users', async ctx => {
  const resp = await usersService.post(ctx.path, ctx.request.body);

  if (resp.status >= 200 && resp.status <= 299) {
    ctx.body = resp.data || null;
  } else {
    throw new Error(resp.statusText);
  }
});

router.get('/', async ctx => {
  const resp = await webpageAPI.get(ctx.path);
  ctx.body = resp.data;
});

module.exports = router;
