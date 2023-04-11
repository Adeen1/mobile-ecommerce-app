import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Slider></Slider>
      <About></About>

      {/* <Testimonial /> */}
      <Footer />
    </>
  );
};

export default Home;
