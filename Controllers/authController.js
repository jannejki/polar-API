import polarModel from "../Models/polarModel.js";
import tokenModel from "../Models/tokenModel.js";
import userModel from "../Models/userModel.js";
import JWT from "../Utils/jwtCreator.js";

const authController = {

    oauthCallback: async (req, res) => {

        try {
            const authCode = req.query.code;
            const accessObject = await polarModel.getAccessToken(authCode);
    
            if (accessObject) {
                accessObject.expire_date = tokenModel.generateExpireDate(accessObject);
                await tokenModel.saveToken(accessObject);
                req.session.user = accessObject.x_user_id;
                
                // create a jwt token and send it to the client
                const token = await JWT.create({ x_user_id: accessObject.x_user_id });
                const userInfo = await userModel.saveJWT(token, accessObject.x_user_id);
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });

                res.redirect('/');
            } else {
                res.redirect(401, '/login');
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