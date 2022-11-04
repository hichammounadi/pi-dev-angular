const mongoose = require('mongoose');

const CINSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Provide your first name']
  },
  lastName: {
    type: String,
    required: [true, 'provide your last name']
  },
  father: {
    type: String,
    required: [true, 'provide the name of your father']
  },
  mother: {
    type: String,
    required: [true, 'provide the name of your mother']
  },
  gender: {
    type: String,
    required: [true, 'provide your gender'],
    enum: process.env.CIN_GENDER.split(',')
  },
  occupation: {
    type: String,
    enum: process.env.CIN_OCCUPATION.split(','),
    default: process.env.CIN_OCCUPATION.split(',')[0],
  },
  address: {
    type: String,
    required: [true, 'provide your address'],
  },
  birth: {
    type: String,
    required: [true, 'Provide your birth date']
  },
  identity: {
    type:String,
    default: ''
  },
  status:{
    type: String,
    required: true,
    enum: process.env.CIN_STATUS.split(','),
    default: process.env.CIN_STATUS.split(',')[0]
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref:'User',
    required: true
  }
});


module.exports = mongoose.model('Cin', CINSchema)