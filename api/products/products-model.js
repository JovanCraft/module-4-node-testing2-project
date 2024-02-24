const db = require('../../data/db-config')

async function getAllProducts() {
    const rows = await db('products')

    return rows
}

async function getProductById(id){
    const rows = await db('products').where('product_id','=', id).first()

    return rows
}

async function addProduct(product){
        const [insertedProductId] = await db('products').insert(product);
        const insertedProduct = await db('products').where('product_id', insertedProductId).first();
        return insertedProduct;
}

async function updateProduct(id, changes){
    const rows = await db('products').where('products.product_id', '=', id).update(changes)

    return rows
}

async function deleteProduct(id){
    const row = await db('products').where('products.product_id', '=', id).del()

    return row
}

async function getProductsByType(type){
    const rows = await db('products').where('products.type', '=', type)

    return rows
}

async function getProductsByColor(color){
    const rows = await db('products').where('products.color', '=', color)

    return rows
}

async function getProductsByBrand(brand){
    const rows = await db('products').where('products.brand', '=', brand)

    return rows
}

async function getProductsByQuantityGreaterThan(quantity){
    const rows = await db('products').where('products.quantity', '>', quantity)

    return rows
}

async function getProductsByPriceLessThan(price){
    const rows = await db('products').where('products.price', '<', price)

    return rows
}




module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByType,
    getProductsByColor,
    getProductsByBrand,
    getProductsByQuantityGreaterThan,
    getProductsByPriceLessThan
}
