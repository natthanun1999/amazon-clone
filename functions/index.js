const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")

const paymentRoutes = require("./routers/payment.js")

const app = express()
app.use(cors({origin: true}))
app.use(express.json())

app.get("/", (req, res) => res.status(200).json({message: "Hello World!"}))
app.use("/payment", paymentRoutes)

exports.api = functions.https.onRequest(app)


