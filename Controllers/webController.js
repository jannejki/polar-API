'use strict'

/* import dependencies */
import polarModel from '../Models/polarModel.js';
import tokenModel from '../Models/tokenModel.js';


/* Web Controller */
const webController = {
    index: (req, res) => {
        console.log('index');
        res.redirect(process.env.APP_HOME);
    },

    login: (req, res) => {
        const clientID = process.env.NODE_ENV === 'PRODUCTION' ? process.env.PROD_CLIENT_ID : process.env.DEV_CLIENT_ID;
        res.redirect(`https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientID}`);
    },

    oauthCallback: async (req, res) => {
        try {
            const authCode = req.query.code;
            const accessObject = await polarModel.getAccessToken(authCode);
            const APP_HOME = process.env.NODE_ENV === 'DEVELOPMENT' ? process.env.PROD_APP_HOME : process.env.DEV_APP_HOME;

            if (accessObject) {
                accessObject.expire_date = tokenModel.generateExpireDate(accessObject);
                await tokenModel.saveToken(accessObject);

                req.session.regenerate(function (err) {
                    if (err) next(err)

                    req.session.user = accessObject.x_user_id;

                    req.session.save(function (err) {
                        if (err) next(err)
                        console.log('session saved');
                        console.log('redirecting to ' + APP_HOME);
                        res.redirect(APP_HOME);
                    })
                })
            } else {
                res.redirect(401, APP_HOME);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },

    data: async (req, res) => {
        try {

            // get cookies from req
            const user = req.session.user;
            const accessObject = await tokenModel.getToken(user);
            const nightlyRecharge = await polarModel.nightlyRecharge(accessObject);
            res.send(nightlyRecharge);
        } catch (error) {
            console.trace();
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

export default webController;