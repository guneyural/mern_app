const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');

    if(!token) return res.status(401).json({msg: 'You do not have token'});

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(400).json({msg: 'Invalid token'});
    }
}