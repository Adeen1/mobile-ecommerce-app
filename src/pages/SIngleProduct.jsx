import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import "../buy.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SIngleProduct = () => {
  const navigate = useNavigate();
  let { isAuthenticated, user } = useAuth0();
  const item = useSelector((state2) => {
    return state2.product;
  });

  const [convo, setConvo] = useState(false);
  const checkConvo = async () => {
    console.log(user.email, item.email);
    await axios
      .post("https://backend-adeen.fly.dev/api/chat/checkConvo", {
        sender: user.email,
        receiver: item.email,
      })
      .then((res) => {
        if (res.data == "1") {
          setConvo(false);
        } else if (res.data == "0") {
          setConvo(true);
        }
      })
      .catch((err) => {
        console.log(err, "error in checkCOnvo()");
      });
  };

  useEffect(() => {
    if (user) {
      if (user.email != item.email) {
        setConvo(true);
      }
      if (isAuthenticated) {
        checkConvo();
      }
    }
  }, [useAuth0()]);
  const startConvo = async () => {
    await axios
      .post("https://backend-adeen.fly.dev/api/chat/creatConvo", {
        senderEmail: user.email,
        receiverEmail: item.email,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/Messages", { replace: true });
      })
      .catch((err) => console.log(err));
  };
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
                  {item.images.map((single, index) => {
                    return (
                      <div className="carousel-item active" key={index}>
                        <img
                          className="d-block w-100 singleimage"
                          src={single}
                          alt="First slide"
                        />
                      </div>
                    );
                  })}
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
                  Product Name:{" "}
                </b>
                Rs {item.productName}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}>
                  {" "}
                  Description:{" "}
                </b>
                {item.comment}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}> Price: </b>
                Rs {item.price}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}>
                  {" "}
                  Category:{" "}
                </b>
                {item.productType}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}> Seller: </b>
                {item.username}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}>
                  {" "}
                  Contact No:{" "}
                </b>
                {item.mobile}
              </p>
              <p>
                <b style={{ color: "#198754", fontSize: "22px" }}> Email: </b>
                {item.email}
              </p>

              {convo && (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert("You must log in first!");
                      return;
                    }
                    axios
                      .post("https://backend-adeen.fly.dev/api/cartadd", {
                        username: user.name,
                        email: user.email,
                        cart: item,
                      })
                      .then((res) => {
                        console.log(res.status, res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Interested
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SIngleProduct;
