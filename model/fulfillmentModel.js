const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const fulfillmentSchema = new Schema({
    fulfillment_ID:{
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    request_ID:{
        type: Schema.Types.ObjectId,
        ref: "Requests",
        required: [true,'Required']
    },
    bookVersion_ID:{
        type:Schema.Types.ObjectId,
        ref: 'BookVersions',
        required: [true,'Required']
    },
    status:{
        type: String,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('Fulfillment',fulfillmentSchema);