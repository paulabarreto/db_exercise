const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

function addPerson(){
  knex('famous_people').insert({
    first_name: first_name,
    last_name: last_name,
    birthdate: birthdate
  })
  .then(function() {})
  .catch(function(error){console.error(error)});
}

addPerson();
