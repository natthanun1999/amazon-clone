import React from 'react'
import { useStateValue } from '../../store/StateProvider'
import Product from './components/product/Product'
import Subtotal from './components/subtotal/Subtotal'
import './styles/Checkout.css'

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ads"
          className="checkout__ad" />

        <div>
          <h3>Hello, {user?.email || 'Guest'}</h3>
          <h2 className="checkout__title">
            Your shopping Basket
          </h2>

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

      <div className="checkout__right">
        <Subtotal items={basket} />
      </div>
    </div>
  )
}

export default Checkout
