const express = require("express");
const userRoutes = express.Router()

const { validationCatches, catchAsyncErrors } = require("../../utils/tryCatch")
const userController = require("../../controller/user.controller");
const { showTimeValidation } = require("../../utils/validations.yup");

userRoutes.get("/movies", catchAsyncErrors(userController.getAllMovies))
userRoutes.get("/my-reservation", catchAsyncErrors(userController.viewMyReservations))
userRoutes.get("/show-time", validationCatches(showTimeValidation), catchAsyncErrors(userController.viewShowTime))

module.exports = userRoutes