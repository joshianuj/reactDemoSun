import express from 'express';

//daos
import * as userDao from '../daos/userDao';

let router = express.Router();

const mongoose = require('mongoose');

const User = mongoose.model('User');

router.route('/')
    .get((req, res, next) => {
        try {
            const user = new User();
            user.list().then((data) => {
                res.json({
                    bills: data
                })
            })
        } catch (e) {
            res.status(409).send({
                type: 'failure',
                text: e.message && e.message.replace('Validation', '') || 'Error: Cannot save your information',
                err: err
            });
        }
    })
    .post((req, res, next) => {
        userDao.create(req)
            .then((response)=>{
                res.status(200).send(response);
            })
            .catch((err)=>{
               next(err);
            })
    });

export default router;
