exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('team_names', function(table) {
      table.integer('nin_id').references('ninjas.nin_id').onDelete('cascade');
      table.string('team_name').defaultTo('Unknown');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('team_names');
  };
  