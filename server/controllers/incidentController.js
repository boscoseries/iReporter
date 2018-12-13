import db from '../database/database';
import 'babel-polyfill';

import uuidv4 from 'uuid/v4';




/**
 * Create An Incident Record
 * @param {object} req - request
 * @param {object} res -response
 * @returns {object} A Red-flag or Intervention object 
 */
export const create = (req, res) => {
	const createQuery = `INSERT INTO
      incidents(id, created_by, type, location, status, images, videos, comment)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
	const values = [
		uuidv4(),
		req.body.created_by,
		req.body.type,
		req.body.status,
		req.body.location,
		req.body.images,
		req.body.videos,
		req.body.comment
	];
	if (req.route.path === '/red-flags' && req.body.type === 'red-flag') {
		db.query(createQuery, values)
			.then(result => {
				res.status(200).json({
					status: 200,
					data: [{
						id: result.rows[0].id,
						message: 'created red-flag record'
					}]
				});
			})
			.catch(err => res.status(404)
				.json({
					status: 404,
					error: err.message
				})
			);
	} else
	if (req.route.path === '/interventions' && req.body.type === 'intervention') {
		db.query(createQuery, values)
			.then(result => {
				res.status(200).json({
					status: 200,
					data: [{
						id: result.rows[0].id,
						message: 'created intervention record'
					}]
				});
			})
			.catch(err => res.status(404)
				.json({
					status: 404,
					error: err.message
				})
			);
	} else {
		res.status(404)
			.json({
				status: 400,
				error: 'Invalid Request'
			});
	}
};

/**
 * Get All Redflag Incident Records
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} Array containing all red-flag Incidents
 */
export const getAllRedflags = (req, res) => {
	const findAllQuery = `SELECT * FROM INCIDENTS WHERE TYPE = 'red-flag'`;
	db.query(findAllQuery)
		.then(result => {
			if (result.rows.length < 1) {
				res.status(404).json({
					status: 404,
					error: 'No Record Found'
				})
			} else
				res.status(200).json({
					status: 200,
					data: result.rows
				});
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};


/**
 * Get All Intervention Incident Records
 * @param {object} req - request 
 * @param {object} res - response
 * @returns {object} Array containing all intervention Incidents
 */
export const getAllInterventions = (req, res) => {
	const findAllQuery = `SELECT * FROM INCIDENTS WHERE TYPE = 'intervention'`;
	db.query(findAllQuery)
		.then(result => {
			if (result.rows.length < 1) {
				res.status(404).json({
					status: 404,
					error: 'No Record Found'
				})
			} else
				res.status(200).json({
					status: 200,
					data: result.rows
				});
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};
