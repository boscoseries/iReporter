const db = require('../database/database');


/**
 * Drop and Create all Tables
 */
const createTables = () => {
	const queryText =	
		`
		DROP TABLE IF EXISTS incidents CASCADE;
		DROP TABLE IF EXISTS users CASCADE;
		CREATE TABLE IF NOT EXISTS users(
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
				);
				
		CREATE TABLE IF NOT EXISTS incidents(
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
			);		
				`;
				
	db.query(queryText)
		.then(res => {
			console.log(`TABLES CREATED in ${process.env.NODE_ENV} environment`);
			//pool.end();
		})
		.catch(err => {
			console.log(err)
			//pool.end();
		});
};

createTables();