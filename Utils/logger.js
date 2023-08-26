import morgan from 'morgan';

const logger = morgan((tokens, req, res) => {


    // Define the 'user' token
    morgan.token('user', (req, res) => {
        const user = req.user ? req.user.EMAIL : 'NOT LOGGED IN';
        const userWithBrackets = `[${user}]`;
        return userWithBrackets.padEnd(30);
    });

    // Define the 'ip' token
    morgan.token('ip', (req, res) => {
        const ip = req.ip.slice(0, 15);
        const ipWithBrackets = `[${ip}]`;
        return ipWithBrackets.padEnd(20);
    });

    // Define the 'method' token
    morgan.token('method', (req, res) => {
        const methodWithBrackets = `[${req.method}]`;
        return methodWithBrackets.padEnd(9);
    });

    // Define the 'status' token
    morgan.token('status', (req, res) => {
        const statusWithBrackets = `[${res.statusCode}]`;
        return statusWithBrackets.padEnd(5);
    });

    // Calculate the response time
    const responseTime = tokens['response-time'](req, res);
    const responseTimeWithMs = `[${responseTime} ms]`.padEnd(14);

    // Return the formatted log message
    return [
        `DATE: [${new Date().toLocaleString()}]`,
        `USER: ${tokens.user(req, res)}`,
        `IP ADDRESS: ${tokens.ip(req, res)}`,
        `RESPONSE_TIME: ${responseTimeWithMs}`,
        `STATUS: ${tokens.status(req, res)}`,
        `METHOD: ${tokens.method(req, res)}`,
        `URL: [${tokens.url(req, res)}]`,
    ].join(' ');
});

export default logger;