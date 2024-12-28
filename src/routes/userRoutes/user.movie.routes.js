const express = require("express");
const userRoutes = express.Router()

const { validationCatches, catchAsyncErrors } = require("../../utils/tryCatch")
const userController = require("../../controller/user.controller")

userRoutes.get("/movies", catchAsyncErrors(userController.getAllMovies))

module.exports = userRoutes