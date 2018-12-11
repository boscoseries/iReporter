import db from '../database/database';
import 'babel-polyfill';


const Incident = {
	
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
	}
};

export default Incident;