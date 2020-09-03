const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const messagesHistorySchema = new Schema({
    // messageHistory_ID: {
    //     type: Number,
    //     unique: true,
    //     required: [true,'Required']
    // },
    user1: {
        type: String,
        ref: "User",
        required: [true, 'Required']
    },
    user2:{
        type: String,
        ref: "User",
        required: [true, 'Required']

    },
    messages: {
        type: [Schema.Types.ObjectId],
        ref: "messages",
        required: [true, 'Required']
        
    }
});

module.exports = mongoose.model('messageshistory', messagesHistorySchema);