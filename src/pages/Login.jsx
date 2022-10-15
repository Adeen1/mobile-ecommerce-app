import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../App.css"

const Login = () => {
  return (
    <>
    <Navbar/>
    <div className='text-center'>
    <form className="form-signin">
    <a className="navbar-brand" href="#"><span style={{backgroundColor:"#FF9F29",color:"white",padding:"3px",borderRadius:"3px"}}> Mobile</span><span style={{backgroundColor:"black",color:"white",padding:"3px",borderRadius:"3px"}}> Hub</span></a>
      <h1 className="h3 mb-3 font-weight-normal signIn-header">Login</h1>
      <p className="login-text"><span className='input-span' style={{color:"blue",textDecoration:"underlined",fontSize:"22px",cursor:"pointer  "}}> register</span> If you are not registered</p>
      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>

      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>      
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"/> Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>

    </div>
    <Footer/>
    </>
  )
}

export default Login;