const Articulos = require('../models/products.models')


const getAllProductsService = async () => {
    try {
        const product = await Articulos.find({disabled:false})
        return product
    } catch (error) {
        throw new Error(error.message)
    }
}
const getProductsByIdService =async (id) =>{
    try {
        const getByIdProducts = await Articulos.findById(id)
        return getByIdProducts
    } catch (error) {
        throw new Error(error.message)
    }
}
const createProductService = async (userToken,newProduct) => {
    try {
        const { name, precio, category, disabled } = newProduct

           
            const createNewProduct = new Articulos({
            userID :userToken.id,                
            name,
            precio,
            category,
            disabled,
        })

        const savedProduct = await createNewProduct.save()
        return savedProduct
    } catch (error) {   

        throw new Error(error.message)
    }

}
const editProductByIdService = async (id ,payload,queryOptions) =>{
    try {
        return await Articulos.findByIdAndUpdate(id, payload, queryOptions);
    } catch (error) {
        throw error;
    }
};

const deleteProductByIdService = async(id) =>{
    return await Articulos.findByIdAndDelete(id)
}

module.exports={createProductService ,getAllProductsService ,getProductsByIdService ,editProductByIdService,deleteProductByIdService}