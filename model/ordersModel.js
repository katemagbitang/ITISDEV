const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_ID: {
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Required']
    },
    status: {
        type : String,
        required: [true, 'Required']
    }
});

module.exports = mongoose.model('Orders', orderSchema);