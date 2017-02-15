import express from 'express';

// Services
import * as billService from '../services/billService';

import locationModel from '../models/Location';

// Libraries
import camelize from 'camelize';

let router = express.Router();

const mongoose = require('mongoose');

const Location = mongoose.model('Location');

router.route('/')
    .get((req, res, next) => {
        try {
            const location = new Location();
            location.list().then((data) => {
                res.json({
                    locations: data
                })
            })
        } catch (e) {
            res.status(409).send({
                type: 'failure',
                text: e.message && e.message.replace('Validation', '') || 'Error: Cannot save your information',
                statusCode: 409
            });
        }
    })

export default router;
