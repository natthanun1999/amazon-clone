import React from 'react'
import Loader from 'react-loader-spinner'
import './styles/Loading.css'

function Loading() {
  return (
    <div className="loader__container">
      <Loader
        className="loader"
        type="ThreeDots"
        color="#f7c750"
        height={100}
        width={100} />
    </div>
  )
}

export default Loading
