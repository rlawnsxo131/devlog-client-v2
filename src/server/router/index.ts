import Router from '@koa/router';
import axios from 'axios';

const router = new Router();
const api = process.env.REACT_APP_API_URI;

router.get('/health', (ctx) => {
  ctx.body = `${ctx.headers['user-agent']}\nhello world`;
});

router.get('/(rss|atom)', async (ctx) => {
  const { data } = await axios.get(`${api}/rss`);
  ctx.status = 200;
  ctx.type = 'text/xml; charset=UTF-8';
  ctx.body = data;
});

router.get('/(rss|atom)/:tag', async (ctx) => {
  const { tag } = ctx.params;
  const { data } = await axios.get(`${api}/rss/${tag}`);
  ctx.status = 200;
  ctx.type = 'text/xml; charset=UTF-8';
  ctx.body = data;
});

router.get('/sitemaps/:filename', async (ctx) => {
  const { filename } = ctx.params;
  const { data } = await axios.get(`${api}/sitemaps/${filename}`);
  ctx.status = 200;
  ctx.type = 'text/xml; charset=UTF-8';
  ctx.body = data;
});

export default router;
