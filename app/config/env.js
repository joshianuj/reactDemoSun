require('dotenv').config();

let constants = {
    'production': {
        mailerAPIKey: 'somMailerAPIKEY',
        dbName: 'production-someproject'
    },
    'dev': {
        mailerAPIKey: 'somMailerAPIKEY',
        dbName: 'dev-someproject'
    },
    'test': {
        mailerAPIKey: 'somMailerAPIKEY',
        dbName: 'test-someproject'
    }
};

module.exports = constants[process.env.ENVIRONMENT];
