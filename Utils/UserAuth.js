const checkAuthentication = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        console.log('Not authorized! session: , ', req.session);
        console.log('Not authorized! User: , ', req.session.user);
        res.status(401).send('Unauthorized, no session found');
    }
};

export { checkAuthentication }