import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom'
import './styles/Subtotal.css'

function Subtotal({ items }) {
  const history = useHistory()
  const price = items.reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({ items?.length || '0' } items) :
              <strong> { value } </strong>
            </p>
          </>
        )}
        decimalScale={ 2 }
        value={ price }
        displayType={ 'text' }
        thousandSeparator={ true }
        prefix={ '$' }
      />

      <small className="subtotal__gift">
        <input type="checkbox" />
        This order contains a gift
      </small>

      <button
        onClick={e => history.push('/payment')}
        disabled={!items.length}>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Subtotal
