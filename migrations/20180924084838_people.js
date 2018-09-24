exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('people', function(table) {
      table.increments('people_id');
      table.string('full_name').notNullable().defaultTo('Unknown');
  
    })
  
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('people');
  };
  