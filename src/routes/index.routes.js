const express = require("express")
const myAppRoutes = express.Router()

const auth = require("../middleware/auth")
const authorization = require("../middleware/authorization")
const publicRoutes = require("./publicRoutes/auth.routes")
const adminMovieRoutes = require("./adminRoutes/adminMovie.routes")
const showTimeRoutes = require("./userRoutes/showTime.routes")

myAppRoutes.use("/auth", publicRoutes)
myAppRoutes.use(auth)
myAppRoutes.use("/show", showTimeRoutes)
myAppRoutes.use(authorization("admin"))
myAppRoutes.use("/admin", adminMovieRoutes)

module.exports = myAppRoutes