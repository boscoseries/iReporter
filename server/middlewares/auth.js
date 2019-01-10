import jwt from 'jsonwebtoken';
import db from '../database/database';

// import env from 'dotenv';

// env.config();

  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
export const authentication = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Access Token is required',
      });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            status: 401,
            error: 'Authentication failed',
          });
        }
        if (decoded) {
        next();
        }
        
      });
     }
  }

export const adminAuthentication = (req, res, next) => {
  const loginQuery = `SELECT * FROM users WHERE is_admin = 'true'`;
	db.query(loginQuery)
		.then(result => {
			if (!result.rows[0]) {
				return res.status(401).json({ 
					status: 401,
					error: 'You are not allowed to access the route'
				});
      } 
      else next();
    })
    .catch(error => res.status(400)
			.json({
				status: 400,
				error: error.message
			})
		);
  };