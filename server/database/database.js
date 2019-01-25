const { Pool } = require('pg');
const env = require('dotenv').config();

let connectionString;
let ssl;

switch (process.env.NODE_ENV) {
  case 'Production':
		connectionString=process.env.PROD_DATABASE_URL
		ssl=true
    break;
  case 'Development':
		connectionString=process.env.DEV_DATABASE_URL
		ssl=false
		break;
	case 'Test':
		connectionString=process.env.TEST_DATABASE_URL
		ssl=false
		break;
	default:
    throw new Error('Specify a valid process.env.NODE_ENV');
}
console.log(`connected in ${process.env.NODE_ENV} environment`);

const pool = new Pool({
	connectionString,
	ssl,
});

// pool.on('connect', () => {
// 	console.log('connected to the database');
// });

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
