const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        console.log(saltRounds);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log("error in hashing the password", error)
        throw new Error("Error hashing password");
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.log("error comparePassword", error)
        throw new Error("Error comparing passwords");
    }
};

module.exports = {
    hashPassword,
    comparePassword,
};
