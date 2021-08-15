import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../firebase'
import Loading from '../../parts/Loading'
import { useStateValue } from '../../store/StateProvider'
import Order from './components/order/Order'
import './styles/Orders.css'

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      if (user) {
        setLoading(true)
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          ))
      } else {
        setOrders([])
      }
    } catch (error) {
      console.error()
    } finally {
      setLoading(false)
    }
  }, [user])

  return (
    <div className="orders">
      { loading && <Loading /> }
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order, index) => (
          <Order
            key={index}
            order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
