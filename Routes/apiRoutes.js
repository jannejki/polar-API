'use strict'
/* import dependencies */
import express from 'express';
import { checkAuthentication } from '../Utils/UserAuth.js';
import polarController from '../Controllers/polarController.js';

/* Initialize required variables */
const apiRouter = express.Router();

/* API Routes */
apiRouter.get('/', polarController.index);
apiRouter.get('/nightlyRecharge', checkAuthentication, polarController.nightlyRecharge);


export default apiRouter;