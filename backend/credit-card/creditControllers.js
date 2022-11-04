const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')
const {
    createCreditCardService,
    getCreditCardByIdService,
    updateCreditCardService,
    deleteCreditCardService

} = require('./creditServices')



const createCreditCardController = async(req, res) => {
    const user = req.user.userId;
    const {
        bank,
        balance
    } = req.body
    if(!user){
        throw new CustomError.UnauthenticatedError('You are not authorized')
    } 
    if(!bank || !balance || balance < 0){
        throw new CustomError.BadRequestError('Data of a credit card are mendatory')
    }
    await createCreditCardService({bank, balance, user})
    res.status(StatusCodes.CREATED).json('Credit card added successfully !')
}

const getCreditCardByIdController = async(req, res) => {
    const id = req.params.id
    const user = req.user.userId
    const userRole = req.user.userRole
    if(userRole === 'ADMIN'){
        throw new CustomError.UnauthenticatedError('You are not authorized !')
    }
    const objectQuery = {}
    // if(id && id !== '' ){
    //     objectQuery._id = id
    // }
    if(!user) {
        throw new CustomError.UnauthenticatedError('You are not authorized')
    }
    objectQuery.user = user
    console.log(objectQuery)
    const creditCard = await getCreditCardByIdService(objectQuery)
    if(!creditCard){

        res.status(StatusCodes.OK).send('You don\' have a credit card yet')
        return;
        throw new CustomError.NotFoundError('It seems that you do not have a credit card')
    }
    res.status(StatusCodes.OK).json(creditCard)
}

const updateCreditCardController = async(req, res) => {
    const {
        body: {bank, balance},
        user: {userId},
        params: {id}
    } = req
    const userRole = req.user.userRole
    if(userRole === 'ADMIN'){
        throw new CustomError.UnauthenticatedError('You are not authorized')
    }
    if(!bank || !balance || balance < 0) {
        throw new CustomError.BadRequestError('Data should not be empty or balance negative')
    }
    const creditCard = await updateCreditCardService(id, {bank, balance}, userId) 
    if(!creditCard){
        throw new CustomError.NotFoundError('It seems that this credit card does not exist, please check again')
    }
    res.status(StatusCodes.OK).json('Credit card updated successfully !')
}


creditDepositController = async(req, res) => {
    const id = req.params.id;
    const balance = req.body.balance;
    if(!credit){
        throw new CustomError.BadRequestError('You need to add the amount of money you want to deposit')
    }
    const credit = await getCreditCardByIdService({_id: id})
    if(!credit) {
        throw new CustomError.NotFoundError('There is no credit with this id')
    }


}


const deleteCreditCardController = async(req, res) => {
    const id = req.params.id;
    const user = req.user.userId;
    const creditCard = await deleteCreditCardService(id, user)
    if(!creditCard){
        throw new CustomError.NotFoundError('It seems that this credit card does not exist')
    }
    res.status(StatusCodes.OK).json('Credit Card deleted successfully !')

}


module.exports = {
    createCreditCardController,
    getCreditCardByIdController,
    updateCreditCardController,
    deleteCreditCardController
}