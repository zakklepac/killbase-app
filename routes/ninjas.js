'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

//Update Single Assasssin

router.get('/:id/edit', (req, res, next) => {
  knex('ninjas')
    .select('ninjas.nin_id', 'people.full_name', 'team_names.team_name', 'ninjas.contact_info', 'ninjas.weapon', 'ninjas.age', 'ninjas.price', 'ninjas.rating', 'ninjas.kills').orderBy('ninjas.nin_id')
    .leftJoin('people', 'people.people_id', 'ninjas.person_id')
    .leftJoin('code_names', 'code_names.nin_id', 'ninjas.nin_id')
    .where('ninjas.nin_id', req.params.id)
    .then(function(ninObj) {
      console.log(ninObj)
      res.render('ninjas-update', {
        ninja: ninObj
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
})


router.put('/:id', (req, res, next) => {
  let person = {};
  person.full_name = req.body.full_name;
  delete req.body.full_name;
console.log(person);
  let teamName = {};
  teamName.nin_id = req.params.id;
  teamName.team_name = req.body.code_name;
  delete req.body.team_name;

  return Promise.all([
    knex('ninjas').update(req.body).where('nin_id', req.params.id).returning('*'),
    knex('team_names').update(codeName).where('nin_id', req.params.id)
    ])
    .then(function(results) {
      console.log('hellllllllllo');
      let [ninja, team_name_id] = results;
      return knex('people').update(person).where('people_id', ninja[0].person_id);
    })
    .then(function(updateNin) {
      res.redirect('/ninjas');
    })

    .catch(function(error) {
      console.log(error);
    });

})

//GET route for new assassin
router.get('/new', (req, res, next) => {
  res.render('ninjas-new')
})

//Create Assassin -Get request up top

router.post('/', (req, res, next) => {
  console.log(req.body);
  const newPeople = {
    full_name: req.body.full_name,
  };
  const newNinja = {
    contact_info: req.body.contact_info,
    weapon: req.body.weapon,
    age: parseInt(req.body.age),
    price: parseInt(req.body.price),
    rating: parseFloat(req.body.rating),
    kills: parseInt(req.body.kills)
  };
  const newCodeName = {
    code_name: req.body.code_name
  };

  knex('people').insert(newPeople).returning('*')
    .then((people) => {

      newNinja.person_id = people[0].people_id;
      return knex('ninjas').insert(newNinja).returning('*')

    })
    .then((ninjas) => {
      newTeamName.nin_id = ninjas[0].nin_id;
      return knex('team_names').insert(newTeamName)
    })
    .then(function() {
      res.redirect('/ninjas');
    })
    .catch(function(error) {
      console.log(error);
      res.redirect('/ninjas');
    });
});



//GET All Assassins
router.get('/', (req, res, next) => {
  console.log('working');
  knex('ninjas')
    .select('ninjas.nin_id', 'people.full_name', 'code_names.code_name', 'ninjas.contact_info', 'ninjas.weapon', 'ninjas.age', 'ninjas.price', 'ninjas.rating', 'ninjas.kills')
    .leftJoin('people', 'people.people_id', 'ninjas.person_id')
    .leftJoin('code_names', 'code_names.nin_id', 'ninjas.nin_id')
    .then(function(ninjasArr) {
      console.log(ninjasArr);

      res.render('ninjas', {
        ninjas: ninjasArr
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})


//GET Single Assassin and Assigned Contracts

router.get('/:id', (req, res, next) => {
  knex('ninjas')
    .select('ninjas.nin_id', 'people.full_name', 'code_names.code_name', 'ninjas.contact_info', 'ninjas.weapon', 'ninjas.age', 'ninjas.price', 'ninjas.rating', 'ninjas.kills')
    .leftJoin('people', 'people.people_id', 'ninjas.person_id')
    .leftJoin('code_names', 'code_names.nin_id', 'ninjas.nin_id')
    .where('ninjas.nin_id', req.params.id)
    .then(function(ninjaObj) {
      console.log(ninjaObj)
      res.render('ninja-single', {
        ninja: ninjaObj
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
    .then(function(ninjaObj) {
      knex('assigned_contracts')
        .innerJoin('contracts', 'contracts.contract_id', 'assigned_contracts.contract_id')
        .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
        .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
        .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
        .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
        .select({
          target: 'target_people.full_name'
        }, {
          client: 'client_people.full_name'
        }, 'targets.location', 'targets.sec_level')
        .where('assigned_contracts.nin_id', req.params.id)
    })
    .then(function(activeCon) {
      console.log(activeCon);
      res.render('ninja-single', {
          ninja: ninjaObj,
          active: activeCon
        }

      );
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
})


//Delete Assassin

router.delete('/:id', (req, res, next) => {
  knex('ninjas')
    .del()
    .where('ninjas.nin_id', req.params.id)
    .then(function(results) {
      // res.send(results);
      res.redirect('/ninjas');
    })
    .catch(function(error) {
      console.log(error);
      res.redirect('/ninjas');
    });
})


module.exports = router;
