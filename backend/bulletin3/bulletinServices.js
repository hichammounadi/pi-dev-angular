const BulletinTrois = require('./bulletinModel')



const createBulletinService = (data) => {
    return BulletinTrois.create(data)
}


const getBulletinsService = (data) => {
    return BulletinTrois.find(data)
}

const getBulletinByUserOrIdService = (data) => {
    return BulletinTrois.findOne(data)
}


const updateBulletinService = (id, data, user) => {
    return BulletinTrois.findByIdAndUpdate(
        {_id: id, user: user},
        data,
        {new : true, runValidators: true}
    )
}


module.exports = {
    createBulletinService,
    getBulletinByUserOrIdService,
    getBulletinsService,
    updateBulletinService
}