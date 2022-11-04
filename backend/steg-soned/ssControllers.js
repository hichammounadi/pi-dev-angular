const {
  createInvoiceService,
  getInvoicesService,
  getInvoiceByIdService,
  updateInvoiceService,
  deleteInvoiceService,
} = require('./ssServices');

const CustomError = require('../shared-services/errors');
const { StatusCodes, REQUEST_URI_TOO_LONG } = require('http-status-codes');
const { getUserByIdService } = require('../user/userServices');
const { getCreditCardByUserService, updateCreditCardService } = require('../credit-card/creditServices');

const createInvoiceController = async (req, res) => {
  const isAdmin = req.user.userRole;
  const userId = req.user.userId;
  if (!userId || isAdmin !== 'ADMIN') {
    throw new CustomError.UnauthenticatedError('You are not authorized');
  }
  const { name, amount, user, address, type } = req.body;
  if (!name || !amount || !user || !address || !type) {
    throw new CustomError.BadRequestError('Invoice data are mendatory');
  }
  const isUserExist = await getUserByIdService(user);
  if (!isUserExist) {
    throw new CustomError.NotFoundError(
      'It seems that this citizen does not exist'
    );
  }
  await createInvoiceService({ name, amount, user, address, type });
  res
    .status(StatusCodes.CREATED)
    .json(`Invoice of type ${type} is created successfully`);
};

const getInvoicesController = async (req, res) => {
  const user = req.user.userId;
  const userRole = req.user.userRole
  
  if (!user) {
    throw new CustomError.UnauthenticatedError('You are not authorized');
  }
  const { type, status } = req.query;
  const queryObject = {};
  if (type && type !== '') {
    queryObject.type = type;
  }
  if (status && status !== '') {
    queryObject.status = status;
  }
  queryObject.user = user;
  if (userRole === 'CITIZEN') {
    let invoices = await getInvoicesService(queryObject);
    res.status(StatusCodes.OK).json(invoices);
    return;
  }
  if (userRole === 'ADMIN'){
    let invoices = await getInvoicesService(queryObject)
    res.status(StatusCodes.OK).json(invoices)
  }
};

const getInvoiceByIdController = async (req, res) => {
  const user = req.user.userId;
  const id = req.params.id;
  const invoice = await getInvoiceByIdService(id, user);
  if (!invoice) {
    throw new CustomError.NotFoundError(`No invoice with id : ${id}`);
  }
  res.status(StatusCodes.OK).json(invoice);
};

const updateInvoiceController = async (req, res) => {
  // ! if a citizen wanna access this controller
  // ! he got only the status updated when he payed
  // ! check the credit card's balance
  // ! if the balance is enough to pay
  // ! status updated in the background
  // ? if the admin want to access this controller
  // ? in case of typo 
  
  const {
    body: { name, amount, address, status, user },
    user: { userId },
    params: { id: id },
  } = req;
  const isUserExist = await getUserByIdService(userId);
  if (!isUserExist) {
    throw new CustomError.UnauthenticatedError('Not authenticated');
  }
  const invoice = await getInvoiceByIdService(id, userId);
  if (!invoice) {
    throw new CustomError.NotFoundError(
      'Seems that this invoice does not exist'
    );
  }
  const userRole = user.role;
  console.log(userRole);
  if (userRole === process.env.USER_ROLE.split(',')[1]) {
    const isCreditCardExist = await getCreditCardByUserService(userId);
    if (!isCreditCardExist) {
      throw new CustomError.BadRequestError(
        'You need to add a credit card to your account'
      );
    }
    const balance = isCreditCardExist.balance;
    if (balance < invoice.amount) {
      throw new CustomError.BadRequestError('insufficient funds');
    }
    const newBalance = balance - invoice.amount
    await updateCreditCardService(isCreditCardExist._id, {balance: newBalance}, userId)
    await updateInvoiceService(id, { status: status }, userId);
    res
      .status(StatusCodes.OK)
      .send(
        `Invoice status updated from ${invoice.status} to ${status} successfully`
      );
    return;
  }
  await updateInvoiceService(id, { name, amount, address, user, type}, req.body.user);
  res.status(StatusCodes.OK).send(`Invoice updated successfully`);
};

const deleteInvoiceController = async (req, res) => {
  const userRole = req.user.userRole;
  const userId = req.user.userId;
  const id = req.params.id;
  if (!userId || userRole !== 'ADMIN') {
    throw new CustomError.UnauthenticatedError('You are not authorized');
  }
  const invoice = await deleteInvoiceService(id, userId);
  if (!invoice) {
    throw new CustomError.NotFoundError(
      'It seems that this invoice does not exist'
    );
  }
  res.status(StatusCodes.OK).json('invoice deleted successfully');
};

module.exports = {
  createInvoiceController,
  getInvoicesController,
  getInvoiceByIdController,
  updateInvoiceController,
  deleteInvoiceController,
};
