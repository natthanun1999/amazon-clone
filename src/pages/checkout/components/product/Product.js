import React from 'react'
import { useStateValue } from '../../../../store/StateProvider'
import './styles/Product.css'

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue()
  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id
    })
  }
  return (
    <div className="checkout__product">
      <img
        src={ image }
        alt={ title } />

      <div className="checkout__product__info">
        <p>{ title }</p>

        <p className="checkout__product__price">
          <small>$</small>
          <strong>{ price }</strong>
        </p>

        <div className="checkout__product__rating">
          { Array(rating)
            .fill()
            .map((_, i) => (
            <p key={i}>★</p>
          )) }
          
          { Array(5 - rating)
            .fill()
            .map((_, i) => (
            <p key={i}>☆</p>
          )) }
        </div>

        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  )
}

export default Product
