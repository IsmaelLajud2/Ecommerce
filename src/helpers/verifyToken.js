const JWT = require('jsonwebtoken')

const verifyToken =(req,res,next) => {
    
const token = req.header("auth-token");
if (!token) {
    res.status(401).json({message:"Token no proporcionado o invalido"})

}
try {
    const verify = JWT.verify(token,process.env.SECRET)

    req.userToken = verify

    next()

} catch (error) {
    res.status(500).json({message:error.message})
}

}; 

module.exports={verifyToken}