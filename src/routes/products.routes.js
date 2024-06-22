const {Router}= require('express')
const { createProduct, getAllProductsAvailable, getByIdProducts, editProductById, deleteByIdProduct, getProductsWithOptions, getAllTypesOfProducts } = require('../controllers/product.controllers')
const { verifyToken } = require('../helpers/verifyToken')
const { validationsFields } = require('../validators/user.validator')

const route = Router()



route.get('/getAvailableProducts',getAllProductsAvailable)
route.get('/getAllProducts',verifyToken,validationsFields,getAllTypesOfProducts)
route.get('/getById/:id' ,getByIdProducts)
route.get('/sortedProducts/:options?',getProductsWithOptions)
route.patch('/edit/:id',verifyToken,validationsFields ,editProductById)
route.post('/createProductos',verifyToken,validationsFields,createProduct)
route.delete('/delete/:id', deleteByIdProduct)

module.exports = route