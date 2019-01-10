const { Pool } = require('pg');
const dotenv = require('dotenv').config();







const pool = new Pool({
	connectionString: process.env.NODE_ENV
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
			id UUID PRIMARY KEY,
			created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			type VARCHAR(128) NOT NULL,
			location VARCHAR(128),
			status VARCHAR(128) DEFAULT 'draft',
			images VARCHAR(128),
			videos VARCHAR(128),
			comment VARCHAR(128) NOT NULL
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