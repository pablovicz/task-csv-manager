import http from 'node:http';
import { jsonMiddleware } from './middlewares/json.js'
import { routes } from './routes.js';
import { routeParamsMiddleware } from './middlewares/route-params.js';



const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await jsonMiddleware(req, res);

    const route = routes.find(route => route.method === method && route.path.test(url))

    if (route) {

        routeParamsMiddleware(req, res, route);

        return await route.handler(req, res);
    }

    return res.writeHead(404).end();
})


server.listen(3333)