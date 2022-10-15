import { motion } from 'framer-motion'
import React from 'react'

const Slider = () => {
  return (
   <div className='carousel-slider'>
    <motion.div className="text-slider"
    animate={{
      y:0,
      opacity:1,
    }}
    initial={{
      y:100,
      opacity:0.3
    }}
    transition={{
      duration:0.7,
      // when:"beforeChildren",
      
      staggerChildren:0.3, 
    }}
    > <span style={{textDecoration:"underline",color:"#0080ff"}}>Save Your Precious Time</span>  And  Buy/Sell Mobile Phone Without Any Hassle.
    <br/>
    <button type="button " className="btn btn-outline-primary first-btn">Buy</button>
    <button type="button" className="btn btn-outline-danger second-btn">Sell</button>    
</motion.div>
    <motion.div className="image-slider"
    initial={{
      x:200,
      scale:0.5,
    }}
    animate={{
      x:0,
      scale:1.1
    }}
    transition={{
      duration:0.7
    }}
    ><img className='slider-img' src="https://www.freepnglogos.com/uploads/mobile-png/export-genius-country-wise-analysis-mobile-phones-38.png" alt="" /></motion.div>
   </div>
  )
}

export default Slider