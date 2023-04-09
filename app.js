'use strict'

/* Import dependencies*/
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';

import webRouter from './Routes/webRoutes.js';

/* Initialize required variables */
dotenv.config();
const app = express();

/* Start Express */
(async () => {

    try {
        /* Configure Express */
        app.set('port', process.env.PORT || 5000);
        app.use(
            cors({
                origin: "http://localhost:3000", // <-- location of the react app were connecting to
                credentials: true,
            })
        );

        app.use(session({
            secret: 'kaalilaatikko',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }))


        /* Routes */
        app.use('/', webRouter);

    } catch (error) {
        /* Error handling */
        app.use((req, res) => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });

    } finally {
        /* Start express */
        app.listen(app.get('port'), () => {
            console.log(`Express server listening on port ${app.get('port')}`);
        });

    }
})();