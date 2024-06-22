const express = require('express');
const app = express()
require('dotenv').config()
require('../db/db.connect')
const morgan = require("morgan")
const port = process.env.port || 8022


app.use(express.json())
app.use(morgan("dev"))



const productsRoutes = require('../routes/products.routes');
const userRoutes = require('../routes/users.routes')
app.use('/api/productos', productsRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log(`Estamos escuchando en http://localhost:${port}`)
})