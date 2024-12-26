class HTTPError extends Error {
    code;
    details;

    constructor(message = "Error", errorCode, details = []) {
        super();
        this.message = message;
        this.code = errorCode;
        this.details = details;
    }
}

class HTTPResponse {
    message;
    data;

    constructor(message = "Success", data) {
        this.message = message;
        this.data = data;
    }
}

module.exports = {
    HTTPError,
    HTTPResponse
}