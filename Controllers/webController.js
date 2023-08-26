'use strict'
/*===============================*/
/*     Import dependencies       */
/*===============================*/
import polarModel from '../Models/polarModel.js';
import tokenModel from '../Models/tokenModel.js';

const webController = {
    index: (req, res) => {
        res.send('index');
    },
};

export default webController;