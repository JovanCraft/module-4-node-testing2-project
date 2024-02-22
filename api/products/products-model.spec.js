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
})
