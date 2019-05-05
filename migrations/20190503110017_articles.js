
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', (table) => {
    table.increments();
    table.string('title', 255).notNull();
    table.text('body');
    table.string('author', 255).notNull();
    table.string('urlTitle', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
