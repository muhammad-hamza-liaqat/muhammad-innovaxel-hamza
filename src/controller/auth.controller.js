const statusCodes = require("http-status-codes")
const { HTTPError, HTTPResponse } = require("../utils/response")
const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");

const userSignUp = async (req, res) => {
    let response, error;
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        error = new HTTPError("user already exist. try login", statusCodes.BAD_REQUEST)
        return res.status(statusCodes.BAD_REQUEST).json(error)
    }
    const hashedPassword = await hashPassword(password)
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    const sanitizedUser = {
        id: newUser?._id,
        name: newUser?.name,
        email: newUser?.email
    }
    response = new HTTPResponse("user created successfully", sanitizedUser)
    return res.status(statusCodes.CREATED).json(response)
}

const loginUser = async (req, res) => {
    let error, response;
    const { email, password } = req.body;
    const isUserValid = await User.findOne({ email })
    if (!isUserValid) {
        error = new HTTPError("invalid email or password", statusCodes.CONFLICT)
        return res.status(statusCodes.CONFLICT).json(error)
    }
    const checkPassword = await comparePassword(password, isUserValid.password)
    if (!checkPassword) {
        error = new HTTPError("invalid email or password 2", statusCodes.CONFLICT)
        return res.status(statusCodes.CONFLICT).json(error)
    }
    response = new HTTPResponse("user login successfully!", statusCodes.OK)
    return res.status(statusCodes.OK).json(response)
}

module.exports = {
    userSignUp,
    loginUser
}