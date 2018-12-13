import jwt from 'jsonwebtoken';

  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
export const authentication = (req, res, next) => {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.status(401)
              .json({ status: 401,
                      message: 'Authentication failed',
              });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403)
                .json({ message: 'Unauthorized Access! You are not allowed to access this page.',
                });
    }
  }

export default Auth;