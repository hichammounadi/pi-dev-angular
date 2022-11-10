const mongoose = require('mongoose')



const BulletinTroisSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this document: bulletin 3']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'Please provide your username']
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    father: {
        type: String,
        required: true
    },
    mother:{
        type:String,
        required: true
    },
    identity: {
        type:String,
        required: true
    },
    occupation: {
        type:String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: process.env.BULLETIN_STATUS.split(','),
        default: process.env.BULLETIN_STATUS.split(',')[1]
    }

}, {timestamps: true})



module.exports = mongoose.model('BulletinTrois', BulletinTroisSchema)