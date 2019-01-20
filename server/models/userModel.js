const db = require('../database/database');

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
		  is_admin BOOLEAN NOT NULL
        )`;

	db.query(queryText)
		.then(result => {
			console.log(result);
			//pool.end();
		})
		.catch(error => {
			console.log(error);
			//pool.end();
		});
};


/**
 * Drop User Table
 */
const dropUserTable = () => {
	const queryText = 'DROP TABLE IF EXISTS users';
	db.query(queryText)
		.then(result => {
			console.log(result);
			//pool.end();
		})
		.catch(error => {
			console.log(error);
			//pool.end();
		});
};

module.exports = {
	createUserTable,
	dropUserTable,
};

require('make-runnable');