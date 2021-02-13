import { FastifyPluginCallback } from 'fastify';
import healthRoute from './healthRoute';

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(healthRoute, { prefix: 'health' });
  done();
};

export default routes;
