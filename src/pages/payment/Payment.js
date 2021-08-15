import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import axios from '../../services/HttpModule'
import { useStateValue } from '../../store/StateProvider'
import { db } from '../../firebase'
import Product from './components/product/Product'
import './styles/Payment.css'
import Loading from '../../parts/Loading'
import toast from 'react-hot-toast';

function Payment() {
  const history = useHistory()
  const [{basket, user}, dispatch] = useStateValue()

  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)

  const [clientSecret, setClientSecret] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  const price = basket?.reduce((sum, item) => sum + item.price, 0) || 0

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        if (price <= 0) return

        setProcessing(true)
        
        const { data } = await axios.post(`/payment/create?total=${Math.round(price * 100)}`)
        setClientSecret(data?.paymentIntent?.client_secret || null)
      } catch (error) {
        console.error(error.message)
      } finally {
        setProcessing(false)
      }
    }

    getClientSecret()
  }, [basket])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setProcessing(true)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })

      if (paymentIntent) {
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          })

        dispatch({
          type: 'EMPTY_BASKET'
        })

        toast.success('Payment successfully.', {
          position: "top-right"
        })

        setSucceeded(true)
        setError(null)

        history.replace('/orders')
      } else {
        const error = {
          code: 400,
          message: 'Can\'t confirm card payment.'
        }
        
        throw error
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right"
      })
      console.error(error.message)
    } finally {
      setProcessing(false)
    }
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  return (
    <div className="payment">
      {processing && <Loading />}
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length || '0'} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p> {user?.email} </p>
            <p> 123 React Lane </p>
            <p> Los Angeles, CA </p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment__items">
            { basket.map((item, index) => (
              <Product
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating} />
            )) }
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total : {value}</h3>
                  )}
                  decimalScale={ 2 }
                  value={ price }
                  displayType={ 'text' }
                  thousandSeparator={ true }
                  prefix={ '$' }
                />

                <button disabled={processing || disabled || succeeded}>
                    <span>{ processing ? <p>Processing</p> : 'Buy Now' }</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
