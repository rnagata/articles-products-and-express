
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: 'Happiness', price: 1000, inventory: 1 },
        {name: 'Sadness', price: 1, inventory: 1000},
        {name: 'Hope', price: 10, inventory: 2000}
      ]);
    });
};
