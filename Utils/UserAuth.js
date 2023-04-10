const checkAuthentication = (req, res, next) => {
    // check ifthere is a session
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).send('Unauthorized, no session found');
    }
};

export {checkAuthentication}