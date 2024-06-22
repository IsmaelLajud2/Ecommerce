const {Schema , model} = require('mongoose')

const productSchema = new Schema({
    
    name:{
        type:String,
        required:true
    } ,
    precio :{
        type:Number,
        required:true
    }, 
    category :{
        type : String,
        required:true
    },
    disabled: {
        type:Boolean,
        default:false
    }
}, 
{
    timestamps:true
}
)

module.exports= model("Articulos",productSchema)