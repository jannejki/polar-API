'use strict'

/*===============================*/
/*     Import dependencies       */
/*===============================*/
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import http from 'http';
import webRouter from './Routes/webRoutes.js';
import whitelist from './Utils/whiteList.js';


(async () => {
    /*===============================*/
    /*     Configure environment     */
    /*===============================*/
    dotenv.config();
    const app = express();

    const sslkey = fs.readFileSync(process.env.KEY_PATH, 'utf8');
    const sslcert = fs.readFileSync(process.env.SERT_PATH, 'utf8');

    const options = {
        key: sslkey,
        cert: sslcert
    };

    let HTTP_PORT;
    let HTTPS_PORT;
    let DOMAIN_NAME;

    if (process.env.NODE_ENV === 'PRODUCTION') {
        HTTP_PORT = process.env.PROD_HTTP;
        HTTPS_PORT = process.env.PROD_HTTPS;
        DOMAIN_NAME = process.env.PROD_DOMAIN;
    } else {
        HTTP_PORT = process.env.DEV_HTTP || 3000;
        HTTPS_PORT = process.env.DEV_HTTPS || 3001;
        DOMAIN_NAME = process.env.DEV_DOMAIN || 'localhost';
    }

    try {
        /*===============================*/
        /*     Configure express         */
        /*===============================*/
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        /* Routes */
        app.use('/api', webRouter);

        /* Handle 404 requests */
        app.use('*', (req, res) => {
            res.status(404).send('Not Found');
        })


    } catch (error) {
        app.use((req, res) => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });

    } finally {

        /*===============================*/
        /*        Start server           */
        /*===============================*/
        switch (process.env.NODE_ENV) {
            case 'PRODUCTION':
                https.createServer(options, app).listen(HTTPS_PORT, () => console.log('HTTPS server running on port ' + HTTPS_PORT));

                http.createServer((req, res) => {
                    console.log('http request');
                    const redirectUrl = `https://${DOMAIN_NAME}:${HTTPS_PORT}${req.url}`;

                    res.writeHead(301, { 'Location': redirectUrl });
                    res.end();
                }).listen(HTTP_PORT, () => {
                    console.log(`HTTP port ${HTTP_PORT} redirecting traffic to ${DOMAIN_NAME}:${HTTPS_PORT}`);
                });
                break;

            default:
                /* Development */
                https.createServer(options, app).listen(HTTPS_PORT, () => console.log('HTTPS server running on port ' + HTTPS_PORT));
                http.createServer(app).listen(HTTP_PORT, () => console.log('HTTP server running on port ' + HTTP_PORT));
                break;
        }
    }
})();