require("dotenv").config();
require("./config/connection.mongoose")

const express = require("express");

const requestLogger = require("./middleware/requestLogger")
const myAppRoutes = require("./routes/index.routes")

const app = express();

app.use(requestLogger)
app.use(express.json())
app.use("/api", myAppRoutes)

app.listen(process.env.PORT, () => {
    console.warn(`server is running at http://localhost:${process.env.PORT}/`)
})