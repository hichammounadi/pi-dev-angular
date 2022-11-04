const Invoice = require('./ssModel')



const createInvoiceService = (data) => {
    return Invoice.create(data)
}


const getInvoicesService = (data) => {
    return Invoice.find(data)
}


const getInvoiceByIdService = (id, user) => {
    return Invoice.findOne({_id: id, user: user})
}

const updateInvoiceService = (id, data, user) => {
    return Invoice.findByIdAndUpdate(
        {_id: id, user: user},
        data,
        {new: true, runValidators: true}
    )
}


const deleteInvoiceService = (id, user) => {
    return Invoice.findOneAndDelete({_id: id, user: user})
}


module.exports = {
    createInvoiceService,
    getInvoicesService,
    getInvoiceByIdService,
    updateInvoiceService,
    deleteInvoiceService
}