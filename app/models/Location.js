const mongoose = require('mongoose');

const {
    wrap: async
} = require('co');
const Schema = mongoose.Schema;

/**
 * User Schema
 */

const LocationSchema = new Schema({
    nearest: {
        type: String,
        trim: true,
    },
    psh: {
        type: Number
    },
    flat_roof_loss: {
        type: Number
    },
    south_direction_loss: {
        type: Number
    }
});

/**
 * Validations
 */

// BillSchema.path('roof').required(true, 'Roof cannot be blank');
// BillSchema.path('shading').required(true, 'Shading cannot be blank');
// BillSchema.path('purpose').required(true, 'Purpose cannot be blank');
LocationSchema.path('nearest').required(true, 'Nearest Location cannot be blank');

/**
 * Pre-remove hook
 */

LocationSchema.pre('remove', function(next) {
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

LocationSchema.methods = {

    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @api private
     */

    create: function(data) {
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

    list: function(options) {
        // const criteria = {};
        // const page = 0;
        // const limit = 30;
        return Location.find({}, (err, data) => {
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

    removeAll: function() {
        Location.remove({}, () => {
            console.log('removed')
        })
    }
};
var Location = mongoose.model("Location", LocationSchema);
export default Location;
