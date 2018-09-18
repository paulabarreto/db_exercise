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
  text: `SELECT first_name, last_name, birthdate
          FROM famous_people
          WHERE first_name ILIKE $1::text
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
    var output = `Searching...\nFound ${array.length} person(s) by the name ${name}:\n`;

    for (let i = 0; i < array.length; i++){
      var event = array[i].birthdate.toJSON().toString();
      var date = event.slice(0, 10);
      output += `- ${i + 1}: ${array[i].first_name} ${array[i].last_name}, born ${date}\n`
    }

    console.log(output);
    client.end();
  });
});
