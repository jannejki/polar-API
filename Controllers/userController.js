'use strict';
import userModel from "../Models/userModel.js";

const userController = {
    getUser: async (req, res) => {
        try {
            const user = await userModel.getUser({ 'polar-user-id': req.session.user });
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getSettings: async (req, res) => {
        try {
            const user = await userModel.getUser({ 'polar-user-id': req.session.user });
            if (user.length == 0) res.status(404).send('User not found');

            const settings = await userModel.getSettings({ 'USER_ID': user[0].ID });
            res.status(200).json(settings);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },

    saveSettings: async (req, res) => {
        try {
            const user = await userModel.getUser({ 'polar-user-id': req.session.user });
            if (user.length == 0) res.status(404).send('User not found');
            const settings = await userModel.saveSettings(user[0]['polar-user-id'], req.body);
            res.status(200).json(settings);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default userController;