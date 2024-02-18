const express = require("express");
require("dotenv").config();
const dbConnect = require("./src/config/dbConnect")
const initRoutes = require("./src/routes")

const app = express()
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