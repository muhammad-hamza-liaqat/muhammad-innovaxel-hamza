const express = require("express");
const revenueRoutes = express.Router();

const { catchAsyncErrors } = require("../../utils/tryCatch")
const revenueController = require("../../controller/revenue.controller")

revenueRoutes.get("/total-revenue", catchAsyncErrors(revenueController.getTotalRevenue))
revenueRoutes.get("/top-movies", catchAsyncErrors(revenueController.getTopMovieByTickets))

module.exports = revenueRoutes