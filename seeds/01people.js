exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function() {
      // Inserts seed entries
      return knex('people').insert([
        {full_name: 'Naruto Uzumaki'},
        {full_name: 'Sasuke Uchiha'},
        {full_name: 'Sakura Haruno'},
        {full_name: 'Kakashi Hatake'},
        {full_name: 'Obito Uchiha'},
        {full_name: 'Itachi Uchiha'},
        {full_name: 'Nagato'},
        {full_name: 'Hinata Hyuga'},
        {full_name: 'Shino Aburame'},
        {full_name: 'Shikamaru Nara'},
        {full_name: 'Zabuza'},
        {full_name: 'Asuma Sarutobi'},
        {full_name: 'Might Guy'},
        {full_name: 'Rock Lee'},
        {full_name: 'Tsunade'},
        {full_name: 'Yamato'},
        {full_name: 'Jiraya'},
        {full_name: 'Orochimaru'},
        {full_name: 'Gaara'},
      ])
    })
}
