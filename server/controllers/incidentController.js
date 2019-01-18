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
      INCIDENTS (created_by, type, location, images, videos, comment)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
	const values = [
		//uuidv4(),
		req.body.created_by,
		req.body.type,
		req.body.location,
		req.body.images,
		req.body.videos,
		req.body.comment
	];
	if (req.route.path === '/red-flags' && req.body.type === 'red-flag') {
		db.query(createQuery, values)
			.then(result => {
				return res.status(201).json({
					status: 201, data: [
						{
							id: result.rows[0].id,
							message: 'Created red-flag record'
						}]
				}
				);
			})
			.catch((err) => {
				return res.status(400)
				.json({
					status: 400,
					error: err.message
				})
			});
	} else
		if (req.route.path === '/interventions' && req.body.type === 'intervention') {
			db.query(createQuery, values)
				.then(result => {
					return res.status(201).json({
						status: 201, 
						data: [{
								id: result.rows[0].id,
								message: 'Created intervention record'
							}]
					});
				})
				.catch((err) => {
					res.status(400)
					.json({
						status: 400,
						error: err.message
					})
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
			if (!result.rowCount) {
				return res.status(404).json({
					status: 404, 
					error: 'No Redflag records found'});
			} else {
				return res.status(200).json({
					status: 200,
					data: result.rows
				});
			}
		})
		.catch((err) => {
			return res.status(404)
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
		if (!result.rowCount) {
			return res.status(404).json({
				status: 404, 
				error: 'No Intervention records found'
			});
		} else {
			return res.status(200).json({
				status: 200,
				data: result.rows
			});
		}
	})
	.catch((err) => {
		return res.status(404)
			.json({
				status: 404,
				error: err.message
			})
	});
};

/**
 * Get One Redflag Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} One Redflag incident object
 */
export const getOneRedflag = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'red-flag' AND id = $1`;
	const userId = [req.params.id]
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (!result.rowCount) {
				return res.status(404)
				.json({
					status: 404,
					error: `No record available for user with id ${userId}`
				})
			} else {
				return res.status(200)
				 .json({
				status: 200,
				data: result.rows[0]
				})
			}
		})
		.catch((err) => {
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Get One Intervention Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} One intervention incident object
 */
export const getOneIntervention = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'intervention' AND id = $1`;
	const userId = [req.params.id]
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (!result.rowCount) {
				return res.status(404)
				.json({
					status: 404,
					error: `No record available for user with id ${userId}`
				})
			} else {
				return res.status(200)
				 .json({
				status: 200,
				data: result.rows[0]
			})
		}
		})
		.catch((err) => {
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};


/**
 * Update the Location of one Redflag Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated Red-flag incident Object
 */
export const updateRedflagLocation = (req, res) => {
	const updateOneQuery = `UPDATE incidents SET location = $1 WHERE id = $2 AND TYPE = $3 returning *`;
				const values = [req.body.location, req.params.id, 'red-flag'];
				db.query(updateOneQuery, values)
					.then(result => {
						return res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									new_location: result.rows[0].location,
									message: 'Updated red-flag record\'s location'
								}]
							});
					})
		.catch((err) => {
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Update the Location of one Intervention Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */
export const updateInterventionLocation = (req, res) => {
	const updateOneQuery = `UPDATE incidents SET location = $1 WHERE id = $2 AND TYPE = $3 returning *`;
				const values = [req.body.location, req.params.id, 'intervention'];
				db.query(updateOneQuery, values)
					.then(result => {
						return res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									new_location: result.rows[0].location,
									message: 'Updated intervention record\'s location'
								}]
							});
					})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Update the Comment of one Redflag Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated Red-flag incident Object
 */

export const updateRedflagComment = (req, res) => {
	const updateOneQuery = `UPDATE incidents SET comment = $1 WHERE id = $2 AND TYPE = $3 returning *`;
				const values = [req.body.comment, req.params.id, 'red-flag'];
				db.query(updateOneQuery, values)
					.then(result => {
						return res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									new_comment: result.rows[0].comment,
									message: 'Updated red-flag record\'s comment'
								}]
							});
					})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Update the Comment of one Intervention Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */

export const updateInterventionComment = (req, res) => {
	const updateOneQuery = `UPDATE incidents SET comment = $1 WHERE id = $2 AND TYPE = $3 returning *`;
	const values = [req.body.comment, req.params.id, 'intervention'];
	db.query(updateOneQuery, values)
		.then(result => {
			return res.status(200)
				.json({
					status: 200, data: [{
						id: result.rows[0].id,
						new_comment: result.rows[0].comment,
						message: 'updated intervention record\'s comment'
					}]
				});
		})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Update the Status of one Redflag Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */

export const updateRedflagStatus = (req, res) => {
	const updateOneQuery = `UPDATE incidents SET status = $1 WHERE id = $2 AND TYPE = $3 returning *`;
				const values = [req.body.status, req.params.id, 'red-flag'];
				db.query(updateOneQuery, values)
					.then(result => {
						return res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									new_status: result.rows[0].status,
									message: 'Updated red-flag record\'s status'
								}]
							});
					})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Update the Status of one Intervention Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */
export const updateInterventionStatus = (req, res) => {
	const updateOneQuery = `UPDATE incidents SET status = $1 WHERE id = $2 AND TYPE = $3 returning *`;
	const values = [req.body.status, req.params.id, 'intervention'];
	db.query(updateOneQuery, values)
		.then(result => {
			return res.status(200)
				.json({
					status: 200, data: [{
						id: result.rows[0].id,
						new_status: result.rows[0].status,
						message: 'updated intervention record\'s status'
					}]
				});
		})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Delete one Redflag Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an object with the :id of the deleted incident
 */

export const deleteRedflagRecord = (req, res) => {
	const updateOneQuery = `DELETE FROM incidents WHERE id = $1 AND TYPE = $2 returning *`;
	const values = [req.params.id, 'red-flag'];
	db.query(updateOneQuery, values)
		.then(result => {
			return res.status(200)
				.json({
					status: 200, data: [{
						id: result.rows[0].id,
						message: 'red-flag record has been deleted'
						}]
				});
		})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};

/**
 * Delete one Intervention Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {void} an object with the :id of the deleted incident
 */
export const deleteInterventionRecord = (req, res) => {
	const updateOneQuery = `DELETE FROM incidents WHERE id = $1 AND TYPE = $2 returning *`;
	const values = [req.params.id, 'intervention'];
	db.query(updateOneQuery, values)
		.then(result => {
			return res.status(200)
				.json({
					status: 200, data: [{
						id: result.rows[0].id,
						message: 'Intervention record has been deleted'
						}]
				});
		})
		.catch((err) => {
			console.log(err)
			return res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
};