const JWT = require('jsonwebtoken')

const signToken = (user) =>{
    const signToken = JWT.sign({
        id:user._id,
        role:user.role
    },
        process.env.SECRET
)

const key = user.role === "admin" ? process.env.ADMIN_KEY :process.env.CLIENT_KEY

const authObject ={token :signToken ,key :key}

return authObject

}

module.exports={signToken}