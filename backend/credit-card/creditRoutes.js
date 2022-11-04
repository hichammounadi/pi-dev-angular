const creditCardRouter = require('express').Router()
const {
    createCreditCardController,
    getCreditCardByIdController,
    updateCreditCardController,
    deleteCreditCardController

} = require('./creditControllers')
const authenticateUser = require('../middlewares/authentication')

creditCardRouter.route('/').post(authenticateUser, createCreditCardController)
creditCardRouter.route('/:id').get(authenticateUser,getCreditCardByIdController).patch(authenticateUser,updateCreditCardController).delete(authenticateUser, deleteCreditCardController)


module.exports = creditCardRouter