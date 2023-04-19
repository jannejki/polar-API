const polarController = {
    nightlyRecharge: async (req, res) => {
        res.send('nightlyRecharge');

        /* gets the access token from the database and uses it to call the polar API
                try {
                    const user = req.session.user;
                    const accessObject = await tokenModel.getToken(user);
                    const nightlyRecharge = await polarModel.nightlyRecharge(accessObject);
        
                    res.send(nightlyRecharge);
                } catch (error) {
                    console.log("data: ", error);
                    res.status(500).send('Internal Server Error');
                }
        */
    },
}

export default polarController