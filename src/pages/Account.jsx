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
const Account = () => {
  const setProduct = productAction.setProduct;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.href;
  const { user } = useAuth0();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    await axios
      .post("https://backend-adeen.fly.dev/api/getAccount", {
        email: user.email,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteData = async (id) => {
    console.log(user.email);
    await axios
      .post("https://backend-adeen.fly.dev/api/delProduct", {
        email: user.email,
        id: id,
      })
      .then((res) => {
        console.log(res.status, res.data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [data,setData]=useState([]);
  useEffect(() => {
    fetchData();
  }, []);
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
                    key={item._id}
                  >
                    <div className="product-detail">
                      <img
                        className="product-img"
                        src={item.images[0]}
                        alt={item.productName}
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
                                onClick={() => deleteData(item._id)}
                                className="btn btn-danger"
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

export default Account;
