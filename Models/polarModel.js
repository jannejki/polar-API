'use strict'

/* import dependencies */
import fetch from 'node-fetch';

/* Initialize polarModel */
const polarModel = {

    getAccessToken: async (authToken) => {
        const inputBody = {
            'grant_type': 'authorization_code',
            'code': authToken,
        }

        let credentials = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
        let buff = new Buffer(credentials);
        let encodedAuth = buff.toString('base64');

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
        const data = await rsp.json();
        return data;
    },

    cardioLoad: async (accessObject) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;',
            'Authorization': `Bearer ${accessObject.access_token}`
        }

        // setting query params for from and to dates, where date format is yyyy-mm-dd
        // from date is current date, and to date is 28 days prior
        const from = new Date().toISOString().slice(0, 10);
        const to = new Date(new Date().setDate(new Date().getDate() - 28)).toISOString().slice(0, 10);
        
        const rsp = await fetch(`https://www.polaraccesslink.com/v3/users/cardio-load?from=${from}&to=${to}`, {
            method: 'GET',
            headers: headers
        });
        const data = await rsp.json();
        return data;
    },
}

export default polarModel;