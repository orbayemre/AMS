const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // callback fonksiyonları promise yapısına çeviriyor.

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];

    if (!token) {
        return res.status(401).json({ status: "Unauthorized" , message: 'Token not provided' });
    }

    try {
        const decoded = await promisify(jwt.verify)(token,  process.env.JWT_SECRET);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTimestamp) {
            return res.status(401).json({ status: "Unauthorized", message: 'Token has expired' });
        }
        
        req._id = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json({ status: "Unauthorized" , message: 'Invalid token' });
    }
};

module.exports = verifyToken;