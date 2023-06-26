const fastify = require('fastify')({ logger: true });

const items = new Map();

const decodeJWT = (token) => {
    try {
        // TODO: validate using jwks endpoint
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

fastify.addHook('preHandler', (request, reply, done) => {
    const token = request.headers['x-jwt-assertion'];
    fastify.log.info('token: ' + token);
    if (!token) {
        return reply.status(401).send({ message: 'Missing token.' });
    }

    const decoded = decodeJWT(token);
    if (!decoded) {
        return reply.status(401).send({ message: 'Invalid token.' });
    }

    request.auth = decoded;
    done();
});

fastify.get('/', function (request, reply) {
    reply.send('Service is up and running!');
})

fastify.get('/items', (request, reply) => {
    fastify.log.info('GET /items request received from user ' + request.auth.sub);
    reply.send(items.get(request.auth.sub) || []);
});

fastify.post('/items', (request, reply) => {
    const item = request.body;
    fastify.log.info('POST /items request received from user ' + request.auth.sub);
    const tempItems = items.get(request.auth.sub) || [];
    tempItems.push(item);
    items.set(request.auth.sub, tempItems);
    reply.send(item);
});

fastify.listen({ port: 9090, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
