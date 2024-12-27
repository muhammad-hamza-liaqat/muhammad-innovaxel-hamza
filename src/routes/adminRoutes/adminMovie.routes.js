const express = require("express")
const adminMovieRoutes = express.Router()
const { validationCatches, catchAsyncErrors } = require("../../utils/tryCatch")
const adminController = require("../../controller/admin.movie.controller")
const { addMovieValidation } = require("../../utils/validations.yup")

adminMovieRoutes.post("/add-movie", validationCatches(addMovieValidation), catchAsyncErrors(adminController.addMovie))
adminMovieRoutes.delete("/delete-movie/:id", catchAsyncErrors(adminController.deleteMovie))
adminMovieRoutes.patch("/edit-movie/:id", catchAsyncErrors(adminController.updateMovie))


module.exports = adminMovieRoutes