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

module.exports = {
	/**
	 * DB Query
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} object 
	 */
	query(text, params) {
		return new Promise((resolve, reject) => {
			pool.query(text, params)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
};