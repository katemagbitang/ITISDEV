const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const authorSchema = new Schema({
    author_ID: {
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    a_fName: {
        type: String,
        required: [true,'Required']
    },
    a_mName: {
        type: String,
        required: [true,'Required']
    },
    a_lName: {
        type: String,
        required: [true,'Required']
    },
    suffix: {
        type: String,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('Author',authorSchema);