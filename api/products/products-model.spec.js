const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')

const testProduct1 = { name: 'Markers', type: "Stationary", color: "black", quantity: 6, price: 3.99, brand: "Sharpie", size: "5.9 inch" }
const testProduct2 = { name: 'Pencils', type: "Stationary", color: "yellow", quantity: 20, price: 2.94, brand: "Ticonderoga", size: "7.5 inch"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('products').truncate()
})

afterAll(async () => {
    await db.destroy()
})

test('checks for the correct env variable', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('Store Products', () => {
    test('getAllProducts give us all the products currently in our store', async () => {
        await request(server).post('/products').send(testProduct1);
        await request(server).post('/products').send(testProduct2);

        const response = await request(server).get('/products');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    })
    test('getProductById gives us a specific product depending on the id', async () => {
       await request(server).post('/products').send(testProduct1);
       expect(await db('products')).toHaveLength(1)
    })
    test('addProduct should add a new product', async () => {
        const response = await request(server).post('/products').send(testProduct1);

        expect(response.status).toBe(201);
    })
    test('updateProduct should update and existing product', async () => {
        const addedProduct = await request(server).post('/products').send(testProduct1);

        const updatedProduct = { ...testProduct1, name: 'Updated Name' };
        const response = await request(server).put(`/products/${addedProduct.body.id}`).send(updatedProduct);

        expect(response.status).toBe(200);
    })
    test('deleteProduct gets rid of an already existing product', async () => {
        const addedProduct = await request(server).post('/products').send(testProduct1);

        const response = await request(server).delete(`/products/${addedProduct.body.id}`);

        expect(response.status).toBe(200);
    })
    test('getProductsByType should return a list of projects with a certain type', async () => {
        await request(server).post('/products').send(testProduct1);
        await request(server).post('/products').send(testProduct2);

        const response = await request(server).get('/products/type/Stationary');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    })
    test('getProductByColor should return a list of products with the same specific color', async () => {
        await request(server).post('/products').send(testProduct1);
        await request(server).post('/products').send(testProduct2);

        const response = await request(server).get('/products/color/black');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    })
    test('getProductsByBrand should return a list of products by the specific given brand', async () => {
        const brandToFilterBy = 'Sharpie';
        const response = await request(server).get(`/products/brand/${brandToFilterBy}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(product => {
            expect(product.brand).toBe(brandToFilterBy);
          });
    })

    test('getProductsByQuantityGreaterThan should return products with quantity greater than specified value', async () => {
        await request(server).post('/products').send(testProduct1);
        await request(server).post('/products').send(testProduct2);

        const response = await request(server).get('/products/quantity-greater-than/10');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    })
    test('getProductsByPriceLessThan should return products with price less than specified value', async () => {
        await request(server).post('/products').send(testProduct1);
        await request(server).post('/products').send(testProduct2);

        const response = await request(server).get('/products/price-less-than/3');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    })
})
