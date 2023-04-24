import polarModel from "../Models/polarModel.js";
import tokenModel from "../Models/tokenModel.js";
import JWT from "../Utils/jwtCreator.js";

const polarController = {
    index: async (req, res) => {
        res.json('index');
    },

    nightlyRecharge: async (req, res) => {
        const user = req.session.user;    
        try {
            const accessObject = await tokenModel.getToken(user);
            const nightlyRecharge = await polarModel.nightlyRecharge(accessObject);
 
            res.send(nightlyRecharge);
        } catch (error) {
            console.log('nightlyRecharge error');
            res.status(500).send('Internal Server Error');
        }
 
},
}

export default polarController