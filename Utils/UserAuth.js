import JWT from "./jwtCreator.js";

const checkAuthentication = async (req, res, next) => {
    
    if (req.session.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

export { checkAuthentication }