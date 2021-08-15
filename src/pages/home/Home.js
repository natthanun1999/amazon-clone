import React from 'react'
import './styles/Home.css'
import Product from './components/product/Product'

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="hero_img" />

        <div className="home__row">
          <Product
            id="12345678"
            title="The lean startup"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5} />
          <Product
            id="35038503"
            title="The lean startup"
            price={19.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={4} />
        </div>

        <div className="home__row">
          <Product
            id="15039450"
            title="The lean startup"
            price={39.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={2} />
          <Product
            id="59301293"
            title="The lean startup"
            price={40.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={3} />
          <Product
            id="54315420"
            title="The lean startup"
            price={9.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={0} />
        </div>

        <div className="home__row">
          <Product
            id="45920348"
            title="The lean startup"
            price={10.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={1} />
        </div>
      </div>
    </div>
  )
}

export default Home
