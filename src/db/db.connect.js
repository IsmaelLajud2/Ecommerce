const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Conectado la DB")
    } catch (error) {
        console.log(error)
    }
}
dbConnect()