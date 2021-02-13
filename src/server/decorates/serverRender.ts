import { FastifyPluginCallback } from 'fastify';
// import fp from 'fastify-plugin';
import serverRenderPlugin from '../plugin/serverRenderPlugin';

const serverRender: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/', async (request, reply) => {
    console.log('server render');
    try {
      const { url } = request;
      const result = await serverRenderPlugin({ url });
      if (!result) {
        return reply.code(500).send({ message: 'SSR Error' });
      }
      reply
        .header('Content-Type', 'text/html; charset=utf-8')
        .code(result.statusCode)
        .send(result.html);
    } catch (e) {
      console.log(e);
      reply.code(500).send({ message: e });
    }
  });

  fastify.get('/post/:url_slug', async (request, reply) => {
    console.log('server render');
    try {
      const { url } = request;
      const result = await serverRenderPlugin({ url });
      if (!result) {
        return reply.code(500).send({ message: 'SSR Error' });
      }
      reply
        .header('Content-Type', 'text/html; charset=utf-8')
        .code(result.statusCode)
        .send(result.html);
    } catch (e) {
      console.log(e);
      reply.code(500).send({ message: e });
    }
  });

  done();
};

export default serverRender;
