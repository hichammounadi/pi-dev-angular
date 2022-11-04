const cinRouter = require('express').Router()
const authenticateUser = require('../middlewares/authentication')
const {
    createCINController,
    getCINByIdOrUserController,
    updateCINController,
    getCINsController

} = require('./cinControllers')


cinRouter.route('/').get(authenticateUser, getCINsController).post(authenticateUser, createCINController)
cinRouter.route('/:id').get(authenticateUser, getCINByIdOrUserController).patch(authenticateUser, updateCINController)



module.exports = cinRouter