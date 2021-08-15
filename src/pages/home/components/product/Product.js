import React from 'react'
import { useStateValue } from '../../../../store/StateProvider'
import './styles/Product.css'
import toast from 'react-hot-toast'
import CloseIcon from '@material-ui/icons/Close'

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue()

  const addToBasket = () => {
    toast((t) => (
      <div className="toast__container">
        <img
          src={image}
          alt="prod-img" />

        <div className="toast__title">
          {title} <br/>
          <h3>${price}</h3>
        </div>

        <div
          className="toast__close"
          onClick={() => toast.dismiss(t.id)}>
          <CloseIcon />
        </div>
      </div>
    ), {
      position: "top-right"
    })
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating
      }
    })
  }

  return (
    <div className="product">
      <div className="product__info">
        <p>{ title }</p>
        <p className="product__price">
          <small>$</small>
          <strong>{ price }</strong>
        </p>
        <div className="product__rating">
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

      <img
        src={ image }
        alt={ title } />

        <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}

export default Product
