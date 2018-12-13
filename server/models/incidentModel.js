const { Pool } = require('pg');
const dotenv = require('dotenv').config();







const pool = new Pool({
	connectionString: process.env.DATABASE_URL
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
			created_by UUID NOT NULL,
			type VARCHAR(128) NOT NULL,
			location VARCHAR(128) NOT NULL,
			status VARCHAR(128) DEFAULT 'draft',
			Images VARCHAR(128),
			Videos VARCHAR(128),
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

//require('make-runnable');