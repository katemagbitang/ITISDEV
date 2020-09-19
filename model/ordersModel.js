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
        enum: ['Pending','Processing', 'Confirmed', 'Cancelled'],
        required: [true, 'Required']
        
    },
    billingAddress_ID: {
        type: Schema.Types.ObjectId
    },
    order_date: {
        type: Date,
        required: [true, 'Required']
    },
    confirm_date: {
        type: Date,
        required: [false, 'Required']
    }
});

module.exports = mongoose.model('orders', orderSchema);