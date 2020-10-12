const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({

    username: {type : String, required : true, unique : true},
    email: {type : String, required : true, unique : true},
    hash: {type : String, required : true},
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});


module.exports = mongoose.model('User', User);