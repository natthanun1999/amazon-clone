const express = require("express")
const { createPayment } = require("../controllers/payment")

const route = express.Router()

route.get("/", (req, res) => res.status(200).json({ message: "Hello Payment" }))
route.post("/create", createPayment)

module.exports = route

