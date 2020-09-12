const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dummySchema = new Schema({
    image:{
        type: String,
        required: true,
        default: "../img/default.png"
    }
});

module.exports = mongoose.model('dummy', dummySchema);