const express = require("express")
const reservationRoutes = express.Router()

const { validationCatches, catchAsyncErrors } = require("../../utils/tryCatch")
const reservationController = require("../../controller/reservation.controller")
const { reservationValidation } = require("../../utils/validations.yup")

reservationRoutes.post("/purchase-ticket", validationCatches(reservationValidation), catchAsyncErrors(reservationController.makeReservation))

module.exports = reservationRoutes
