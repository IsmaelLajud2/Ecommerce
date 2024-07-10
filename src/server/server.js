const express = require('express');
const app = express()
require('dotenv').config()
require('../db/db.connect')
const morgan = require("morgan")
const port = process.env.port || 8022
const cors = require('cors')

app.use(express.json())
app.use(morgan("dev"))

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization,auth-token'
}));

const productsRoutes = require('../routes/products.routes');
const userRoutes = require('../routes/users.routes')
app.use('/api/productos', productsRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Estamos escuchando en http://localhost:${port}`)
})