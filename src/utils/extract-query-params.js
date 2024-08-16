

/**
 * Extract the query params of a route and return it as object
 * 
 * @param {string} query - ?param=value&other=other_value
 * @returns {object}
 */
export function extractQueryParam(query) {

    if (!query || query.length === 0) {

        return {};
    }

    return query.substr(1).split('&').reduce((queryParams, param) => {

        const [key, value] = param.split('=');
        queryParams[key] = value;
        return queryParams
    }, {})
}