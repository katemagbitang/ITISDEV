const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const notifSchema = new Schema({
    request_ID:{
        type: Number,
        required: [true,'Required']
    },
    date:{
        type: Date,
        required: [true,'Required']
    },
    response:{
        type: String,//number?
        enum: ['No','Yes','No Answer'],
        default: 'No Answer',
        required: [true,'Required']
    }
});

module.exports = mongoose.model('Notifications', notifSchema);