const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');
const CustomError = require('../shared-services/errors');
const { createTokenUser, attachCookiesToResponse } = require('../utils');
const {
  registerUserService,
  getUserByEmailService,
  getUserByIdService,
} = require('./userServices');
const Token = require('../token/tokenModel');
const { deleteTokenService, getTokenByIdUserService } = require('../token/tokenServices');

const registerUserController = async (req, res) => {
  console.log(req.body)
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    throw new CustomError.BadRequestError('You need to provide your data');
  }
  const emailAlreadyExists = await getUserByEmailService(email);
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const user = await registerUserService({ fullname, email, password });

  res.status(StatusCodes.CREATED).json('Account created successfully !');
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide your credentials');
  }
  const user = await getUserByEmailService( email );
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }
  const tokenUser = createTokenUser(user);
  let refreshToken = '';
  // check for existing token
  const existingToken = await getTokenByIdUserService(user._id); //Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({tokenUser, refreshToken});
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };
  await Token.create(userToken)
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({tokenUser, refreshToken});
};

const logoutUserController = async (req, res) => {
    const token = await deleteTokenService(req.user.userId)
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json('You logged out!')
}
const getUserByIdController = async(req, res) => {
  const userId = req.user.userId
  const user = await getUserByIdService(userId).select('-password')
  if(!user){
    throw new CustomError.NotFoundError('No user found !')
  }
  res.status(StatusCodes.OK).json(user)
}




module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getUserByIdController
};
