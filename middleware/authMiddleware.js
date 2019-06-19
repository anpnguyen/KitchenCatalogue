const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token is present, please loging first' });
  }

try {
    const decoded = jwt.verify(token, 
      // config.get('jwtSecret')
      process.env.JWTSECRET
    );
    
    req.user = decoded.user;
    // console.log(req.user)
    next();
    } catch (err) {
    res.status(401).json({ msg: 'Token is not valid, please login first' });
    }
};

module.exports = authMiddleware