'use strict'

/* import dependencies */
import fetch from 'node-fetch';

/* Initialize polarModel */
const polarModel = {

    getAccessToken: async (authToken) => {

        const clientID = process.env.NODE_ENV === 'PRODUCTION' ? process.env.PROD_CLIENT_ID : process.env.DEV_CLIENT_ID ;
        const clientSecret = process.env.NODE_ENV === 'PRODUCTION' ? process.env.PROD_CLIENT_SECRET : process.env.DEV_CLIENT_SECRET;

        const inputBody = {
            'grant_type': 'authorization_code',
            'code': authToken,
        }

        let credentials = `${clientID}:${clientSecret}`;
        let buff = new Buffer(credentials);
        let encodedAuth = buff.toString('base64');

        console.log('getAccesToken: ', {credentials});

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;',
            'Authorization': `Basic ${encodedAuth}`
        };

        const rsp = await fetch('https://polarremote.com/v2/oauth2/token', {
            method: 'POST',
            headers: headers,
            body: new URLSearchParams(inputBody)
        });

        console.log('getAccessToken status: ', rsp.status);
        const accessObject = await rsp.json();
        return accessObject;
    },

    userInfo: async (accessObject) => {
        
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;',
            'Authorization': `Bearer ${accessObject.access_token}`
        }

        const rsp = await fetch(`https://www.polaraccesslink.com/v3/users/${accessObject.x_user_id}`, {
            method: 'GET',
            headers: headers
        });
        console.log('userInfo status: ', rsp.status);
        const data = await rsp.json();
        return data;
    },

    nightlyRecharge: async (accessObject) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;',
            'Authorization': `Bearer ${accessObject.access_token}`
        }

        const rsp = await fetch(`https://www.polaraccesslink.com/v3/users/nightly-recharge`, {
            method: 'GET',
            headers: headers
        });
        console.log('nightlyRecharge status: ', rsp.status);
        const data = await rsp.json();
        return data;
    }
}

export default polarModel;