import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";
import { BsPersonSquare, BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { autherizedAction } from "../slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Navbar = () => {
  const number = 0;
  const changeVal = autherizedAction.changeVal;
  const dispatch = useDispatch();
  // console.log(autherized);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  if (isAuthenticated) {
    dispatch(changeVal(user));
  }
  const addUser = async () => {
    console.log("hello");
    await axios
      .post("http://localhost:5000/api/addUser", {
        username: user.name,
        email: user.email,
      })
      .then((res) => {
        console.log(res.status, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      addUser();
    }
  }, [isAuthenticated]);
  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container-fluid">
        <motion.a
          className="navbar-brand"
          href="#"
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          initial={{
            y: -50,
            opacity: 0.3,
            scale: 0.5,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <Link
            to="/"
            className="mobile-hub"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <span
              className="mobile-hub"
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "5px",
              }}
            >
              {" "}
              Mobile
            </span>
            <span
              className="mobile-hub"
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "5px",
              }}
            >
              {" "}
              Store
            </span>
          </Link>
        </motion.a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Buy">
                {" "}
                Buy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Sale">
                {" "}
                Sell{" "}
              </Link>
            </li>
            <li className="nav-item nav-link">
              {isAuthenticated ? (
                <p onClick={() => logout()}>Logout</p>
              ) : (
                <p
                  onClick={() => {
                    loginWithRedirect();
                  }}
                >
                  Login
                </p>
              )}
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                {isAuthenticated && (
                  <Link
                    style={{ marginTop: "-5px" }}
                    className="nav-link"
                    to="/account"
                  >
                    {" "}
                    <p>Products</p>
                  </Link>
                )}
              </a>
            </li>

            <li className="nav-item ">
              {isAuthenticated && (
                <>
                  <a className="nav-link " href="#">
                    <Link className="nav-link" to="/cart">
                      <BsCart3
                        className="nav-icons"
                        style={{ marginBottom: "20px" }}
                      />{" "}
                    </Link>
                  </a>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
