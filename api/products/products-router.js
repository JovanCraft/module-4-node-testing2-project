const express = require('express');
const router = express.Router();
const Products = require('./products-model');

router.get('/', async(req, res) => {
    const products = await Products.getAllProducts()
    res.json(products);
})

router.get('/:id', async (req, res) => {
    const product = await Products.getProductById(req.params.id);
    res.json(product);
  });

router.post('/', async (req, res) => {
    await Products.addProduct(req.body);
    res.sendStatus(201);
  });

  router.put('/:id', async (req, res) => {
    await Products.updateProduct(req.params.id, req.body);
    res.sendStatus(200);
  });

router.delete('/:id', async (req, res) => {
    await Products.deleteProduct(req.params.id);
    res.sendStatus(200);
  });

router.get('/type/:type', async (req, res) => {
    const products = await Products.getProductsByType(req.params.type);
    res.json(products);
  });

router.get('/color/:color', async (req, res) => {
    const products = await Products.getProductsByColor(req.params.color);
    res.json(products);
  });

router.get('/brand/:brand', async (req, res) => {
    const products = await Products.getProductsByBrand(req.params.brand);
    res.json(products);
  });

router.get('/quantity-greater-than/:quantity', async (req, res) => {
    const products = await Products.getProductsByQuantityGreaterThan(req.params.quantity);
    res.json(products);
  });

router.get('/price-less-than/:price', async (req, res) => {
    const products = await Products.getProductsByPriceLessThan(req.params.price);
    res.json(products);
  });

module.exports = router
