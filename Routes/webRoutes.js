'use strict'
/* import dependencies */
import express from 'express';
import webController from '../Controllers/webController.js';
import { checkAuthentication } from '../Utils/UserAuth.js';

/* Initialize required variables */
const webRouter = express.Router();

/* Routes */
webRouter.get('/', webController.index);
webRouter.get('/login', webController.login);
webRouter.get('/oauth2_callback', webController.oauthCallback);
webRouter.get('/data', checkAuthentication ,webController.data);
webRouter.get('/.well-known/pki-validation/755FB6715C8CFD7383016D5CC536E782.txt', (req, res) => {
    res.sendFile('755FB6715C8CFD7383016D5CC536E782.txt', { root: './sertificates' });
})

export default webRouter;