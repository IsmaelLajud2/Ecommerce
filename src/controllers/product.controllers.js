const { signToken } = require('../helpers/signToken')
const Productos = require('../models/products.models')
const { createProductService, getAllProductsService, getProductsByIdService, editProductByIdService, deleteProductByIdService } = require('../services/products.services')



//  PETICIONES DE TIPO GET
const getAllProductsAvailable = async (req, res) => {


    try {
        const getProducts = await getAllProductsService()
        if (getProducts.length === 0 || !getProducts) {
            res.status(404).json("Productos no encontrados")


        }
        res.status(200).json(getProducts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllTypesOfProducts = async (req, res) => {


    const { userToken } = req
    if (!userToken || userToken.role !== "admin") {
        return res.status(404).json({ message: "Token NO proporcionado o invalido" })
    }



    try {
        const response = await Productos.find({})
        if (!response) {
            res.status(400).json("Productos no encontrados")
        }
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getByIdProducts = async (req, res) => {
    try {
        const { id } = req.params
        const getById = await getProductsByIdService(id)
        if (getById.length === 0) {
            res.status(404).json("Producto no encontrado")
        }
        res.status(200).json(getById)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductsWithOptions = async (req, res) => {
    try {
        const { options } = req.params

        const { name, category } = req.query

        let queryOptions = {}



        if (name) {
            queryOptions.name = new RegExp(name, "i")
        }
        if (category) {
            queryOptions.category = new RegExp(category, "i")
        }

        queryOptions.disabled = "false"
        let sortedOptions = {}
        if (options === "price_asc") {
            sortedOptions.precio = 1
        }
        else if (options === "price_desc") {
            sortedOptions.precio = - 1
        }

        let products

        if (options === "price_asc" || options === "price_desc") {
            products = await Productos.find(queryOptions).sort(sortedOptions)
        }
        else {
            products = await Productos.find(queryOptions)
        }

        res.status(200).json(products)



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// PETICIONES DE TIPO POST
const createProduct = async (req, res) => {

    const { userToken } = req
    console.log(userToken)
    if (!userToken) {
        return res.status(401).json({ message: "Token no proporcionado" })
    }
    if (userToken.role !== "admin") {
        return res.status(403).json({ message: "Acceso Denegado" })
    }
    try {


        const newProduct = req.body
        if (!newProduct) {
            res.status(404).json("No se pudo crear")
        }
        await createProductService(userToken, newProduct)
        res.status(201).json("Producto Creado correctament")
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: error.message });
    }
}
// PETICIONES DE TIPO PATCH/PUT
const editProductById = async (req, res) => {
    const { userToken } = req
    console.log(userToken)
    if (!userToken) {
        return res.status(401).json({ message: "Token no proporcionado" })
    }
    else if (userToken.role !== "admin") {
        return res.status(403).json({ message: "Acceso Denegado" })
    }

    try {

        const { id } = req.params

        const payload = req.body
        const queryOptions = { returnDocument: "after" }


        const response = await editProductByIdService(id, payload, queryOptions)
        if (!response) {
            res.status(404).json("Producto no encontrado")
        }

        res.status(200).json(response)


    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}
// PETICIONES DE TIPO DELETE
const deleteByIdProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await deleteProductByIdService(id)
        if (!deleteProduct) {
            res.status(404).json("No se a encontrado el producto")
        }
        res.status(200).json("Borrado")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createProduct,
    getAllProductsAvailable,
    getByIdProducts,
    editProductById,
    deleteByIdProduct,
    getProductsWithOptions,
    getAllTypesOfProducts
}