import db from '../database/database';
import Helper from '../middlewares/helpers';

import uuidv4 from 'uuid/v4';

/**
 * Create A User
 * @param {object} req 
 * @param {object} res
 * @returns {object} reflection object 
 */
export const createUser = (req, res) => {
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
	id, firstname, lastname, othernames, phone_number, email, username, password, is_admin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
	const values = [
		uuidv4(),
		req.body.firstname,
		req.body.lastname,
		req.body.othernames,
		req.body.phone_number,
		req.body.email,
		req.body.username,
		hashPassword,
		req.body.is_admin
	]

	db.query(createQuery, values)
		.then(result => {
			const token = Helper.generateToken(result.rows[0].id);
			res.status(201)
				.json({
					status: 201,
					data: [{
						token: token,
						user: result.rows[0]
					}]
				});
		})
		.catch(error => res.status(400)
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
export const login = (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({
			status: 400,
			error: 'Email and Password fields are required'
		});
	}
	if (!Helper.isValidEmail(req.body.email)) {
		return res.status(400).json({
			status: 400,
			error: 'Enter a valid email address'
		});
	}
	const loginQuery = 'SELECT * FROM users WHERE email = $1';
	const inputEmail = [req.body.email]
	db.query(loginQuery, inputEmail)
		.then(result => {
			if (!result.rows[0]) {
				return res.status(400).json({
					status: 400,
					error: 'Email is Incorrect'
				});
			}
			if (!Helper.comparePassword(result.rows[0].password, req.body.password)) {
				res.status(400).json({
					status: 400,
					error: 'Password is incorrect'
				});
			}
			const token = Helper.generateToken(result.rows[0].id);
			return res.status(200).json({
				status: 200,
				data: [{
					token: token,
					user: result.rows[0]
				}]
			});
		})
		.catch(error => {
			res.status(400).json({
				status: 400,
				error: error.message
			})
		})
};


export const getAll = (req, res) => {
	const getQuery = 'SELECT * FROM users';
	db.query(getQuery)
		.then(result => {
			if (!result.rows[0]) {
				res.status(400).json({
					status: 400,
					error: 'No Users Found'
				});
			} else {
				res.status(200).json({
					status: 200,
					data: result.rows
				});
			}
		})
		.catch(error => {
			res.status(400).json({
				status: 400,
				error: error.message
			})
		})
};

export const deleteUser = (req, res) => {
	const updateOneQuery = `DELETE FROM users WHERE EMAIL = $1 returning *`;
	const values = [req.body.email];
	db.query(updateOneQuery, values)
		.then(result => {
			res.status(200)
				.json({
					status: 200, data: [{
						email: result.rows[0].email,
						message: 'User record has been deleted'
						}]
				});
		})
		.catch((err) => {
			console.log(err)
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};