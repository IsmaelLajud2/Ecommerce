const { hashedPassword } = require('../helpers/hashPassword')
const Usuarios = require('../models/users.models')


const getAllUserService = async() =>{
    return await Usuarios.find()
}

const createUserService = async(newUser)=>{
 try {
    const {name,surname,email,password,role} = newUser

    const hashPassword  = await hashedPassword(password)
    const createUser= new Usuarios({
        name,
        surname,
        email,
        password :hashPassword,
        role
    })
    return await createUser.save()
 } catch (error) {
    throw new Error({message:error.message})
 }
}

const editUserByIdService =  async(id,payload,queryOptions) =>{
    try {
      return await Usuarios.findByIdAndUpdate(id,payload,queryOptions) 
     
    } catch (error) {
        throw new Error({message :error})
    }

}
const deleteUsersByIdServices = async(id) =>{
    return await Usuarios.findByIdAndDelete(id)
}


module.exports={
    createUserService,
    getAllUserService,
    deleteUsersByIdServices,
    editUserByIdService
}