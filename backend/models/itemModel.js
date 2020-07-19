const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const itemSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    dueDay:{
        type: Number,
        required: true
    },
    reqUrl:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);