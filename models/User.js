const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item').schema;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now    
    },

    cart: [String]
});

module.exports = User = mongoose.model('user', UserSchema);