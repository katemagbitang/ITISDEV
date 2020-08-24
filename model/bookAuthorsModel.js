const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookAuthorSchema = new Schema({
    book_ID: {
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    author_ID: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: [true,'Required']
    }]
});

module.exports = mongoose.model('BookAuthors',bookAuthorSchema);