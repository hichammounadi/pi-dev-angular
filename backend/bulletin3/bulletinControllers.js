const {
    createBulletinService,
    getBulletinByUserOrIdService,
    getBulletinsService,
    updateBulletinService

} = require('./bulletinServices')
const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')
const { getCINByIdOrUserService } = require('../cin/cinServices')



const createBulletinController = async(req, res) => {
    const userId = req.user.userId
    const userRole = req.user.userRole
    const cin = await getCINByIdOrUserService({user: userId})
    if(!cin || cin.status !== 'ACTIVATED'){
        throw new CustomError.BadRequestError('You need first to get a legit identity card')
    }
    const bulletin = await createBulletinService({name: 'Bulletin #3', user: userId, identity : cin.identity, firstName: cin.firstName, lastName: cin.lastName, fatherName: cin.father, motherName: cin.mother })
}


const getBulletinsController = async( req, res ) => {
    const userId = req.user.userId;
    const userRole = req.user.userRole
    if(!userId || userRole !== 'ADMIN'){
        throw new CustomError.UnauthenticatedError('You are not authorized')
    }
}


const getBulletinByUserOrIdController = async(req, res) => {

}

const updateBulletinController = async( req, res ) => {

}


module.exports = {
    createBulletinController,
    getBulletinByUserOrIdController,
    getBulletinsController,
    updateBulletinController    
}