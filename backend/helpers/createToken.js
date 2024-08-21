const jwt = require('jsonwebtoken');

const createToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

    } catch (error) {
        console.log(error);
        
    }
};

module.exports = createToken;
