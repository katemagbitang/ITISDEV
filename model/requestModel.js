const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const requestSchema = new Schema({
    request_ID: {
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'Required']
    },
    bookversion_ID:{
        type: Number,
        required: [true,'Required']
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
        required: [true,'Required']
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
    notifications:[{
        type: String,
        required: [true,'Required']
    }],
    ignored_notif_count:{
        type: Number,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('Requests',requestSchema);