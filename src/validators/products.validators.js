const req = require('express-validator')

const checkIsAdmin = (token) =>{
    console.log(token)
}

const tokenRoleValidation ={
    token :req
    .custom(checkIsAdmin)
}