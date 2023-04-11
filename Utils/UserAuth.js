const checkAuthentication = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        console.log('NO SESSION FOUND: , ', req.session);
        res.status(401).send('Unauthorized, no session found');
    }
};

export { checkAuthentication }