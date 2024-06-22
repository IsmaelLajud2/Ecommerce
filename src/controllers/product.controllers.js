const Productos = require('../models/products.models')
const { createProductService, getAllProductsService, getProductsByIdService, editProductByIdService, deleteProductByIdService } = require('../services/products.services')


const getAllProducts = async(req,res) =>{
    try {
        const getProducts = await getAllProductsService()
        if (getAllProducts.length === 0) {
            res.status(404).json("Productos no encontrados")
            

        }
        res.status(200).json(getProducts)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getByIdProducts = async (req,res) =>{
    try {
        const {id} = req.params
        const getById = await getProductsByIdService(id)
        if (getById.length === 0) {
            res.status(404).json("Producto no encontrado")
        }
        res.status(200).json(getById)
    } catch (error) {
        res.status(500).json({message :error.message})
    }
}
const createProduct = async (req,res) =>{
    try {
        const newProduct = req.body
        if (!newProduct) {
            res.status(404).json("No se pudo crear")
        }
        await createProductService(newProduct)
        res.status(201).json("Producto Creado correctament")
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message:error.message });
    }
}

const editProductById = async (req,res) =>{
    
   
    try {

        const {id} = req.params
    
      const payload = req.body 
      const queryOptions ={returnDocument :"after"}

      
      const response = await editProductByIdService(id,payload,queryOptions)
      if (!response) {
        res.status(404).json("Producto no encontrado")
      }

      res.status(200).json(response)


    }  catch (error){

        res.status(500).json({message:error.message})
    } 
}

const deleteByIdProduct = async(req,res) =>{
    try {
        const {id} = req.params
        const deleteProduct= await deleteProductByIdService(id)
        if (!deleteProduct) {
            res.status(404).json("No se a encontrado el producto")
        }
        res.status(200).json("Borrado")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports= {createProduct ,getAllProducts ,getByIdProducts,editProductById ,deleteByIdProduct}