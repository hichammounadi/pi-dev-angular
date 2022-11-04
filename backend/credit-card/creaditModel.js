const mongoose = require('mongoose')



const CreditCardSchema = new mongoose.Schema({
    bank: {
        type:String,
        required: [true, 'Provide the name of the bank']
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Credit', CreditCardSchema)