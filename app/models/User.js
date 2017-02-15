const mongoose = require('mongoose');

const {
    wrap: async
} = require('co');
const Schema = mongoose.Schema;

//creating populations
import Location from './Location';

/**
 * User Schema
 */

const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true
    },
    middle_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    storey: {
        type: String,
        enum: ['Single', 'Double', 'Warehouse'],
        trim: true
    },
    purpose: {
        type: String,
        enum: ['Residential', 'Business'],
        trim: true
    },
    battery: {
      type: String,
      enum: ['Yes, now', 'No', 'Yes, later'],
      trim: true
    },
    visit: {
      type: String,
      enum: ['Yes', 'No', 'Later'],
      trim: true
    },
    interested: [{
        finance: {
            type: Boolean
        },
        micro_inverter: {
            type: Boolean
        }
    }],
    size: {
      type: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users'
});

/**
 * Validations
 */

UserSchema.path('email').validate((email)=> {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The e-mail field should be valid.');

UserSchema.path('first_name').required(true, 'First Name cannot be blank');
UserSchema.path('email').required(true, 'Email cannot be blank');

/**
 * Methods
 */

UserSchema.methods = {
    create: function(data) {
        const err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();
    },

    /**
     * List users
     *
     * @param {Object} options
     * @api private
     */

    list: function(options) {
        return User.find({}, (err, data) => {
            console.log(err, data);
            if (!err)
                return data
        })

    },

    removeAll: function() {
        User.remove({}, () => {
            console.log('removed')
        })
    }
};
var User = mongoose.model("User", UserSchema);
