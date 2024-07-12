const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    //     userID: {
    //         type: Schema.Types.ObjectId,
    //  },
    name: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imagen: [{
        type: String,

    }],
    discount: {
        type: Number,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

module.exports = model("Articulos", productSchema)