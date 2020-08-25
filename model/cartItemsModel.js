const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Required']
    },
    cartItems_ID: {
        type: Number,
        required: [true, 'Required']
    },
    books: {
        type: Schema.Types.ObjectId,
        ref: 'BookVersions',
        required: [true, 'Required']
    },
    quantity: {
        type: Number,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('CartItems',cartItemSchema);