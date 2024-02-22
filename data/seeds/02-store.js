/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const products = [
  {
    name: "T-Shirt",
    type: "Clothing",
    color: "Blue",
    quantity: 50,
    price: 15.99,
    brand: "Generic Brand",
    size: "M"
  },
  {
    name: "Jeans",
    type: "Clothing",
    color: "Black",
    quantity: 30,
    price: 29.99,
    brand: "Denim Co.",
    size: "32x32"
  },
  {
    name: "Sneakers",
    type: "Footwear",
    color: "White",
    quantity: 20,
    price: 49.99,
    brand: "Sporty Footwear",
    size: "Men's size 9"
  },
  {
    name: "Backpack",
    type: "Accessory",
    color: "Gray",
    quantity: 25,
    price: 39.99,
    brand: "Outdoors Co.",
    size: "34L"
  },
  {
    name: "Smartphone",
    type: "Electronics",
    color: "Black",
    quantity: 15,
    price: 599.99,
    brand: "Tech Corp",
    size: "6.2 inch"
  },
  {
    name: "Laptop",
    type: "Electronics",
    color: "Silver",
    quantity: 10,
    price: 899.99,
    brand: "Tech Corp",
    size: "18 inch"
  },
  {
    name: "Water Bottle",
    type: "Accessory",
    color: "Green",
    quantity: 40,
    price: 9.99,
    brand: "Hydration Co.",
    size: "20 oz"
  },
  {
    name: "Desk Lamp",
    type: "Home Decor",
    color: "White",
    quantity: 20,
    price: 24.99,
    brand: "Bright Ideas",
    size: "24 inch"
  },
  {
    name: "Notebook",
    type: "Stationery",
    color: "Assorted",
    quantity: 100,
    price: 2.99,
    brand: "Paper Co.",
    size: "8.5 x 11 inch"
  },
  {
    name: "Coffee Mug",
    type: "Kitchenware",
    color: "Red",
    quantity: 35,
    price: 7.99,
    brand: "Ceramic Co.",
    size: "12 oz"
  }
]


exports.seed = async function(knex) {

  await knex('products').insert(products);
};
