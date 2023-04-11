import "../buy.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { SingleProduct } from "./Buy";
import { motion } from "framer-motion";
import { productAction } from "../slice";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const Cart = () => {
  const setProduct = productAction.setProduct;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { isAuthenticated, user } = useAuth0();
  const deleteData = async (id) => {
    console.log(user.email);
    await axios
      .post("https://backend-adeen.fly.dev/api/delItem", {
        email: user.email,
        id: id,
      })
      .then((res) => {
        console.log(res.status, res.data);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCart = async () => {
    await axios
      .post("https://backend-adeen.fly.dev/api/getcart", {
        email: user.email,
      })
      .then((response) => {
        console.log(response);
        let temp_data = response.data;
        setData(temp_data.cart);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // console.log(user);
    if (isAuthenticated) {
      getCart();
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "100px" }}>
        <div className="products-container">
          <div className="container-buy">
            <div className="row .no-gutters">
              {data.map((item) => {
                return (
                  <div
                    className="col-xl-4 col-xs-1 col-md-2 col-lg-4 product"
                    key={item.id}
                  >
                    <div
                      className="product-detail"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setProduct({ item }));

                        navigate("/singleProduct");
                      }}
                    >
                      <img
                        className="product-img"
                        src={item.images[0]}
                        alt={item.name}
                      />
                      <motion.div
                        transition={{
                          staggerChildren: 0.5,
                        }}
                        className="product-data"
                      >
                        <table>
                          <tr>
                            <td>
                              <h6>Name : </h6>{" "}
                            </td>
                            <td>
                              <h5> {item.productName}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6>Price : </h6>{" "}
                            </td>
                            <td>
                              <h5>Rs{item.min}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6>Category : </h6>{" "}
                            </td>
                            <td>
                              <h5> {item.productType}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  deleteData(item._id);
                                }}
                              >
                                {" "}
                                delete
                              </button>{" "}
                            </td>
                          </tr>
                        </table>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
