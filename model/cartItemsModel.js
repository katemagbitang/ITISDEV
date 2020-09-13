const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    username: {
        type: String,
        ref: "User",
        required: [true, 'Required']
    },
    CartItems_ID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Required']
    },
    items:[{
        bookVersion: {
            type: Schema.Types.ObjectId,
            ref: 'BookVersions',
            required: [true, 'Required']
        },
        quantity: {
            type: Number,
            required: [true,'Required']
        }
    }]
    ,
    isActive: {
        type: Boolean,
        required: [true, 'Required']
    }
});

module.exports = mongoose.model('cartitems',cartItemSchema);