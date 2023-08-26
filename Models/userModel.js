import database from "../Services/database.js";


const userModel = {

    getUser: async (query) => {
        try {
            const user = await database('USERS').where(query);
            return user;
        } catch (error) {
            console.log(error);
        }
    },

    getSettings: async (query) => {
        try {
            const settings = await database('USER_SETTINGS').where(query);
            return settings[0];
        } catch (error) {
            console.log(error);
        }
    },

    create: async (user) => {
        try {
            const newUser = await database('USERS').insert({
                'polar-user-id': user.x_user_id,
                'access_token': user.access_token,
            });
            return newUser;
        } catch (error) {
            console.log(error);
        }
    },

    saveJWT: async (JWT, x_user_id) => {
        try {
            // check that user is in database
            const user = await database('USERS').where('polar-user-id', x_user_id);
            if (user.length == 0) {
                await userModel.create({ x_user_id, access_token: JWT });
            } else {
                await database('USERS').where('polar-user-id', x_user_id).update({
                    access_token: JWT,
                    expires_in: null
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    saveSettings: async (user, settings) => {
        try {
            const foundUser = await database('USERS').where('polar-user-id', user);
            if (foundUser.length == 0) throw new Error('User not found');
            const updatedSettings = await database('USER_SETTINGS').where('USER_ID', foundUser[0].ID).update(settings);
            return updatedSettings;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}

export default userModel;