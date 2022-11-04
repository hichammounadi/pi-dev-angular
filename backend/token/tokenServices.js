const Token = require('./tokenModel')



const createTokenService = (data) => {
    return Token.create(data)
}

const deleteTokenService = (id) => {
    return Token.findOneAndDelete({_id: id})
    
}

const getTokenByIdUserService = (id) => {
    return Token.findOne({user: id})
}


module.exports = {
    createTokenService,
    deleteTokenService,
    getTokenByIdUserService
}