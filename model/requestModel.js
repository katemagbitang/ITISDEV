const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const requestSchema = new Schema({
    request_ID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    username: {
        type: String,
        ref: 'User',
        required: [true,'Required']
    },
    bookversion_ID:{
        type: Schema.Types.ObjectId
        // ,
        // required: [true,'Required']
    },
    book_title:{
        type: String,
        required: [true,'Required']
    },
    book_author:{
        type: String,
        required: [true,'Required']
    },
    isUrgent: {
        type: String,
        enum: ['Yes','No'], //boolean?
        required: [true,'Required'],
        default: 'No'
    },
    maxPrice: {
        type: Number,
        required: [true,'Required']
    },
    description:{
        type: String,
        required: [true,'Required']
    },
    date_requested:{
        type: Date,
        required: [true,'Required']
    },
    status:{
        type: String,
        required: [true,'Required']
    },
    priority_rating: {
        type: Number,
        required: [true,'Required']
    },
    quantity:{
        type: Number,
        required: [true,'Required'],
        default: 1
    },
    override:{
        type: Boolean,
        required: [true, 'Required'],
        default: false
    },
    // notifications:[{
    //     type: String //notic objid to-follow
    //     // ,
    //     // required: [true,'Required']
    // }],
    ignored_notif_count:{
        type: Number,
        required: [true,'Required'],
        default: 0
    }
});

module.exports = mongoose.model('Requests',requestSchema);