import "../buy.css";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { data } from "../data";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../slice";

const Buy = () => {
  const [age, setAge] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAge(`${event.target.value}`);
  };
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="buy">
        <div className="buy-input">
          <input
            type={"text"}
            placeholder="E.g Samsung Galaxy"
            className="buy-search"
          ></input>
          <span className="search-glass">
            <AiOutlineSearch className="search-icon"></AiOutlineSearch>
          </span>
        </div>
        <div className="buy-radio">
          <div className="buy-search-buttons">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="mobile"
                  control={<Radio />}
                  label="mobile"
                />
                <FormControlLabel
                  value="Laptop"
                  control={<Radio />}
                  label="Laptop"
                />
                <FormControlLabel
                  value="Computer Components"
                  control={<Radio />}
                  label="Computer Components"
                />
              </RadioGroup>
            </FormControl>

            <FormControl className="buy-price">
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* Products Products Products Products Products Products */}
        <div className="products-container">
          <div className="container-buy">
            <div className="row .no-gutters">
              {data.map((item) => {
                return (
                  <div className="col-xl-4 col-xs-1 col-md-2 col-lg-4 product">
                    <div
                      className="product-detail"
                      onClick={() => {
                        dispatch(setProduct({ item }));
                        setTimeout(() => {
                          navigate("/singleProduct");
                        }, 1000);
                      }}
                    >
                      <img
                        className="product-img"
                        src={item.img}
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
                              <h5> {item.name}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6>Price : </h6>{" "}
                            </td>
                            <td>
                              <h5>Rs{item.price}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6>Category : </h6>{" "}
                            </td>
                            <td>
                              <h5> {item.cat}</h5>
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

export default Buy;
