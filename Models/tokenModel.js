import fs from 'fs';

const tokenModel = {
    saveToken: async (token, callback = null) => {
        const found = await tokenModel.getToken(token.x_user_id);

        if (found) {
            tokenModel.updateToken(token);

        } else {
            const tokenString = JSON.stringify(token) + ";";

            fs.appendFile('tokens.txt', tokenString, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("token saved");
                }
            });
        }

        if (callback != null) {
            callback(token);
        }
    },

    getToken: async (x_user_id) => {
        // read tokens from tokens.json
        const tokens = fs.readFileSync('tokens.txt', 'utf8');

        // split tokens using ; as delimiter
        const tokenArray = tokens.split(';');
        tokenArray.pop();

        const parsedTokens = tokenArray.map((tkn) => {
            return JSON.parse(tkn);
        });

        // find token with matching x_user_id
        return parsedTokens.find((token) => {
            return token.x_user_id == x_user_id;
        });
    },

    generateExpireDate: (token) => {
        const now = new Date();
        const tokenDate = new Date(now.getTime() + token.expires_in * 1000);
        return tokenDate;
    },

    tokenExpired: (token) => {
        const now = new Date();
        const tokenDate = new Date(token.expires_in);
        return now > tokenDate;
    },

    updateToken: (token) => {
        // read tokens from tokens.json
        const tokens = fs.readFileSync('tokens.txt', 'utf8');

        // split tokens using ; as delimiter
        const tokenArray = tokens.split(';');
        tokenArray.pop();

        const parsedTokens = tokenArray.map((tkn) => {
            return JSON.parse(tkn);
        });

        // find token with matching x_user_id
        const foundToken = parsedTokens.find((tkn) => {
            return tkn.x_user_id == token.x_user_id;
        });

        // update token
        foundToken.access_token = token.access_token;
        foundToken.expires_in = token.expires_in;
        foundToken.expire_date = token.expire_date;

        // convert tokens to string
        const updatedTokens = parsedTokens.map((tkn) => {
            return JSON.stringify(tkn);
        }).join(';') + ';';



        // write updated tokens to tokens.json
        fs.writeFileSync('tokens.txt', updatedTokens);
    }
}

export default tokenModel;