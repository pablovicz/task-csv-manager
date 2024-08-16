

/**
 * Build a RegExp to extract route and query params of a api path
 * 
 * @param {string} path - Route path /path/of/api/:route-param?query=params
 * @returns 
 */
export function buildRoutePath(path) {

    const routeParametersRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)')

    return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

}