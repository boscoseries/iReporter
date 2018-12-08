const pg = require("pg");
const dotenv = require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);

client.connect(() => {
	console.log("connected to the db");
});

client.query("end", () => client.end());
