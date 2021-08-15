require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const createPayment = async (req, res) => {
  const total = req.query?.total || 0

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd"
    })
    res.status(201).json({ paymentIntent })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createPayment
}