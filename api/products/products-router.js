const express = require('express');
const router = express.Router();
const Products = require('./products-model');

router.get('/products', async(req, res) => {
    const products = await Products.getAllProducts()
    res.json(products);
})


module.exports = router
