const express = require("express")
const myAppRoutes = express.Router()

const publicRoutes = require("./publicRoutes/auth.routes")

myAppRoutes.use("/auth", publicRoutes)

module.exports = myAppRoutes