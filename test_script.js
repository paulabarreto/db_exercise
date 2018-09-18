const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

const query = {
  name: 'fetch-user',
  text: `SELECT count(*), first_name, last_name, birthdate FROM famous_people
          WHERE first_name ILIKE $1::text
          GROUP BY id;
          `,
  values:  [`${name}`]
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    var array = result.rows;
    var output = {};

    for (let i = 0; i < array.length; i++){
      let year = array[i].birthdate.getFullYear();
      let month = array[i].birthdate.getMonth();
      let day = array[i].birthdate.getDate();
      output[i + 1] = `${array[i].first_name} ${array[i].last_name}, born ${year}-${month}-${day}`
    }

    console.log(output);
    client.end();
  });
});
