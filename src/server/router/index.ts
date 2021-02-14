import Router from '@koa/router';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.body = `${ctx.headers['user-agent']}\nhello world`;
});

export default router;
