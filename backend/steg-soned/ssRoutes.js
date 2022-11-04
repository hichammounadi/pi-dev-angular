const invoiceRouter = require('express').Router()
const {
    createInvoiceController,
    getInvoicesController,
    getInvoiceByIdController,
    updateInvoiceController,
    deleteInvoiceController

} = require('./ssControllers')



invoiceRouter.route('/').get(getInvoicesController).post(createInvoiceController)
invoiceRouter.route('/:id').get(getInvoiceByIdController).patch(updateInvoiceController).delete(deleteInvoiceController)



module.exports = invoiceRouter