const Cin = require('./cinModel')



const createCinService = (data) => {
    return Cin.create(data)
}

const getCINByIdOrUserService = (data) => {
    return Cin.findOne(data)
}

const getCINsService = (data) => {
    return Cin.find(data)
}

const updateCINService = (id, data, user) => {
    return Cin.findByIdAndUpdate(
        {_id: id, user: user},
        data,
        {new : true, runValidators : true}
    )
}


module.exports = {
    createCinService,
    getCINByIdOrUserService,
    getCINsService,
    updateCINService
}