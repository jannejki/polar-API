'use strict'
/* import dependencies */
import express from 'express';
import webController from '../Controllers/webController.js';
import { checkAuthentication } from '../Utils/UserAuth.js';
import cookie from 'cookie'

/* Initialize required variables */
const webRouter = express.Router();

/* Routes */
webRouter.get('/', webController.index);
//webRouter.get('/login', webController.login);
webRouter.get('/oauth2_callback', webController.oauthCallback);
webRouter.get('/data', checkAuthentication, webController.data);

webRouter.post('/login', (req, res) => {
    console.log('POST /login');
    // get username and password
    const { user, pwd } = req.body;
    console.log({ user, pwd });
    if (user === 'admin' && pwd === 'admin') {
        req.session.user = { name: 'admin' };
        res.json({ x_user_id: "testi" });
    } else {
        res.status(401).send('Unauthorized');
    }
})

webRouter.get('/auth', checkAuthentication, (req, res) => {
    if(req.session.user) {
    res.json({ x_user_id: req.session.user });
    } else {
        res.status(401).send('Unauthorized');
    }
})

webRouter.get('/hidden', (req, res) => {
    console.log("user: ", req.session.user);
    // get cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    console.log("cookies: ", cookies);
    res.send('hidden data');
})

webRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.send('Logged out');
        }
    });
})

/* This is for the SSL certificate */
/*
webRouter.get('/.well-known/pki-validation/755FB6715C8CFD7383016D5CC536E782.txt', (req, res) => {
    res.sendFile('755FB6715C8CFD7383016D5CC536E782.txt', { root: './sertificates' });
})*/

export default webRouter;