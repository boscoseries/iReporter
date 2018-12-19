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
			if (result.length < 1) {
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
			console.log(result)
			if (result.rowCount < 1) {
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


/**
 * Update the Location of one Redflag Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated Red-flag incident Object
 */
export const updateRedflagLocation = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'red-flag' AND id = $1`;
	const updateOneQuery = 'UPDATE incidents SET location = $1 returning *';
	// check if :id is a red-flag record else throw
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				//if yes, update and return required output
				const values = [req.body.location];
				db.query(updateOneQuery, values)
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'updated red-flag record\'s location'
								}]
							});
					});
			}
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
 * Update the Location of one Intervention Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */
export const updateInterventionLocation = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'intervention' AND id = $1`;
	const updateOneQuery = 'UPDATE incidents SET location = $1 returning *';
	// check if :id is an intervention record else throw
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				//if yes, update and return required output
				const values = [req.body.location];
				db.query(updateOneQuery, values)
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'updated intervention record\'s location'
								}]
							});
					});
			}
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
}

/**
 * Update the Comment of one Redflag Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated Red-flag incident Object
 */
export const updateRedflagComment = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'red-flag' AND id = $1`;
	const updateOneQuery = 'UPDATE incidents SET comment = $1 returning *';
	// check if :id is a red-flag record
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				//if yes, update and return required output
				const values = [req.body.location];
				db.query(updateOneQuery, values)
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'updated red-flag record\'s comment'
								}]
							});
					});
			}
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
 * Update the Location of one Intervention Incident Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */
export const updateInterventionComment = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'intervention' AND id = $1`;
	const updateOneQuery = 'UPDATE incidents SET comment = $1 returning *';
	// check if :id is an intervention record
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				// if yes, update and return required output
				const values = [req.body.location];
				db.query(updateOneQuery, values)
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'updated intervention record\'s comment'
								}]
							});
					});
			}
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
}

/**
 * Update the Status of one Redflag Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */

export const updateRedflagStatus = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'red-flag' AND id = $1`;
	const updateOneQuery = 'UPDATE incidents SET status = $1 returning *';
	// check if :id is a red-flag record
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				//if yes, update and return required output
				const values = [req.body.status];
				db.query(updateOneQuery, values)
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'updated red-flag record\'s status'
								}]
							});
					});
			}
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
 * Update the Status of one Intervention Incident
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an updated intervention incident Object
 */
export const updateInterventionStatus = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'intervention' AND id = $1`;
	const updateOneQuery = 'UPDATE incidents SET status = $1 returning *';
	// check if :id is an intervention record
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				// if yes, update and return required output
				const values = [req.body.status];
				db.query(updateOneQuery, values)
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'updated intervention record\'s status'
								}]
							});
					});
			}
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
}

/**
 * Delete one Redflag Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {object} an object with the :id of the deleted incident
 */
export const deleteRedflagRecord = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'red-flag' AND id = $1`;
	const deleteQuery = 'DELETE FROM incidents WHERE id = $1 returning *';
	// check if :id is a red-flag record
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				// if yes, delete the record
				db.query(deleteQuery, [req.params.id])
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'red-flag record has been deleted'
								}]
							});
					});
			}
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
}

/**
 * Delete one Intervention Record
 * @param {object} req - request
 * @param {object} res - response
 * @returns {void} an object with the :id of the deleted incident
 */
export const deleteInterventionRecord = (req, res) => {
	const findOneQuery = `SELECT * FROM incidents WHERE TYPE = 'intervention' AND id = $1`;
	const deleteQuery = 'DELETE FROM incidents WHERE id = $1 returning *';
	// check if :id is a red-flag record
	db.query(findOneQuery, [req.params.id])
		.then(result => {
			if (result.rowCount === 0) {
				res.json({
					status: 404,
					message: 'Record Not Found'
				})
			} else {
				// if yes, delete the record
				db.query(deleteQuery, [req.params.id])
					.then(result => {
						res.status(200)
							.json({
								status: 200, data: [{
									id: result.rows[0].id,
									message: 'red-flag record has been deleted'
								}]
							});
					});
			}
		})
		.catch((err) => {
			res.status(404)
				.json({
					status: 404,
					error: err.message
				})
		});
}