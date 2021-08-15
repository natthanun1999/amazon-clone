import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import './styles/Login.css'
import toast from 'react-hot-toast';
import Loading from '../../parts/Loading';

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await auth.signInWithEmailAndPassword(email, password)

      if (response) {
        toast.success('Welcome to Amazon Clone.', {
          position: "top-center"
        })
        history.push('/')
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center"
      })
      console.error('Login', error.message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await auth.createUserWithEmailAndPassword(email, password)

      if (response) {
        toast.success('Register successfully.', {
          position: "top-center"
        })
        history.push('/')
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center"
      })
      console.error('Register', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      {loading && <Loading />}

      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
          className="login__logo" />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />

          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}>
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE
          Conditions of Use & Sale. Please see our Privacy Notice,
          our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button
          className="login__registerButton"
          onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login
