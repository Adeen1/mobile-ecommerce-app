import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import "../buy.css";
import { useEffect } from "react";
import { useState } from "react";

const SIngleProduct = () => {
  const item = useSelector((state) => {
    // console.log(state.product);
    return state.product;
  });
  const [state, setState] = useState(item);
  useEffect(() => {
    setState(item);
    console.log("item ", item);
  }, [item]);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="single-container">
          <div className="row ">
            <div className="col-lg-5 col-xs-12  image-single">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100 singleimage"
                      src={state.img}
                      alt="First slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                    style={{ paddingLeft: "40px" }}
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only" style={{ paddingRight: "40px" }}>
                    Next
                  </span>
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-xs-12">
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}>
                  {" "}
                  Description:{" "}
                </b>
                {state.description}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}> Price: </b>
                Rs {state.price}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}>
                  {" "}
                  Category:{" "}
                </b>
                {state.category}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}> Seller: </b>
                {state.seller}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}>
                  {" "}
                  Contact No:{" "}
                </b>
                {state.mobile}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SIngleProduct;
