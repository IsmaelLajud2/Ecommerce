const bcrypt = require('bcrypt')

const comparePassword = async(password,hashedPassword) =>{
    const checkPassword = await bcrypt.compare(password,hashedPassword)
    return checkPassword
}

module.exports={comparePassword}