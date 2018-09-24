const environment = process.env.NODE_ENV || 'production';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = knex;