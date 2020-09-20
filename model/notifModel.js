const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const notifSchema = new Schema({
    notif_ID: {
        type: Schema.Types.ObjectId,
        required: [true,'Required']
    },
    request_ID:{
        type: Schema.Types.ObjectId,
        required: [true,'Required']
    },
    date:{
        type: Date,
        required: [true,'Required']
    },
    response:{
        type: String,//number?
        enum: ['No','Yes','No Answer'],
        
        required: [true,'Required'],
        default: 'No Answer'
    },
    type: {
        type: String,
        enum: ['Fulfillment', 'Update'],
        required: [true,'Required']
    }
});

module.exports = mongoose.model('notifications', notifSchema);