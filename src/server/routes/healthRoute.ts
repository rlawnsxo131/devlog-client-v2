import { FastifyPluginCallback } from 'fastify';

const healthRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' });
  });
  done();
};

export default healthRoute;
