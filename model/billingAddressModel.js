const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const billingAddressSchema = new Schema({
    billingAddress_ID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    fullname: {
        type: String,
        required: [true,'Required']
    },
    contactNum: {
        type: Number,
        required: [true, 'Required']
    },
    address: {
        type: String,
        required: [true, 'Required']
    },
    city: {
        type: String,
        required: [true , 'Required']
    },
    barangay: {
        type: String,
        required: [true , 'Required']
    },
    zip: {
        type: String,
        required: [true, 'Required']
    }
});

module.exports = mongoose.model('billingaddresses',billingAddressSchema);