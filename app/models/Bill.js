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

const BillSchema = new Schema({
    roof: {
        type: String,
        enum: ['Flat Roof', 'Pitched Roof'],
        trim: true,
        default: 'Flat Roof'
    },
    shading: {
        type: String,
        enum: ['Light', 'Moderate', 'Heavy', 'Not Sure'],
        trim: true,
        default: 'Light'
    },
    purpose: {
        type: String,
        enum: ['Residential', 'Business'],
        trim: true,
        default: 'Residential'
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    orientation: {
        type: String,
        enum: ['North, NE, NW', 'East or West', 'South, SE, SW'],
        trim: true,
        default: 'North, NE, NW'
    },
    informations: {
        type: Array,
        default: []
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
    collection: 'bills'
});

/**
 * Validations
 */

// BillSchema.path('roof').required(true, 'Roof cannot be blank');
// BillSchema.path('shading').required(true, 'Shading cannot be blank');
// BillSchema.path('purpose').required(true, 'Purpose cannot be blank');
BillSchema.path('informations').validate((informations)=> {
    let i;
    for (i = 0; i < informations.length; i++) {
        if (informations[i].percentage == undefined || informations[i].total == undefined) {
            return false;
        }
    }
    return true; // Assuming email has a text attribute
}, 'You must fill the electricity bill information properly');
/**
 * Pre-remove hook
 */

BillSchema.pre('remove', function (next) {
    // const imager = new Imager(imagerConfig, 'S3');
    // const files = this.image.files;

    // if there are files associated with the item, remove from the cloud too
    // imager.remove(files, function (err) {
    //   if (err) return next(err);
    // }, 'article');

    next();
});

/**
 * Methods
 */

BillSchema.methods = {

    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @api private
     */

    create: function (data) {
        const err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @api private
     */

    list: function (options) {
        // const criteria = {};
        // const page = 0;
        // const limit = 30;
        return Bill.find({}, (err, data) => {
            console.log(err, data);
            if (!err)
                return data
        })

        // Bill.findOne().sort({
        //     created: -1
        // }).exec((err, data) => {
        //     if (!err)
        //         return data
        // })
    },

    removeAll: function () {
        Bill.remove({}, () => {
            console.log('removed')
        })
    }
};
var Bill = mongoose.model("Bill", BillSchema);
