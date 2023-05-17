import polarModel from "../Models/polarModel.js";
import tokenModel from "../Models/tokenModel.js";
import JWT from "../Utils/jwtCreator.js";

const authController = {

    oauthCallback: async (req, res) => {
  
        try {
            const token = await JWT.create({x_user_id:"testi"});
            const authCode = req.query.code;
            const accessObject = await polarModel.getAccessToken(authCode);
            const APP_HOME = process.env.NODE_ENV === 'PRODUCTION' ? process.env.PROD_APP_HOME : process.env.DEV_APP_HOME;

            if (accessObject) {
                accessObject.expire_date = tokenModel.generateExpireDate(accessObject);
                await tokenModel.saveToken(accessObject);
                // create a jwt token and send it to the client

                req.session.user = accessObject.x_user_id;
                res.redirect(APP_HOME);
            } else {
                res.redirect(401, APP_HOME + '/login');
            }
        } catch (error) {
            console.log("oauthCallback: ", error);
            res.status(500).send('Internal Server Error');
        }
    },

    auth: (req, res) => {
        if (req.session.user) {
            res.status(200).send('/auth');
        } else {
            res.status(401).send('/login');
        }
    },

    login: (req, res) => {
        res.status(500).send('/login not currently working');
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    checkToken: async (req, res) => {
        const token = req.cookies.token;
        // decode token
        const decoded = JWT.decode(token);
        // print decoded.exp in a format of yyyy-mm-dd hh:mm:ss
        const expDate = new Date(decoded.exp * 1000).toLocaleString();
        // check if token is expired
        const isExpired = await JWT.verify(token);
        res.json({ decoded, expDate, isExpired })
    }
}

export default authController;