import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
	console.log("connected to the database");
});

/**
 * Create Tables
 */
const createTables = () => {
	const queryText =
		`CREATE TABLE IF NOT EXISTS incidents(
			id SERIAL PRIMARY KEY,
			created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			created_by INTEGER,
			type VARCHAR(128) NOT NULL,
			location VARCHAR(128) NOT NULL,
			status VARCHAR(128) DEFAULT 'draft',
			Images BYTEA,
			Videos BYTEA,
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
const dropTables = () => {
	const queryText = "DROP TABLE IF EXISTS incidents";
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

pool.on("remove", () => {
	console.log("client removed");
	process.exit(0);
});

module.exports = {
	createTables,
	dropTables
};

require("make-runnable");