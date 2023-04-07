import { initializeApp } from "firebase/app";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { storage } from "../firebase";
import "../sale.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
const Sale = () => {
  //  firebase setup
  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAv-PmDwJv1CxDE6FwD8V2RQbwv1XD28Hk",
    authDomain: "mobile-hub-e6b77.firebaseapp.com",
    projectId: "mobile-hub-e6b77",
    storageBucket: "mobile-hub-e6b77.appspot.com",
    messagingSenderId: "937544557999",
    appId: "1:937544557999:web:f658a392a9272c16e3fb5a",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // States
  const [filearr, setFilearr] = useState([]);
  const [noImages, setNoImages] = useState(1);
  const [imageName, setImgName] = useState("");
  const [link, setlink] = useState("");
  const inputFileRef = useRef(null);
  const imgRef = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);
  const imgRef4 = useRef(null);
  const [type, setType] = useState("");
  // File Details

  const fileDetails = (e) => {
    setNoImages(noImages + 1);

    var file = e.target.files[0];
    var link = URL.createObjectURL(file);

    setlink(link);
    if (e.target.id === "1") {
      var array = [];
      imgRef.current.src = link;
      if (filearr.length >= 1) {
        array = filearr.filter((single_file) => {
          return single_file.id !== 1;
        });
      }
      setFilearr([...array, { id: 1, image: file }]);
      // upload(file.name,file,1);
    }
    if (e.target.id === "2") {
      imgRef2.current.src = link;
      var array = filearr.filter((single_file) => {
        return single_file.id !== 2;
      });
      setFilearr([...array, { id: 2, image: file }]);
    }

    // upload(file.name,file,2);

    if (e.target.id === "3") {
      imgRef3.current.src = link;
      var array = filearr.filter((single_file) => {
        return single_file.id !== 3;
      });

      setFilearr([...array, { id: 3, image: file }]);
    }
    // upload(file.name,file,3);

    if (e.target.id === "4") {
      imgRef4.current.src = link;
      var array = filearr.filter((single_file) => {
        return single_file.id !== 4;
      });

      setFilearr([...array, { id: 4, image: file }]);
    }
  };
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const nameRef = useRef();
  const max = useRef();
  const min = useRef();
  const mobile = useRef();
  const comments = useRef();
  const [validation, setValidation] = useState(false);
  const checkbox = (event) => {
    setType(event.target.value);
  };
  const [percent, setPercent] = useState();
  var url_list = [];
  const submit = async () => {
    if (
      nameRef.current.value &&
      max.current.value &&
      mobile.current.value &&
      comments.current.value &&
      type &&
      filearr[0]
    ) {
      var done = () => {
        if (url_list.length === filearr.length) {
          axios
            .post("http://localhost:5000/api/sale", {
              username: user.name,
              productName: nameRef.current.value,
              productType: type,
              email: user.email,
              price: max.current.value,
              comment: comments.current.value,
              mobile: mobile.current.value,
              images: url_list,
            })
            .then((res) => {
              console.log(res.status, res.data);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      filearr.map((item, index) => {
        const storageRef = ref(storage, `images/${item.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, item.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              url_list.push(url);
              if (url_list.length === filearr.length) {
                done();
              }
            });
          }
        );
      });
    } else {
      setValidation(true);
    }
  };
  // upload(file.name,file,3);

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="sale-auth-no">
          <div className="sale-auth-inner">
            <p className="login-text">
              You must{" "}
              <span className="login-sale" onClick={() => loginWithRedirect()}>
                {" "}
                login{" "}
              </span>
              first
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="sale">
      <Navbar />

      <h2 className="sale-header">Product Form</h2>

      <div className="wrapper">
        <div className="container">
          {validation && (
            <div className="warning bg-danger">
              <p>
                Kindly<strong> Fill</strong> this form completely!!
              </p>
            </div>
          )}
          <h3 className="sale-input-label">Product-Name:</h3>
          <input
            className="sale-input input-feild"
            ref={nameRef}
            placeholder="E.g IPhone 13"
            style={{ width: "350px" }}
          ></input>
          {/* checkbox */}
          <h3 className="sale-input-label">Product-Type:</h3>
          <div onChange={checkbox}>
            <input type="checkbox" id="mobile" name="mobile" value="mobile" />
            <label htmlfor="mobile"> mobile</label>
            <br />
            <input type="checkbox" id="laptop" name="laptop" value="laptop" />
            <label htmlfor="laptop"> Laptop</label>
            <br />
            <input type="checkbox" id="tablet" name="tablet" value="tablet" />
            <label htmlfor="tablet"> Tablet</label>
          </div>
          <h3 className="sale-input-label">Price (Rs):</h3>
          <input
            className="sale-input price input-feild"
            ref={max}
            placeholder="price"
          ></input>
          <h3 className="sale-input-label">Mobile:</h3>
          <input
            className="sale-input input-feild"
            placeholder="E.g 03104796438"
            ref={mobile}
          ></input>
          <h3 className="sale-input-label">Comments:</h3>
          <textarea type="text" id="comment" ref={comments} />
          <h3 className="sale-input-label">Images :</h3>
          {noImages >= 1 && (
            <div>
              <p
                className="bg-success"
                style={{
                  color: "white",
                  width: "100px",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                main pic
              </p>
              <input
                type="file"
                id="1"
                accept="Image/*"
                ref={inputFileRef}
                onChange={(e) => {
                  fileDetails(e);
                }}
              />
              <br />
              <img ref={imgRef} className="sale-image" alt={imageName} />
            </div>
          )}
          {noImages >= 2 && (
            <div>
              <input
                type="file"
                id="2"
                accept="Image/*"
                ref={inputFileRef}
                onChange={(e) => {
                  fileDetails(e);
                }}
              />
              <br />
              <img ref={imgRef2} className="sale-image" alt={imageName} />
            </div>
          )}
          {noImages >= 3 && (
            <div>
              <input
                type="file"
                id="3"
                accept="Image/*"
                ref={inputFileRef}
                onChange={(e) => {
                  fileDetails(e);
                }}
              />
              <br />
              <img ref={imgRef3} className="sale-image" alt={imageName} />
            </div>
          )}
          {noImages >= 4 && (
            <div>
              <input
                type="file"
                id="4"
                style={{ marginTop: "10px" }}
                accept="Image/*"
                ref={inputFileRef}
                onChange={(e) => {
                  fileDetails(e);
                }}
              />
              <br />
              <img ref={imgRef4} className="sale-image" alt={imageName} />
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              submit();
            }}
            class="btn btn-outline-success"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Sale;
