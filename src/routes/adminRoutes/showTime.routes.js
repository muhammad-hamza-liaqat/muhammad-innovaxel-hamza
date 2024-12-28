const express = require("express")
const showTimeRoutes = express.Router()

const { validationCatches, catchAsyncErrors } = require("../../utils/tryCatch")
const { addShowtimeValidation } = require("../../utils/validations.yup")
const showTimeController = require("../../controller/showTime.controller")

showTimeRoutes.post("/add", validationCatches(addShowtimeValidation), catchAsyncErrors(showTimeController.addShowTime))

module.exports = showTimeRoutes