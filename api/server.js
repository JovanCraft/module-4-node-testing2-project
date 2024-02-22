const express = require('express')

const Router = require('./products/products-router')

const server = express()

server.use(express.json())

server.use('/products', Router)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });


 module.exports = server
