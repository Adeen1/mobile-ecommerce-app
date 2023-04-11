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

import { useNavigate } from "react-router-dom";
import { productAction } from "../slice";
import axios from "axios";
import { useState } from "react";
const Buy = () => {
  const [sort, setSort] = React.useState();
  const input_feild = React.useRef();
  const [type, setType] = useState();
  const input_ref = React.useRef();
  const [filterdata, setFilterData] = useState({});
  const [validation, setValidation] = useState(false);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    const input = input_ref.current.value;
    setValidation(true);

    console.log(input);
    if (input && type && sort) {
      setFilterData({ input, sort, type });
    } else if (input && type) {
      setFilterData({ input, type });
    } else if (input && sort) {
      setFilterData({ input, sort });
    } else if (sort && type) {
      setFilterData({ sort, type });
    } else if (input) {
      setFilterData({ input });
    } else if (type) {
      setFilterData({ type });
    } else if (sort) {
      setFilterData({ sort });
    } else {
      setValidation(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="buy">
        <div className="buy-input">
          <input
            type={"text"}
            placeholder="E.g Samsung Galaxy"
            className="buy-search"
            ref={input_ref}
          ></input>
          <span className="search-glass" onClick={handleSubmit}>
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
                onChange={(e) => handleType(e)}
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
                  value="tablet"
                  control={<Radio />}
                  label="tablet"
                />
              </RadioGroup>
            </FormControl>

            <FormControl className="buy-price">
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => handleChange(e)}
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
              <SingleProduct filter={filterdata} validation={validation} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const SingleProduct = ({ filter, validation }) => {
  const setProduct = productAction.setProduct;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [visiilty, setVisibilty] = useState(false);
  const fetchingData = async () => {
    await axios
      .post("https://backend-adeen.fly.dev/getAllProduct", filter)
      .then((res) => {
        setData(res.data);
        setVisibilty(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const fetchFilter = async () => {
  //   console.log("done");
  //   await axios
  //     .post("http://localhost:5000/api/getFilterProduct", filter)
  //     .then((res) => {
  //       setData(res.data);
  //       setVisibilty(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  console.log(validation, filter);

  React.useEffect(() => {
    fetchingData();
  }, [filter]);
  if (visiilty) {
    return (
      <>
        {data.map((item) => {
          console.log(item.images[0]);
          return (
            <div
              className="col-xl-4 col-xs-1 col-md-2 col-lg-4 product"
              key={item.id}
            >
              <div
                className="product-detail"
                onClick={() => {
                  dispatch(setProduct({ item }));
                  navigate("/singleProduct");
                }}
              >
                <img
                  className="product-img"
                  src={item.images[0]}
                  alt={item.username}
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
                        <h4 style={{ color: "yellow" }}>Name : </h4>{" "}
                      </td>
                      <td>
                        <h5> {item.productName}</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4 style={{ color: "yellow" }}>Price : </h4>{" "}
                      </td>
                      <td>
                        <h5>Rs{item.price}</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4 style={{ color: "yellow" }}>Category : </h4>{" "}
                      </td>
                      <td>
                        <h5> {item.productType}</h5>
                      </td>
                    </tr>
                  </table>
                </motion.div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
};

export default Buy;
export { SingleProduct };
