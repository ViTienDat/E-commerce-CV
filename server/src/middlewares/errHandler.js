const notFound = (req, res, next) => {
    const error = new Error(`Route not found`)
    res.status(404)
    next(error)
}

const errHandler = (error, req, res, next) => {
    const statusCode = req.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false,
        message: error?.message
    })
}

module.exports = {
    notFound,
    errHandler
}