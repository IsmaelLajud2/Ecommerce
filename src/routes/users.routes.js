const {Router} = require('express')
const { createUser, getAllUsers, deleteUserById, editByIdUser, userLogin } = require('../controllers/users.controllers')
const { loginValidator, validationsFields, UserValidator } = require('../validators/user.validator')
const route= Router()

route.get("/getAllUsers",getAllUsers)
route.post('/createUser',[UserValidator.email,UserValidator.password],validationsFields,createUser)
route.delete('/deleteUser/:id' ,deleteUserById)
route.patch('/editUser/:id',editByIdUser)
route.post('/login',[loginValidator.email,loginValidator.password],validationsFields,userLogin)


module.exports=route