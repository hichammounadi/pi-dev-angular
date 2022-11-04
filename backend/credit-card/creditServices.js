const Credit = require('./creaditModel')



const createCreditCardService = (data) => {
    return Credit.create(data)
}

const getCreditCardByIdService = (data ) => {
    return Credit.findOne(data)
}

const getCreditCardByUserService = (user) => {
    return Credit.findOne({user})
}

const updateCreditCardService = (id, data, user) => {
    return Credit.findByIdAndUpdate(
        {_id: id, user: user},
        data,
        {new :true, runValidators: true}
    )
}


const deleteCreditCardService = (id, user) => {
    return Credit.findOneAndDelete({_id: id, user: user})
}

module.exports = {
    createCreditCardService,
    getCreditCardByIdService,
    updateCreditCardService,
    deleteCreditCardService,
    getCreditCardByUserService
}