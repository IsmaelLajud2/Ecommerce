const { signToken } = require("../helpers/signToken");
const Usuarios = require("../models/users.models") ;
const { createUserService, getAllUserService, deleteUsersByIdServices, editUserByIdService } = require("../services/users.services");


const getAllUsers= async (req,res) =>{
    try {

        
        const getUser = await getAllUserService()
    if (!getUser) {
        res.status(404).json("Usuarios no encontrados")
    } 
    res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}




const createUser = async (req,res) => {
    try {
    
    
    const newUser = req.body
    const create = await createUserService(newUser)
    const authCredential = signToken(create)

    res.status(201).json(authCredential)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const editByIdUser = async (req,res)=>{
    try {
        const {id} = req.params
        const payload = req.body
        const queryOptions = {returnDocument:"after"}

        const editUser = await editUserByIdService(id,payload,queryOptions)

        res.status(200).json(editUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteUserById = async (req,res) =>{
    try {
        const {id} = req.params

        const deleteUser = await deleteUsersByIdServices(id)
        if (!deleteUser) {
            res.status(404).json("Usuario no encontrado")


        } 

        res.status(200).json("Borrado")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const userLogin = async(req,res) =>{
const {email,password} = req.body

const user = await Usuarios.findOne({email :email})

const authCredential = signToken(user)

res.status(200).json(authCredential)
  
}
module.exports ={
    createUser ,
    getAllUsers ,
    deleteUserById,
    editByIdUser,
    userLogin

}