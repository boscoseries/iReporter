import db from '../database/database';
import 'babel-polyfill';


const Incident = {
	/**
   * Create An Incident
   * @param {object} req 
   * @param {object} res
   * @returns {object} A Red-flag or Intervention object 
   */
	create(req, res) {
		const text = `INSERT INTO
      incidents(created_by, type, location, status, images, videos, comment)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
		const values = [
			req.body.created_by,
			req.body.type,
			req.body.location,
			req.body.status,
			req.body.images,
			req.body.videos,
			req.body.comment
		];
		if (req.route.path === '/red-flags' && req.body.type === 'red-flag') {
			db.query(text, values)
				.then(result => {
					res.status(200).json({
						status: 200, data: [
							{
								id: result.rows[0].id,
								message: 'created red-flag record'
							}]
					});
				})
				.catch(err => res.status(500).json({ status: 500, error: err.message }));
		} else if (req.route.path === '/interventions' && req.body.type === 'intervention') {
			db.query(text, values)
				.then(result => {
					res.status(200).json({
						status: 200, data: [
							{
								id: result.rows[0].id,
								message: 'created intervention record'
							}]
					});
				})
				.catch(err => res.status(500).json({ status: 500, error: err.message }));
		} else {
			res.status(404)
				.json({
					status: 400,
					error: 'Please insert correct type'
				});
		}
	},

	/**
   * Get All Incident records
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Array containing Incidents of a particular type
   */
	getAll(req, res) {
		const findAllQuery = 'SELECT * FROM incidents';
		if (req.route.path === '/red-flags') {
			db.query(findAllQuery)
				.then(result => {
					const redFlags = result.rows.filter(row => row.type === 'red-flag');
					res.status(200).json({ status: 200, data: redFlags });
				})
				.catch(err => res.status(500).json({ status: 500, error: err.message }));
		}
		if (req.route.path === '/interventions') {
			db.query(findAllQuery)
				.then(result => {
					const interventions = result.rows.filter(row => row.type === 'intervention');
					res.json({
						status: 200,
						data: interventions,
					});
				})
				.catch(err => res.json(err));
		}
	},
	/**
   * Get An Incident Record
   * @param {object} req 
   * @param {object} res
   * @returns {object} One RedFlag or Intervention object
   */
	getOne(req, res) {
		const findOneQuery = 'SELECT * FROM incidents WHERE id = $1';
		if (req.route.path === '/red-flags/:id') {
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const redFlag = result.rows.filter(row => row.type === 'red-flag');
					if (!redFlag.length) {
						res.json({ status: 404, error: 'Red-flag Record not found' })
					} else {
						res.status(200).json({ status: 200, data: redFlag });
					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		} else if
		(req.route.path === '/interventions/:id') {
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const intervention = result.rows.filter(row => row.type === 'intervention');
					if (!intervention.length) {
						res.json({ status: 404, error: 'Intervention Record not found' })
					} else {
						res.status(200).json({ status: 200, data: intervention });
					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		} else {
			res.status(404)
				.json({
					status: 400,
					error: 'Please insert correct type',
				});
		}
	},
  /**
   * Update Location and Comment of An Incident Record
   * @param {object} req 
   * @param {object} res 
   * @returns {object} an updated Red-flag or Intervention Object
   */
	update(req, res) {
		const findOneQuery = 'SELECT * FROM incidents WHERE id = $1';
		const updateOneQuery = 'UPDATE incidents SET location = $1 returning *';
		if (req.route.path === '/red-flags/:id/location')
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const redFlag = result.rows.filter(row => row.type === 'red-flag')
					if (!redFlag.length) {
						res.json({ error: 404, message: 'Red-flag record not found' });
					} else {
						const values = [req.body.location];
						db.query(updateOneQuery, values)
							.then(result => {
								res.status(200)
									.json({
										status: 200, data: [{
											message: 'updated red-flag record\'s location'
										}]
									});
							});
					}
				})
		else if (req.route.path === '/red-flags/:id/comment')
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const redFlag = result.rows.filter(row => row.type === 'red-flag');
					if (!redFlag.length) {
						res.json({ error: 404, message: 'Red-flag record not found' });
					} else {
						const values = [req.body.comment];
						db.query(updateOneQuery, values)
							.then(result => {
								res.status(200)
									.json({
										status: 200, data: [{
											message: 'updated red-flag record\'s comment'
										}]
									});
							});
					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		else if (req.route.path === '/interventions/:id/location') {
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const intervention = result.rows.filter(row => row.type === intervention);
					if (!intervention.length) {
						res.json({ error: 404, message: 'Intervention record not found' })
					}
					else {
						const values = [req.body.location];
						db.query(updateOneQuery, values)
							.then(result => {
								res.status(400).json({
									status: 200, data: [{ message: 'updated intervention record\'s location' }]
								});
							});
					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		} else if (req.route.path === '/interventions/:id/comment') {
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const intervention = result.rows.filter(row => row.type === intervention);
					if (!intervention.length) {
						res.json({ error: 404, message: 'Intervention record not found' })
					}
					else {
						const values = [req.body.location];
						db.query(updateOneQuery, values)
							.then(result => {
								res.status(400).json({ status: 200, data: [{ message: 'updated intervention record\'s comment' }] })
							});

					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		} else {
			res.status(404)
				.json({
					status: 400,
					error: 'Please insert correct type',
				});
		}
	},
	/**
   * Delete An Incident
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
	delete(req, res) {
		const findOneQuery = 'SELECT * FROM incidents WHERE id = $1';
		const deleteQuery = 'DELETE FROM incidents WHERE id = $1 returning *';
		if (req.route.path === '/red-flags/:id') {
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const redFlag = result.rows.filter(row => row.type === 'red-flag');
					if (!redFlag.length) {
						res.json({ status: 404, error: 'Red-flag Record not found' });
					} else {
						db.query(deleteQuery, [req.params.id])
							.then(result => {
								res.status(400).json({
									status: 200, data: [{ message: 'Red-flag record has bbeen deleted' }]
								});
							});
					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		} else if (req.route.path === '/interventions/:id') {
			db.query(findOneQuery, [req.params.id])
				.then(result => {
					const intervention = result.rows.filter(row => row.type === 'intervention');
					if (!intervention.length) {
						res.json({ status: 404, error: 'intervention Record not found' })
					} else {
						db.query(deleteQuery, [req.params.id])
							.then(result => {
								res.status(400).json({ status: 200, data: [{ message: 'Intervention record has bbeen deleted' }] });
							})
							.catch(err => res.status(400).json({ status: 500, error: err.message }));
					}
				})
				.catch(err => res.status(400).json({ status: 500, error: err.message }))
		}
	}
};

export default Incident;