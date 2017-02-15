import express from 'express';

// Controllers
import MonthlyBillController from './MonthlyBillController';
import LocationController from './LocationController';
import UsersController from './UsersController';

let router = express.Router();

router.use('/api/v1/bill', MonthlyBillController);
router.use('/api/v1/location', LocationController);
router.use('/api/v1/user', UsersController);

export default router;
