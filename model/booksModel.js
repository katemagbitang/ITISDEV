const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_ID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    title: {
        type: String,
        required: [true,'Required']
    },
    author: {
        type: [Schema.Types.ObjectId],
        ref: "authors",
        required: [true, 'Required']
    },
    publisher: {
        type: String,
        required: [true,'Required']
    },
    year: {
        type: Number,
        required: [true,'Required']
    },
    category: {
        type: String,
        required: [true,'Required']
    },
    bookSynopsis: {
        type: String,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('books',bookSchema);