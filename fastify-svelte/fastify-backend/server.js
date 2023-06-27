const fastify = require('fastify')({ logger: true });

const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

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
    reply.send(items);
});

fastify.post('/items', (request, reply) => {
    const item = request.body;
    fastify.log.info('POST /items request received from user ' + request.auth.sub);
    items.push(item);
    reply.send(item);
});

fastify.listen({ port: 9090, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
