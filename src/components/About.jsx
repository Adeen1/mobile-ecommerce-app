import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import React, { useEffect } from "react";

const About = () => {
  const { ref, inView } = useInView();
  const animation = useAnimation();
  const animation_btn1 = useAnimation();
  const animation_btn2 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,

        transition: {
          duration: 0.7,
        },
      });
      animation_btn1.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
      animation_btn2.start({
        opacity: 1,
        transition: {
          duration: 1.3,
        },
      });
    }
    if (!inView) {
      animation.start({
        opacity: 0,
      });
      animation_btn1.start({
        opacity: 0,
      });
      animation_btn2.start({
        opacity: 0,
      });
    }
  }, [inView, animation, animation_btn1, animation_btn2]);

  return (
    <div className="About">
      <h1 className="about-header">Our Story</h1>
      <div className="about-wrapper">
        <div className="about-pic">
          <img
            className="about-img"
            src="https://png.pngitem.com/pimgs/s/506-5060327_success-people-png-group-of-professionals-png-transparent.png"
            alt=""
          />
        </div>
        <motion.div className="about-text" ref={ref} animate={animation}>
          Our Company Believes That in This Modern Times of Booming Technology
          Our People Must Have The{" "}
          <span style={{ textDecoration: "underline", color: "#0080ff" }}>
            {" "}
            Ease Of Trading Quality Electronic Gadgets.{" "}
          </span>{" "}
          Our Unique Thing is That We do not Charge a Single Penny in Any Trade
          <br />
          <motion.button
            type="button "
            className="btn btn-outline-primary first-btn"
            animate={animation_btn1}
          >
            Buy
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-outline-danger second-btn"
            animate={animation_btn2}
          >
            Sell
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
