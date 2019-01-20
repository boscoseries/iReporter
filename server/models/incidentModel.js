const db = require('../database/database');

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
 * Drop Tables
 */
const dropIncidentTable = () => {
	const queryText = 'DROP TABLE IF EXISTS incidents';
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
	createIncidentTable,
	dropIncidentTable
};

require('make-runnable');