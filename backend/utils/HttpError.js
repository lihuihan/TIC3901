
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Call the parent class constructor with the message
        this.code = errorCode; // Set the error code
    }
}

export default HttpError;// Export the HttpError class
