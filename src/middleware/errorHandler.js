import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    // Errors created with http-errors carry their own status (404, 400, ...)
    if (createHttpError.isHttpError(err)) {
        return res.status(err.status).json({ message: err.message || err.name });
    }

    // Any other unexpected error is a 500
    const isProd = process.env.NODE_ENV === 'production';
    res.status(500).json({
        message: isProd ? 'Something went wrong. Please try again later.' : err.message,
    });
};