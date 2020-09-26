const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const authorSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    aName: {
        type: String,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('Author',authorSchema);