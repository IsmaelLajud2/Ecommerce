const bcrypt = require('bcrypt')

const saltRounds = 10

const hashedPassword = async(password) =>{
    const salt = await bcrypt.genSalt(saltRounds)
    return bcrypt.hash(password,salt)
}
module.exports={hashedPassword}