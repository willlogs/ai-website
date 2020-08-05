const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        items: [{id: {type: String, ref: 'Item', require: true}, count: {type: Number, require: true}}]
    },
    address: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);