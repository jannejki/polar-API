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
        res.redirect(`https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${process.env.CLIENT_ID}`);
    },

    oauthCallback: async (req, res) => {
        try {
            const authCode = req.query.code;
            const accessObject = await polarModel.getAccessToken(authCode);
            const APP_HOME = process.env.NODE_ENV === 'PRODUCTION' ? process.env.PROD_APP_HOME : process.env.DEV_APP_HOME;

            if (accessObject) {
                accessObject.expire_date = tokenModel.generateExpireDate(accessObject);
                await tokenModel.saveToken(accessObject);

                req.session.regenerate(function (err) {
                    if (err) next(err)

                    req.session.user = accessObject.x_user_id;

                    req.session.save(function (err) {
                        if (err) next(err)
                        res.json({ x_user_id:accessObject.x_user_id });
                    })
                })
            } else {
                res.redirect(401, APP_HOME +'/login');
            }
        } catch (error) {
            console.log("oauthCallback: ", error);
            res.status(500).send('Internal Server Error');
        }
    },

    data: async (req, res) => {
        try {
            const user = req.session.user;
            const accessObject = await tokenModel.getToken(user);
            const nightlyRecharge = await polarModel.nightlyRecharge(accessObject);
            
            res.send(nightlyRecharge);
        } catch (error) {
            console.log("data: ", error);
            res.status(500).send('Internal Server Error');
        }
    }
};

export default webController;