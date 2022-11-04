const mongoose = require('mongoose')


const InvoiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide the amount']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the owner of this invoice']
    },
    address: {
        type: String,
        required: [true, 'Please provide the address of this invoice']
    },
    type: {
        type: String,
        enum: process.env.INVOICE_TYPE.split(','),
        required: [true, 'Please provide the type of this invoice']
    },
    status: {
        type: String,
        enum: process.env.INVOICE_STATUS.split(',')[0],
    },

}, {timestamps: true})


module.exports = mongoose.model('Invoice', InvoiceSchema)