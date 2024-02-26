const express = require("express");
require("dotenv").config();
const dbConnect = require("./src/config/dbConnect")
const initRoutes = require("./src/routes")
const cookies = require("cookie-parser");
const cors = require("cors")

const app = express()
app.use(cors())

app.use(cookies())
const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({extended : true}))

dbConnect()
initRoutes(app)

app.use("/", (req,res) => {
    res.send("server on")
})

app.listen(port, () => {
    console.log("server running on the port " + port)
})