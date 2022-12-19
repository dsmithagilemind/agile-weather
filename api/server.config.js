/**
 * This file allows you to configure the Fastify Server settings
 * used by the RedwoodJS dev server.
 *
 * It also applies when running RedwoodJS with `yarn rw serve`.
 *
 * For the Fastify server options that you can set, see:
 * https://www.fastify.io/docs/latest/Reference/Server/#factory
 *
 * Examples include: logger settings, timeouts, maximum payload limits, and more.
 *
 * Note: This configuration does not apply in a serverless deploy.
 */

/** @type {import('fastify').FastifyServerOptions} */
const config = {
  requestTimeout: 15_000,
  logger: {
    // Note: If running locally using `yarn rw serve` you may want to adust
    // the default non-development level to `info`
    level: process.env.NODE_ENV === "development" ? "debug" : "warn",
  },
};

/**
 * You can also register Fastify plugins and additional routes for the API and Web sides
 * in the configureFastify function.
 *
 * This function has access to the Fastify instance and options, such as the side
 * (web, api, or proxy) that is being configured and other settings like the apiRootPath
 * of the functions endpoint.
 *
 * Note: This configuration does not apply in a serverless deploy.
 */

/** @type {import('@redwoodjs/api-server/dist/fastify').FastifySideConfigFn} */
const configureFastify = async (fastify, options) => {
  if (options.side === "api") {
    fastify.log.info({ custom: { options } }, "Configuring api side");
  }

  if (options.side === "web") {
    fastify.log.info({ custom: { options } }, "Configuring web side");
  }

  // CORS for fastify routes in dev mode, attach to prehandler
  if (process.env.NODE_ENV === "development") {
    fastify.get("/hello-fastify", function (request, reply) {
      reply.code(200).send({ hello: "world" });
    });

    fastify.addHook("preHandler", (req, res, done) => {
      const allowedRoutes = ["/hello-fastify"];
      if (allowedRoutes.includes(req.routerPath)) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "*");
      }
      done();
    });
  }

  // // longform method
  // fastify.route({
  //   method: 'GET',
  //   url: '/hello',
  //   schema: {
  //     // querystring: {
  //     //   name: { type: 'string' },
  //     //   excitement: { type: 'integer' }
  //     // },
  //     response: {
  //       200: {
  //         type: 'object',
  //         properties: {
  //           world: { type: 'string' },
  //         },
  //       },
  //     },
  //   },
  //   handler: function (request, reply) {
  //     reply.send({ hello: 'world' })
  //   },
  // })

  return fastify;
};

module.exports = {
  config,
  configureFastify,
};
