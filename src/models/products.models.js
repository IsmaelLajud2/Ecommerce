const {Schema , model} = require('mongoose')

const productSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId ,
        required :true

        
    },
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

    discount :{
        type:Number,
        default:false
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