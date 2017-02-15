import express from 'express';

// Services
import * as billService from '../services/billService';

//just import you model
import billModel from '../models/Bill';

//daos
import * as billDao from '../daos/billDao';

// Libraries
import camelize from 'camelize';

import Location from '../models/Location';

let router = express.Router();

const mongoose = require('mongoose');

const Bill = mongoose.model('Bill');

router.route('/')
    .get((req, res, next) => {
        try {
            const bill = new Bill();
            bill.list().then((data) => {
                res.json({
                    bills: data
                })
            })
        } catch (e) {
            res.status(409).send({
                type: 'failure',
                text: e.message && e.message.replace('Validation', '') || 'cannot save your information',
                statusCode: 409
            });
        }
    })
    .post((req, res, next) => {
        billDao.create(req).then((response)=>{
          res.status(200).send(response);
        }).catch((err) => {
            next(err);
          });
        // const bill = new Bill(req.body);
        // try {
        //     Location.findOne({
        //         nearest: req.body.location
        //     }, (err, location) => {
        //         if (err) {
        //             throw(err);
        //         }
        //         else if (location === null){
        //           res.status(202).send({
        //               type: 'Validation error',
        //               text: "The entered location doesn't exists",
        //               err: err
        //           });
        //         }else {
        //             bill.create(req.file);
        //             let roofType = (bill.roof!='Flat Roof')?  bill.roof +' ('+bill.orientation+')' : bill.roof;
        //             res.json({
        //                 type: 'success',
        //                 text: 'Successfully saved your information!',
        //                 size: billService.getSolarSize(req.body, location),
        //                 roof: {
        //                   type: roofType,
        //                   message: billService.getRoofMessage(bill.roof, bill.orientation,location)
        //                 },
        //                 shading: {
        //                   type: bill.shading,
        //                   message: billService.getShadingMessage(bill.shading)
        //                 }
        //             });
        //         }
        //     })
        // } catch (err) {
        //     res.status(202).send({
        //         type: 'failure',
        //         text: 'cannot save your information',
        //         err: err
        //     });
        //     // next(err)
        // }
    });

export default router;
