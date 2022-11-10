const {
    createBulletinService,
    getBulletinByUserOrIdService,
    getBulletinsService,
    updateBulletinService

} = require('./bulletinServices')
const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')
const { getCINByIdOrUserService } = require('../cin/cinServices')



// TODO : 
const createBulletinController = async(req, res) => {
    const userId = req.user.userId
    const userRole = req.user.userRole
    const cin = await getCINByIdOrUserService({user: userId})
    if(!cin || cin.status !== 'ACTIVATED'){
        throw new CustomError.BadRequestError('You need first to get a legit identity card')
    }
    const bulletin = await createBulletinService({name: `Bulletin #3 - ${cin.firstName} ${cin.identity}`, user: userId, identity : cin.identity, firstName: cin.firstName, lastName: cin.lastName, father: cin.father, mother: cin.mother, occupation: cin.occupation, birth: cin.birth })
    res.status(StatusCodes.CREATED).json('Bulletin-3 created successfully !')
}


// TODO : 
const getBulletinsController = async( req, res ) => {
    const userId = req.user.userId;
    const userRole = req.user.userRole
    if(!userId || userRole !== 'ADMIN'){
        throw new CustomError.UnauthenticatedError('You are not authorized')
    }
    const bulletins = await getBulletinsService()
    res.status(StatusCodes.OK).json(bulletins)
}


// TODO : 
const getBulletinByUserOrIdController = async(req, res) => {
    const id = req.params.id
    const bulletin = await getBulletinByUserOrIdService({user: id})
    if(!bulletin){
        throw new CustomError.NotFoundError('It seems that you don\'t have a Bulletin-3')
    }
    res.status(StatusCodes.OK).json(bulletin)
}
// TODO : 
const updateBulletinController = async( req, res ) => {
    console.log(req.body)
    const {
        body: {status},
        params: {id:id},
        user: {userId}
    } = req
    if(!status){
        throw new CustomError.BadRequestError('Please provide the status')
    }
    console.log(userId)
    const bulletin = await updateBulletinService(id, {status}, userId)
    if(!bulletin){
        throw new CustomError.NotFoundError('It seems that this bulletin does not exist')
    }
    res.status(StatusCodes.OK).json('Bulletin updated successfully !')
}


module.exports = {
    createBulletinController,
    getBulletinByUserOrIdController,
    getBulletinsController,
    updateBulletinController    
}