'use strict'
/* import dependencies */
import express from 'express';
import webController from '../Controllers/webController.js';
import authController from '../Controllers/authController.js';
import { checkAuthentication } from '../Utils/UserAuth.js';
import userController from '../Controllers/userController.js';

/* Initialize required variables */
const webRouter = express.Router();

webRouter.get('/', webController.index);

/* Authentication routes */
webRouter.get('/web/oauth2_callback', authController.oauthCallback);
webRouter.post('/web/login', authController.login)
webRouter.get('/web/auth', authController.auth);
webRouter.get('/web/logout', authController.logout);


webRouter.get('/web/user/', checkAuthentication, userController.getUser);
webRouter.get('/web/user/settings', checkAuthentication, userController.getSettings);
webRouter.post('/web/user/settings', checkAuthentication, userController.saveSettings);

/* This is for the SSL certificate */
/*
webRouter.get('/.well-known/pki-validation/755FB6715C8CFD7383016D5CC536E782.txt', (req, res) => {
    res.sendFile('755FB6715C8CFD7383016D5CC536E782.txt', { root: './sertificates' });
})*/

export default webRouter;