import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import Basket from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../store/StateProvider';
import { auth } from '../firebase';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue()
  const handleAuth = () => {
    if (user) {
      auth.signOut()
    }
  }

  return (
    <div className='header'>
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="aws-logo" />
      </Link>

        <div className="header__search">
          <input
            className="header__searchInput"
            type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <Link to={!user && '/login'}>
            <div
              className="header__option"
              onClick={handleAuth}>
              <span className="header__optionTop">
                Hello { user?.email || 'Guest' }
              </span>
              <span className="header__optionBottom">
                { user ? 'Sign out' : 'Sign in' }
              </span>
            </div>
          </Link>
          <Link to={user && '/orders'}>
            <div className="header__option">
              <span className="header__optionTop">
                Returns
              </span>
              <span className="header__optionBottom">
                & Orders
              </span>
            </div>
          </Link>
          <div className="header__option">
            <span className="header__optionTop">
              Your
            </span>
            <span className="header__optionBottom">
              Prime
            </span>
          </div>
          <Link to="/checkout">
            <div className="header__optionBasket">
              <Basket />
              <span className="header__optionBottom header__basketCount">{ basket?.length || '0' }</span>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default Header
