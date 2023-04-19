'use strict'
/* import dependencies */
import express from 'express';
import webController from '../Controllers/webController.js';
import { checkAuthentication } from '../Utils/UserAuth.js';
import authController from '../Controllers/authController.js';
import polarController from '../Controllers/polarController.js';

/* Initialize required variables */
const webRouter = express.Router();

/* API Routes */
webRouter.get('/', webController.index);
webRouter.get('/oauth2_callback', webController.oauthCallback);
webRouter.get('/nightlyRecharge', polarController.nightlyRecharge);

/* Authentication routes */
webRouter.post('/login', authController.login)
webRouter.get('/auth', authController.auth);
webRouter.get('/logout', authController.logout);

/* This is for the SSL certificate */
/*
webRouter.get('/.well-known/pki-validation/755FB6715C8CFD7383016D5CC536E782.txt', (req, res) => {
    res.sendFile('755FB6715C8CFD7383016D5CC536E782.txt', { root: './sertificates' });
})*/

export default webRouter;