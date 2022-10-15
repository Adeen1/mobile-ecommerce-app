import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../App.css"

const SignIn = () => {
  return (
    <>
    <Navbar/>
    <div className='text-center'>
    <form className="form-signin">
    <a className="navbar-brand" href="#"><span style={{backgroundColor:"#FF9F29",color:"white",padding:"3px",borderRadius:"3px"}}> Mobile</span><span style={{backgroundColor:"black",color:"white",padding:"3px",borderRadius:"3px"}}> Hub</span></a>
      <h1 className="h3 mb-3 font-weight-normal signIn-header">Sign Up</h1>
      <p className="login-text"><span className='input-span' style={{color:"blue",textDecoration:"underlined",fontSize:"22px",cursor:"pointer  "}}><Link to="/Login">Login </Link> </span> If you are already registered</p>
      {/* <span for="inputEmail" className="sr-only">Email address</span> */}
      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>

      {/* <label for="inputPassword" className="sr-only">Password</label> */}
      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>      
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"/> Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>

    </div>
    <Footer/>
    </>
  )
}

export default SignIn