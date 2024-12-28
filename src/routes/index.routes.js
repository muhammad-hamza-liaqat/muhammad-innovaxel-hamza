const express = require("express")
const myAppRoutes = express.Router()

const auth = require("../middleware/auth")
const authorization = require("../middleware/authorization")
const publicRoutes = require("./publicRoutes/auth.routes")
const adminMovieRoutes = require("./adminRoutes/adminMovie.routes")
const showTimeRoutes = require("./adminRoutes/showTime.routes")
const reservationRoutes = require("./userRoutes/reservation.routes")
const userRoutes = require("./userRoutes/user.routes")

myAppRoutes.use("/auth", publicRoutes)

myAppRoutes.use(auth)
myAppRoutes.use("/user", userRoutes)
myAppRoutes.use("/user/reservation", reservationRoutes)

myAppRoutes.use(authorization("admin"))
myAppRoutes.use("/show", showTimeRoutes)
myAppRoutes.use("/admin", adminMovieRoutes)

module.exports = myAppRoutes