import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react'
import { BsPersonSquare,BsCart3 } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-success">
  
    <div className="container-fluid">
      <motion.a className="navbar-brand" href="#"
      animate={{
        y:0,
        opacity:1,
        scale:1,

      }}
      initial={{
        y:-50,
        opacity:0.3,
        scale:0.5,

      }}
      transition={{
        duration:0.7,
      }}
      
      >
       <Link to="/" className="mobile-hub" style={{textDecoration: 'none'}}> <span className='mobile-hub' style={{backgroundColor:"#FF9F29"}}> Mobile</span><span className='mobile-hub' style={{backgroundColor:"black"}}> Hub</span>
       </Link>
       </motion.a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          
          <li className="nav-item">
            
             <Link className='nav-link' to="/Buy" > Buy</Link>
          </li>
          <li className="nav-item">
            
             <Link className='nav-link' to="/Sale"> Sell </Link>
          </li>
          <li className="nav-item">
            
             <Link className='nav-link' to="/SignUp"> Login/Sign In </Link>
          </li>
         
        <li className="nav-item">
            
            <a className="nav-link" href="#"><BsPersonSquare className="nav-icons" style={{marginBottom:"3px"}} /> Account</a>
            
          </li>
          <li className="nav-item ">
          
            <a className="nav-link " href="#"><BsCart3 className="nav-icons" style={{marginBottom:"3px"}}/>Cart</a>
          
          </li>
         
        </ul>
      </div>
    </div>
  
  </nav>
  )
}

export default Navbar;
