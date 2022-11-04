const userRouter = require('express').Router()
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getUserByIdController

} = require('./userControllers')
const authenticateUser = require('../middlewares/authentication')

userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.post('/logout', authenticateUser,logoutUserController)
userRouter.get('/profile/:id', authenticateUser, getUserByIdController)

module.exports = userRouter