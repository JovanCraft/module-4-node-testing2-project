const express = require('express')

const Products = require('./products/products-model')

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });


server.get('/products', async(req, res) => {
    const products = await Products.getAllProducts()
    res.json(products);
})

 module.exports = server
