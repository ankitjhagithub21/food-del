const User = require('../models/user');

const isAdmin = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error("User not found");
            return false;
        }
        if(!user.isAdmin){
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = isAdmin;
