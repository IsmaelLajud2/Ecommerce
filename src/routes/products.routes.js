const {Router}= require('express')
const { createProduct, getAllProducts, getByIdProducts, editProductById, deleteByIdProduct } = require('../controllers/product.controllers')
const route = Router()



route.get('/getAll',getAllProducts)
route.get('/getById/:id' ,getByIdProducts)
route.patch('/edit/:id' ,editProductById)
route.post('/createProductos' ,createProduct)
route.delete('/delete/:id', deleteByIdProduct)

module.exports = route