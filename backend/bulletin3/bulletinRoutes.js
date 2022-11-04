const bulletinRouter = require('express').Router()
const authenticateUser = require('../middlewares/authentication')
const {
    createBulletinController,
    getBulletinByUserOrIdController,
    getBulletinsController,
    updateBulletinController    

} = require('./bulletinControllers')


bulletinRouter.route('/').get(authenticateUser, getBulletinsController).post(authenticateUser, createBulletinController)
bulletinRouter.route('/:id').get(authenticateUser, getBulletinByUserOrIdController).patch(authenticateUser, updateBulletinController)



module.exports = bulletinRouter