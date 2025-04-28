class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.isOperational = true;
        this.statusCode = statusCode;
    }
}

export default AppError;
