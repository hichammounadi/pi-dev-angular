const User = require('./userModel')



const registerUserService = (data) => {
    return User.create(data)
}

const getUsersService = (data) => {
    return User.find(data)
}

const getUserByIdService = (id) => {
    return User.findById({_id: id})
}

const getUserByEmailService = (email) => {
    return User.findOne({email: email})
}

const deleteUserService = (id) => {
    return User.findByIdAndDelete({_id: id})
}


module.exports = {
    registerUserService,
    getUserByIdService,
    getUsersService,
    deleteUserService,
    getUserByEmailService
}