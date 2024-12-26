const requestLogger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const clientIp = req.ip || req.connection.remoteAddress;

    console.info(`
    =============================
    [${currentTime}] Request Logged
    -----------------------------
    Method:         ${method}
    URL:            ${url}
    Client IP:      ${clientIp}
    =============================
    `);

    next();
};

module.exports = requestLogger