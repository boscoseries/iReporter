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
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Access Token is required',
      });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          console.log(error)
          return res.status(401).json({
            status: 401,
            error: 'Authentication failed',
          });
        } else {
          const decodedId = decoded.user.id;
          const userId = req.params.id || req.params.created_by;
          if (decodedId !== userId) {
            return res.status(401).json({
              status: 401,
              error: 'id do not match'
            })
          }
        }   
        return next();
      });
     };
  };

export const adminAuthentication = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (decoded.username === jsevries) 
    return next();
    else {
      return res.status(401)
               .json({
        status: 401,
        error: 'You are not allowed to assess this route'
    });
  };
});
};