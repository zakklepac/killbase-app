let ids = [];
let nin = [];
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('ninjas').del()
    .then(function() {
      return knex('team_names').del()
    })
    .then(function() {
      return knex('targets').del()
    })
    .then(function() {
      return knex('clients').del()
    })

    .then(function() {
      return knex.select('people_id').from('people')
    })
    .then(function(people_id) {
      people_id.forEach(function(element) {
        let index = 0;
        let key = Object.keys(element)[index];
        val = element[key];
        ids.push(val);
      })
      return knex('ninjas').insert([{
          person_id: ids[0],
          weapon: 'Shadow Clone Jutsu, Rasengan',
          contact_info: 'naruto@gmail.com',
          age: 34,
          price: 45,
          rating: 9.9,
          kills: 0
        },
        {
          person_id: ids[1],
          weapon: 'Sharingan, Chidori',
          contact_info: 'xsasukex@gmail.com',
          age: 34,
          price: 40,
          rating: 9.9,
          kills: 72
        },
        {
          person_id: ids[2],
          weapon: 'Medical Jutsu, Heavy Punches',
          contact_info: 'sakurachan@gmail.com',
          age: 33,
          price: 20,
          rating: 6.5,
          kills: 35
        },
        {
          person_id: ids[3],
          weapon: 'Sharingan, Chidori',
          contact_info: 'whitewolf@gmail.com',
          age: 50,
          price: 25,
          rating: 9,
          kills: 48
        },
        {
          person_id: ids[4],
          weapon: 'Sharingan',
          contact_info: 'tobitobi@gmail.com	',
          age: 50,
          price: 50,
          rating: 9.5,
          kills: 433
        },
        {
          person_id: ids[5],
          weapon: 'Sharingan',
          contact_info: 'xitchatix@gmail.com',
          age: 40,
          price: 15,
          rating: 9.7,
          kills: 500
        },
        {
          person_id: ids[6],
          weapon: 'Everything',
          contact_info: 'thisispain@gmail.com',
          age: 41,
          price: 30,
          rating: 9.5,
          kills: 1000
        },
        {
          person_id: ids[7],
          weapon: 'Byakugan',
          contact_info: 'flowersforhinata@gmail.com',
          age: 33,
          price: 30,
          rating: 4,
          kills: 2
        },
        {
          person_id: ids[8],
          weapon: 'Bugs',
          contact_info: 'bugslife@gmail.com',
          age: 33,
          price: 0,
          rating: 8,
          kills: 24
        }
      ])
    })
    .then(function() {
      return knex('targets').insert([{
          person_id: ids[9],
          location: 'Shogi Parlor',
          photo: 'https://vignette.wikia.nocookie.net/naruto/images/4/44/Shikamaru_Part_I.png/revision/latest?cb=20170419112314',
          sec_level: 3
        },
        {
          person_id: ids[10],
          location: 'The Mist',
          photo: 'https://vignette.wikia.nocookie.net/naruto/images/3/37/Zabuza_Momochi.png/revision/latest?cb=20150122142749',
          sec_level: 9
        },
        {
          person_id: ids[11],
          location: 'The Graveyard',
          photo: 'https://vignette.wikia.nocookie.net/naruto/images/7/7c/Asuma.png/revision/latest?cb=20150822043018',
          sec_level: 7
        },
        {
          person_id: ids[12],
          location: 'The Gym',
          photo: 'https://vignette.wikia.nocookie.net/naruto/images/3/31/Might_Guy.png/revision/latest?cb=20150401084456',
          sec_level: 10
        },
        {
          person_id: ids[13],
          location: 'Close to Might Guy',
          photo: 'https://vignette.wikia.nocookie.net/naruto/images/9/97/Rock_Lee_Part_I.png/revision/latest?cb=20160917022536',
          sec_level: 4
        }
      ]);
    }).then(function() {
      return knex('clients').insert([
        {person_id: ids[14],},
        {person_id: ids[15],},
        {person_id: ids[16],},
        {person_id: ids[17],},
        {person_id: ids[18],}
      ])
    })
};
