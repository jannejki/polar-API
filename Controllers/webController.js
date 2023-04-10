'use strict'

/* import dependencies */
import polarModel from '../Models/polarModel.js';
import tokenModel from '../Models/tokenModel.js';
import { saveIPAddress } from '../Utils/log.js';


/* Web Controller */
const webController = {
    index: (req, res) => {
        console.log('index');
        console.log('Request coming from: ', req.ip);
        saveIPAddress(req.ip);
        res.redirect(process.env.APP_HOME);
    },

    login: (req, res) => {
        res.redirect('https://flow.polar.com/oauth2/authorization?response_type=code&client_id=642a3448-e7fc-4dff-9ef6-f0701ccdee91');
    },

    oauthCallback: async (req, res) => {
        try {
            const authCode = req.query.code;
            const accessObject = await polarModel.getAccessToken(authCode);

            if (accessObject) {
                accessObject.expire_date = tokenModel.generateExpireDate(accessObject);
                await tokenModel.saveToken(accessObject);

                req.session.regenerate(function (err) {
                    if (err) next(err)

                    req.session.user = accessObject.x_user_id;

                    req.session.save(function (err) {
                        if (err) next(err)
                        console.log('session saved');
                        console.log('redirecting to ' + process.env.APP_HOME);
                        res.redirect(process.env.APP_HOME);
                    })
                })
            } else {
                res.redirect(401, process.env.APP_HOME);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },

    data: async (req, res) => {

        // get cookies from req
        const user = req.session.user;

        // get access token from db
        const accessObject = await tokenModel.getToken(user);
        const userInfo = await polarModel.userInfo(accessObject);
        const nightlyRecharge = await polarModel.nightlyRecharge(accessObject);

        res.send(nightlyRecharge);
    }
};

export default webController;