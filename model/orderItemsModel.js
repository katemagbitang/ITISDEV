const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    order_ID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    CartItems_ID: {
        type : Schema.Types.ObjectId,
        required: [true, 'Required']
    }
});

module.exports = mongoose.model('orderitems', orderItemSchema);