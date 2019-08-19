const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartItem = require('./CartItem').schema;

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

    cart: [CartItem]
});

module.exports = User = mongoose.model('user', UserSchema);