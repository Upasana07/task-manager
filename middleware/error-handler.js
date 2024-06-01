const { CustomAPIError } = require('../errors/cstome-error')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    } else {
        return res.send(500).json({ msg: 'something went wrong' })
    }
}

module.exports = errorHandlerMiddleware