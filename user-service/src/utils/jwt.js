const jwt = require('jsonwebtoken');

function generateToken({_id, email, userId, role}) {
    const payload = {
        _id:_id,
        email:email,
        userId:userId,
        role:role
    };
    const secretKey = process.env.JWT_SECRET; 
    const options = {
        expiresIn: '1h' // Token expiration time
    };

    return jwt.sign(payload, secretKey, options);
}

module.exports = generateToken;