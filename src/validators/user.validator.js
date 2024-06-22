const { body, validationResult } = require('express-validator')

const Usuario = require('../models/users.models')
const { comparePassword } = require('../helpers/compare.password')
const passwordRegex = require('../helpers/passwordRegex')

const emailExistValdator = async (email) => {
    const emailExist = await Usuario.find({ email: email })

    if (emailExist.length !== 0) {
        throw new Error(`El email ${email} ya se encuentra en uso`)
    }
    return false
}

const checkPasswordValidator = async (req) => {
    const { email, password } = req

    const userFound = await Usuario.findOne({ email: email })
console.log(userFound)
    if (!userFound) {
        throw new Error("Email inexistente")
    }
    const checkPassword = await comparePassword(password, userFound.password)

    if (!checkPassword) {
        throw new Error(`Email o contraseñas incorrectas`)
    }
    return false
}

const UserValidator = {
    email: body("email")
        .isEmail()
        .withMessage("Debe ingresar un email Valido")
        .not()
        .isEmpty()
        .withMessage("Este campo es requerido")
        .custom(emailExistValdator)
    ,
    password: body("password")
        .matches(passwordRegex)
        .withMessage("Debes ingresar una contraseña valida")

}

const loginValidator = {
    email: body("email")
        .isEmail()
        .withMessage("Email o contraseñas incorrectas")
        .not()
        .isEmpty()
        .withMessage("Este campo es requerido")
    ,
    password: body()
        .custom(checkPasswordValidator)
}


const validationsFields = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()

}

module.exports = { UserValidator, validationsFields, loginValidator }