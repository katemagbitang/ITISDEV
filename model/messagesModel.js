const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    // i used the default _id instead
    // message_ID: {
    //     type: Number,
    //     unique: true,
    //     required: [true,'Required']
    // },
    // sender: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: [true, 'Required']
    // },
    sender: {
        type: String,
        ref: "User",
        required: [true, 'Required']
    },
    receiver:{
        type: String,
        ref: "User",
        required: [true, 'Required']

    },
    message: {
        type : String,
        required: [true, 'Required']
    },
    date: {
        type: Date
    },
    read: {
        type : String,
        enum: ['Unread', 'Read'],
        default: 'Unread'
    }
});

module.exports = mongoose.model('messages', messageSchema);