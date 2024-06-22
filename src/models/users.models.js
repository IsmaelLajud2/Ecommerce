const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    } ,
    surname : {
        type:String,
        required:true
    } ,
    email: {
        type:String, 
        required: true
    } ,
    password: {
        type:String,
        required :true
    }, 
    role: {
        type:String,
        enum:["cliente","admin"],
        default:"cliente"
        } ,
    disabled: {
        type:Boolean ,
        default:false
    }
} ,
{
    timestamps:true
}
)

module.exports = model("usuarios",userSchema)