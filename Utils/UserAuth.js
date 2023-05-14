import JWT from "./jwtCreator.js";

const checkAuthentication = async (req, res, next) => {

    // check authorization header for bearer tokens
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // verify token
        const isValid = await JWT.verify(token);
        if (!isValid) {
            res.sendStatus(401);
        } else {
            const decoded = JWT.decode(token);
            req.session.user = decoded.user;
        }
    }
    if (req.session.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

export { checkAuthentication }