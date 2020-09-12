const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_ID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    username: {
        type: String,
        ref: "User",
        required: [true, 'Required']
    },
    status: {
        type : String,
        enum: ['Payment Pending','Processing', 'Confirmed', 'Cancelled'],
        required: [true, 'Required']
        
    }
});

module.exports = mongoose.model('Orders', orderSchema);