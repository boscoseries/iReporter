const { Pool } = require('pg');
const env = require('dotenv');

env.config();

let connectionString;

switch (process.env.NODE_ENV) {
  case 'Test':
		connectionString=process.env.TEST_DATABASE_URL
    break;
  case 'Production':
		connectionString=process.env.PROD_DATABASE_URL
    break;
  case 'Development':
		connectionString=process.env.DEV_DATABASE_URL
    break;
}
console.log(process.env.NODE_ENV);

const pool = new Pool({
	connectionString,
	//ssl: true,
});

pool.on('connect', () => {
	console.log('connected to the database');
});

/**
 * Create User Table
 */
const createUserTable = () => {
	const queryText =
		`CREATE TABLE IF NOT EXISTS
        users(
		  id SERIAL PRIMARY KEY,
		  firstname VARCHAR(128) NOT NULL,
		  lastname VARCHAR(128) NOT NULL,
		  othernames VARCHAR(128),
		  phone_number BIGINT,
		  email VARCHAR(128) UNIQUE NOT NULL,
		  username VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
		  registered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		  is_admin BOOLEAN DEFAULT false
        )`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};


/**
 * Drop User Table
 */
const dropUserTable = () => {
	const queryText = 'DROP TABLE IF EXISTS users';
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

pool.on('remove', () => {
	console.log('client removed');
	process.exit(0);
});


module.exports = {
	createUserTable,
	dropUserTable,
};

require('make-runnable');