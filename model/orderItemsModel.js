const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    order_ID: {
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    cartItem_ID: {
        type : Number,
        required: [true, 'Required']
    }
});

module.exports = mongoose.model('OrdersItems', orderItemSchema);