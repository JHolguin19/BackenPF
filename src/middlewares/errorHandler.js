import { HttpResponse } from "../utils/http.response.js"
import { logger } from "../utils/logger.js"

const httpResponse = new HttpResponse()
export const errorHandler = (error, req, res, next) => {
    logger.error({
        name: error.name,
        message:error.message,
        url: req.url
    }) 

    if (res.headersSent) {
        return next(error);
    }
    return httpResponse.ServerError(res, error, req.url);

    // res.status(status).send(error.message)
}