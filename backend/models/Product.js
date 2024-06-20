const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantily: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    name: {
        type: mongoose.Schemma.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Product', Schema)