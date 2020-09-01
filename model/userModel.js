const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type : String,
        unique: true,
        required: [true, 'Required']
    },
    email: {
        type : String,
        required: [true, 'Required']
    },
    password: {
        type : String,
        required: [true, 'Required']
    },
    firstName: {
        type : String,
        required: [true, 'Required']
    },
    lastName: {
        type : String,
        required: [true, 'Required']
    },
    userType: {
        type : String,
        enum: ['Regular', 'Admin'],
        default: 'Regular'
    }
    ,
    lastLogin: {
        type: Date,
        default: null
    }
    // ,
    // messages: [{
    //     message_ID: {
    //         type: Number,
    //         required:[true,'Required']
    //     }
    // }]
});

module.exports = mongoose.model('User', userSchema);