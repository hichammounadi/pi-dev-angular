/**
 *
 */
const {
  createCinService,
  getCINByIdOrUserService,
  getCINsService,
  updateCINService,
} = require('./cinServices');
const CustomError = require('../shared-services/errors');
const { StatusCodes } = require('http-status-codes');

const createCINController = async (req, res) => {
  const user = req.user.userId;
  const doesUserHaveCIN = await getCINByIdOrUserService({ user: user });
  if (doesUserHaveCIN) {
    throw new CustomError.BadRequestError('You already have a identity card');
  }
  const {
    firstName,
    lastName,
    father,
    mother,
    gender,
    occupation,
    address,
    birth,
  } = req.body;
  console.log(req.body)
  if (
    !firstName ||
    !lastName ||
    !father ||
    !mother ||
    !gender ||
    !occupation ||
    !address ||
    !birth
  ) {
    throw new CustomError.BadRequestError('All data are mendatory');
  }
  req.body.user = req.user.userId;
  const cin = await createCinService( req.body );
  res.status(StatusCodes.CREATED).json('Identity card created successfully');
};

const getCINByIdOrUserController = async (req, res) => {
  const userRole = req.user.userRole;
  const user = req.user.userId;
  const cinId = req.params.id;
  console.log(userRole , user, cinId)
  if(userRole === 'ADMIN'){
    const cin = await getCINByIdOrUserService({ _id: cinId });
    if (!cin) {
      throw new CustomError.NotFoundError('It seems that no identity card');
    }
    res.status(StatusCodes.OK).json(cin);
  } else if(userRole === 'CITIZEN'){
    let cin = await getCINByIdOrUserService({user: user})
    if (!cin) {
      throw new CustomError.NotFoundError('It seems that no identity card');
    }
    res.status(StatusCodes.OK).json(cin);
  }else {
    res.status(StatusCodes.FORBIDDEN).json('you are not authorized')
  }
};

const getCINsController = async (req, res) => {
  const userRole = req.user.userRole;
  const userId = req.user.userId;
  const status = req.query.status;
  const queryObject = {};
  if (userRole !== 'ADMIN') {
    throw new CustomError.UnauthenticatedError('You are not authorized');
  }
  if (status && status !== '') {
    // ! checking the status if it exist within the vars defined in the .env file
    queryObject.status = status;
  }

  const cins = await getCINsService(queryObject);
  res.status(StatusCodes.OK).json(cins);
};

// ! updating the c.i.n data
// ! comparing each entry of the model
// ! if there is a change if any field other than the status
// ! => means the update comes from a citizen
// !
const updateCINController = async (req, res) => {
  // ? For more details 
  const userRole = req.user.userRole;
  const userId = req.user.userId;
  const cinId = req.params.id;
  if(userRole === 'ADMIN'){
    let status = req.body.status;
    let identity = req.body.identity;
    let cin = await getCINByIdOrUserService({_id: cinId})
    if(!cin){
      throw new CustomError.NotFoundError('It seems that this identity does not exist')
    }
    // ! first update
    if(identity && cin.status === status === 'DEACTIVATED'){
      throw new CustomError.BadRequestError('You can not update the identity while still DEACTIVATED')
    }
    const cin_to_update = await updateCINService(cinId, {status, identity}, cin.user)
    if(!cin_to_update){
      throw new CustomError.BadRequestError('Something wrong please try again')
    }
    res.status(StatusCodes.OK).json('Identity updated successfully !')

  } else if(userRole === 'CITIZEN'){
    req.body.status = 'RENEWAL STAGE'
    let cin = await getCINByIdOrUserService({_id: cinId, user: userId})
    if(!cin){
      throw new CustomError.NotFoundError('Please check again, seems that this identity does not exist')
    }
    let cin_to_update = await updateCINService(cinId, {...req.body}, userId)
    if(!cin_to_update){
      throw new CustomError.BadRequestError('Something went wrong, please check again !')
    }
    res.status(StatusCodes.OK).json('Identity update successfully !')
  } 
  else {
    res.status(StatusCodes.FORBIDDEN).json('You are not allowed')
  }
  
};

module.exports = {
  createCINController,
  getCINByIdOrUserController,
  updateCINController,
  getCINsController,
};
