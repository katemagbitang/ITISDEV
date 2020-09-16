const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const paymentSchema = new Schema({
    payment_ID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    username: {
        type: String,
        ref: 'User',
        required: [true,'Required']
    },
    order_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
        required: [true,'Required']
    },
    // status: {
    //     type: Boolean,
    //     enum: ['Pending', 'Accepted', 'Rejected'],
    //     required: [true,'Required']
    // },
    bank_name: {
        type: String,
        required: [true,'Required']
    },
    ref_num: {
        type: Number,
        required: [true,'Required']
    },
    proof_image: {
        type: String,

    }
});

module.exports = mongoose.model('paymentdetails',paymentSchema);