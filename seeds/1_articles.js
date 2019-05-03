
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {title: 'Aliens', body: 'They\'re weird.', author: 'Practical Joe'},
        {title: 'Aliens 2', body: 'They\'re not real.', author: 'Skeptical Jane'},
        {title: 'Aliens 3', body: 'First one was better.', author: 'James Cameron'}
      ]);
    });
};
