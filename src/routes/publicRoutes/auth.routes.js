const express = require("express")
const authRoutes = express.Router()

const { validationCatches, catchAsyncErrors } = require("../../utils/tryCatch")
const { signUpValidation, loginUserValidation } = require("../../utils/validations.yup")
const authController = require("../../controller/auth.controller")

authRoutes.post("/sign-up", validationCatches(signUpValidation), catchAsyncErrors(authController.userSignUp))
authRoutes.post("/login", validationCatches(loginUserValidation), catchAsyncErrors(authController.loginUser))

module.exports = authRoutes