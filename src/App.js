import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Header from './parts/Header'
import Home from './pages/home/Home'
import Checkout from './pages/checkout/Checkout'
import Payment from './pages/payment/Payment'
import Login from './pages/login/Login'
import { auth } from './firebase'
import { useStateValue } from './store/StateProvider'
import Orders from './pages/order/Orders'
import { Toaster } from 'react-hot-toast';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          user
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div>
        <Toaster />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
