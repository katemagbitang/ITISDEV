const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const paymentSchema = new Schema({
    payment_ID: {
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'Required']
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
        required: [true,'Required']
    },
    confirmation: {
        type: Boolean,
        required: [true,'Required']
    },
    bank_name: {
        type: String,
        required: [true,'Required']
    },
    ref_num: {
        type: Number,
        required: [true,'Required']
    }
    // proof_img: {

    // }
});

module.exports = mongoose.model('PaymentDetails',paymentSchema);