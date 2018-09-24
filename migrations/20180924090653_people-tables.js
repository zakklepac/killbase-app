exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('ninjas', function(table) {
        table.increments('nin_id');
        table.integer('person_id').references('people.people_id').onDelete('cascade');
        table.string('contact_info').notNullable().defaultTo('Unknown');
        table.string('weapon').notNullable().defaultTo('Unknown');
        table.integer('age').notNullable();
        table.integer('price').notNullable().defaultTo(10);
        table.float('rating').notNullable().defaultTo(0.0);
        table.integer('kills').notNullable();
      })
      .then(function() {
        return knex.schema.createTableIfNotExists('targets', function(table) {
          table.increments('target_id');
          table.integer('person_id').references('people.people_id').notNull().onDelete('cascade');
          table.string('location').notNullable().defaultTo('Unknown');
          table.string('photo').notNullable().defaultTo('No Image Provided');
          table.integer('sec_level').notNullable();
        })
      })
      .then(function() {
        return knex.schema.createTableIfNotExists('clients', function(table) {
          table.increments('client_id');
          table.integer('person_id').references('people.people_id').notNull().onDelete('cascade');
        })
      })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('ninjas')
      .then(function() {
        return knex.schema.dropTableIfExists('targets')
      }).then(function() {
        return knex.schema.dropTableIfExists('clients')
      })
  };
  