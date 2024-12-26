const StatusCodes = require('http-status-codes')
const { HTTPError } = require('./response')

const catchAsyncErrors = action => async (req, res, next) => {
    try {
        await action(req, res, next)
    } catch (error) {
        console.log('catchAsyncErrors ==>', error)
        const err = new HTTPError(
            'Internal Server Error',
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        )
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
    }
}

const validationCatches = validation => async (req, res, next) => {
    try {
        await validation(req, res, next)
    } catch (error) {
        console.log('validationCatches errors==>', error)
        const err = new HTTPError(
            'Validations failed',
            StatusCodes.BAD_REQUEST,
            error.errors
        )
        res.status(StatusCodes.BAD_REQUEST).json(err)
    }
}

module.exports = {
    catchAsyncErrors,
    validationCatches
}