import { buildRoutePath } from "../utils/build-route-path.js"
import { extractQueryParam } from "../utils/extract-query-params.js"


export function routeParamsMiddleware(req, res, route) {

    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups
    req.params = params
    req.query = extractQueryParam(query)
}