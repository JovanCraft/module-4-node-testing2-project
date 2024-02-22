/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('products', table => {
    table.increments('product_id')
    table.string('type')
    .notNullable()
    table.string('color')
    table.integer('quantitiy')
    table.float('price')
    table.string('brand')
    table.string('size')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('products')
};
