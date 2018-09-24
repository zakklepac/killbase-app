exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('contracts', function(table) {
  
      table.increments('contract_id');
      table.integer('target_id').references('targets.target_id').onDelete('cascade');
      table.integer('client_id').references('clients.client_id').onDelete('cascade');
      table.integer('budget');
      table.boolean('complete');
      table.integer('completed_by').references('ninjas.nin_id');
  
    }).then(function() {
      return knex.schema.createTableIfNotExists('assigned_contracts', function(table) {
        table.integer('nin_id').references('ninjas.nin_id').onDelete('cascade');
        table.integer('contract_id').references('contracts.contract_id').onDelete('cascade');
      })
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('contracts')
      .then(function() {
        return knex.schema.dropTableIfExists('assigned_contracts');
      })
  };
  