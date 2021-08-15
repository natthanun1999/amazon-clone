import React from 'react'
import './styles/Product.css'

function Product({ id, title, image, price, rating }) {
  return (
    <div className="payment__product">
      <img
        src={ image }
        alt={ title } />

      <div className="payment__product__info">
        <p>{ title }</p>

        <p className="payment__product__price">
          <small>$</small>
          <strong>{ price }</strong>
        </p>

        <div className="payment__product__rating">
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
      </div>
    </div>
  )
}

export default Product
