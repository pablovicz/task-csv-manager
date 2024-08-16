
/**
 * JSON middleware to read the body of application as JSON and set the response Content Type as JSON type
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function jsonMiddleware(req, res) {

    const hasContentType = JSON.stringify(req.headers).toLowerCase().includes('content-type');
    const contentType = JSON.parse(JSON.stringify(req.headers).toLowerCase())['content-type'];

    if (hasContentType && contentType === 'application/json') {

        let buffers = [];

        for await (const chunk of req) {

            buffers.push(chunk)
        }

        try {
            req.body = JSON.parse(Buffer.concat(buffers).toString())
        } catch {
            req.body = null;
        }
    } else {

        req.body = null;
    }

    res.setHeader('Content-type', 'application/json')
}