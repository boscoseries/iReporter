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
	ssl: true,
});

pool.on('connect', () => {
	console.log('connected to the database');
});

/**
 * Create Tables
 */
const createIncidentTable = () => {
	const queryText =
		`CREATE TABLE IF NOT EXISTS incidents(
			id SERIAL PRIMARY KEY,
			created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			created_by BIGINT,
			type VARCHAR(128) NOT NULL,
			location VARCHAR(128),
			status VARCHAR(128) DEFAULT 'draft',
			images VARCHAR(128),
			videos VARCHAR(128),
			comment VARCHAR(128) NOT NULL,
			FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
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
 * Drop Tables
 */
const dropIncidentTable = () => {
	const queryText = 'DROP TABLE IF EXISTS incidents';
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
	createIncidentTable,
	dropIncidentTable
};

require('make-runnable');