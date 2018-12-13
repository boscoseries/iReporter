import db from '../database/database';
import 'babel-polyfill';

import uuidv4 from 'uuid/v4';

<<<<<<< HEAD



=======
>>>>>>> fdfaeead055a6ce4a371f0dd4a57e9a94653cad0
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
<<<<<<< HEAD
					status: 200, data: [
						{
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
						status: 200, data: [
							{
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
=======
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
>>>>>>> fdfaeead055a6ce4a371f0dd4a57e9a94653cad0
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
<<<<<<< HEAD
			if (result.length > 1) {
=======
			if (result.rows.length < 1) {
>>>>>>> fdfaeead055a6ce4a371f0dd4a57e9a94653cad0
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
<<<<<<< HEAD
* Get All Intervention Incident Records
* @param {object} req - request 
* @param {object} res - response
* @returns {object} Array containing all intervention Incidents
*/
=======
 * Get All Intervention Incident Records
 * @param {object} req - request 
 * @param {object} res - response
 * @returns {object} Array containing all intervention Incidents
 */
>>>>>>> fdfaeead055a6ce4a371f0dd4a57e9a94653cad0
export const getAllInterventions = (req, res) => {
	const findAllQuery = `SELECT * FROM INCIDENTS WHERE TYPE = 'intervention'`;
	db.query(findAllQuery)
		.then(result => {
<<<<<<< HEAD
			if (result.length > 1) {
=======
			if (result.rows.length < 1) {
>>>>>>> fdfaeead055a6ce4a371f0dd4a57e9a94653cad0
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
<<<<<<< HEAD

/**
 * Get One Redflag Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} One Redflag incident object
 */
export const getOneRedflag = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'red-flag' AND id = $1`;
	db.query(findOneQuery)
		.then(result => {
			const redFlag = result.rows[0];
			res.status(200).json({
				status: 200,
				data: redFlag,
			})
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
	res.status(404)
		.json({
			status: 404,
			error: "Record Not Found"
		})
}

/**
 * Get One Intervention Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} One intervention incident object
 */
export const getOneIntervention = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'intervention' AND id = $1`;
	db.query(findOneQuery)
		.then(result => {
			const intervention = result.rows[0];
			res.status(200).json({
				status: 200,
				data: intervention
			})
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
	res.status(404)
		.json({
			status: 404,
			error: "Record Not Found"
		})
}
=======
>>>>>>> fdfaeead055a6ce4a371f0dd4a57e9a94653cad0
