import mailer from '../mailer/mailer'

// load model
import userModel from '../models/User';

const mongoose = require('mongoose');
const User = mongoose.model('User');

export function create(req) {
    return new Promise((resolve, reject) => {
        try{
            let user = new User(req.body);
            user.create(req.file);
            mailer(req.body);
            resolve({
                type: 'success',
                text: 'User information has been saved properly',
                user: user
            });
        } catch(e) {
            reject({
                type: 'failure',
                text: e.message && e.message.replace('Validation', '') || 'Error: Cannot save your information',
                statusCode: 409
            });
        }
    });
}