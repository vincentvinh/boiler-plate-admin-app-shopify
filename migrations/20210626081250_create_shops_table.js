const moment = require('moment');

exports.up = function(knex) {
    return knex.schema.createTable('shops', function(table) {
        table.increments();
        table.bigInteger('shopify_shop_id').notNullable();
        table.string('shop_domain').notNullable();
        table.string('shop_name').notNullable();
        table.string('host').notNullable();
        table.string('token').notNullable();
        table.string('locale');
        table.bigInteger('created_at').defaultTo(moment().unix())
        table.bigInteger('updated_at').defaultTo(moment().unix())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shops');
}