import db from '../database/database';
import Helper from '../middlewares/helpers';

import uuidv4 from 'uuid/v4';

/**
 * Create A User
 * @param {object} req 
 * @param {object} res
 * @returns {object} reflection object 
 */
export const create = (req, res) => {
	const hashPassword = Helper.hashPassword(req.body.password);

	if (!req.body.email || !req.body.password) {
		res.status(400)
			.json({
				status: 400,
				error: 'Email and pasword fields are required'
			})
	}
	if (!Helper.isValidEmail(req.body.email)) {
		res.status(400)
			.json({
				status: 400,
				error: 'Email is invalid'
			})
	}

	const createQuery = `INSERT INTO users(
	id, firstname, lastname, othernames, phone_number, email, username, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
	const values = [
		uuidv4(),
		req.body.firstname,
		req.body.lastname,
		req.body.othernames,
		req.body.phone_number,
		req.body.email,
		req.body.username,
		hashPassword
	]

	db.query(createQuery, values)
		.then(result => {
			const token = Helper.generateToken(result.rows[0].id);
			res.status(201)
			.json({
				status: 201, data: [{
					token: {token},
					user: result.rows[0]
				}]
			});
		})
		.catch(error => res.status(404)
			.json({
				status: 400,
				error: error.message
			})
		);
};

/**
 * Login
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} user object 
 */
// export const login = (req, res) => {
// 	if (!req.body.email || !req.body.password) {
// 		return res.status(400).send({ 'message': 'Some values are missing' });
// 	}
// 	if (!Helper.isValidEmail(req.body.email)) {
// 		return res.status(400).send({ 'message': 'Please enter a valid email address' });
// 	}
// 	const loginQuery = 'SELECT * FROM users WHERE email = $1';
// 	db.query(text, [req.body.email])
// 		.then(result => {
// 			res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
// 			if (!Helper.comparePassword(rows[0].password, req.body.password)) {
// 				return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
// 			}
// 			const token = Helper.generateToken(rows[0].id);
// 			return res.status(200).send({ token });
// 		})
// 		.catch(err => {
// 			res.status(400).send(error)
// 		})
// };