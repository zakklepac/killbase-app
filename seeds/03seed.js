targetIds = [];
clientIds = [];
ninIds = [];
let nin = [];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function() {
      return knex('targets')
        .select('target_id')
        .then(function(target_id) {
          target_id.forEach(function(element) {
            let index = 0;
            let key = Object.keys(element)[index];
            val = element[key];
            targetIds.push(val);
          })
        })
    })
    .then(function() {
      return knex('clients')
        .select('client_id')
        .then(function(client_id) {
          client_id.forEach(function(element) {
            let index = 0;
            let key = Object.keys(element)[index];
            val = element[key];
            clientIds.push(val);
          })
        })
    })
    .then(function() {
      return knex('ninjas')
        .select('nin_id')
        .then(function(nin_id) {
          nin_id.forEach(function(element) {
            let index = 0;
            let key = Object.keys(element)[index];
            val = element[key];
            ninIds.push(val);
          })
        })
    })
    .then(function() {
      return knex('contracts').insert([
        {target_id: targetIds[0],client_id: clientIds[0],budget: 40},
        {target_id: targetIds[1],client_id: clientIds[1],budget: 70},
        {target_id: targetIds[2],client_id: clientIds[2],budget: 35},
        {target_id: targetIds[3],client_id: clientIds[3],budget: 25},
        {target_id: targetIds[4],client_id: clientIds[4],budget: 10},
      ]);
    })
    .then(function() {
      return knex.select('nin_id').from('ninjas')
    })
    .then(function(nin_id) {

      nin_id.forEach(function(element) {
        let index = 0;
        let key = Object.keys(element)[index];
        val = element[key];
        nin.push(val);
      })
      return knex('team_names').insert([
        {nin_id: nin[0],team_name: 'Team 7'},
        {nin_id: nin[1],team_name: 'Team 7'},
        {nin_id: nin[2],team_name: 'Team 7'},
        {nin_id: nin[3],team_name: 'Team 7'},
        {nin_id: nin[4],team_name: 'Akatsuki'},
        {nin_id: nin[5],team_name: 'Akatsuki'},
        {nin_id: nin[6],team_name: 'Akatsuki'},
        {nin_id: nin[7],team_name: 'Team 8'},
        {nin_id: nin[7],team_name: 'Team 8'},
        {nin_id: nin[8],team_name: 'Team 10'}
      ])
    });
}
