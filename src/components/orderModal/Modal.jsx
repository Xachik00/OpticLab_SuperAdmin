import React from 'react'
import "./modal.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderingInformation from "../../pages/OrderingInformation";
const URL = process.env.REACT_APP_BASE_URL;

export default function Modal({ active, setActive }) {
  const navigate = useNavigate();

  const [depName, setDepName] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [price1, setPrice1] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [img, setImg] = useState("");
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState([]);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (price === '' || price1 === '') {
        if (price === '' && price1 === '' && img !== "") {

          const response = await axios({
            method: 'post',
            url: URL + 'api/v1/superAdmin/addTable',
            data: [depName, { columnName: item }, { value: img }]

          });
          
          
          setSuccess(true);
          //clear state and controlled inputs
          setDepName("");
          setItem("");
          setPrice("");
          setPrice1("");
          setActive(false);
        }
        if (price === '' && price1 === '' && img === "") {

          const response = await axios({
            method: 'post',
            url: URL + 'api/v1/superAdmin/addTable',
            data: [depName, { columnName: item }]

          });
         
          setSuccess(true);
          //clear state and controlled inputs
          setDepName("");
          setItem("");
          setPrice("");
          setPrice1("");
          setActive(false);
        }
        if (price === "" && price1 !== "") {
          const response = await axios({
            method: 'post',
            url: URL + 'api/v1/superAdmin/addTable',
            data: [depName, price ? { columnName: item } : { columnName: item }, price1]
          });

         
          setSuccess(true);
          setDepName("");
          setItem("");
          setPrice("");
          setPrice1("");
          setActive(false);
        } else if (price1 === "" && price !== "") {
          const response = await axios({
            method: 'post',
            url: URL + 'api/v1/superAdmin/addTable',
            data: [depName, price ? { columnName: item } : { columnName: item }, price,]
          });
          
          setSuccess(true);
          setDepName("");
          setItem("");
          setPrice("");
          setPrice1("");
          setActive(false);
        }
      } else {
        const response = await axios({
          method: 'post',
          url: URL + 'api/v1/superAdmin/addTable',
          data: [depName, price ? { columnName: item } : { columnName: item }, price, price1]
        });

   
        setSuccess(true);
        setDepName("");
        setItem("");
        setPrice("");
        setPrice1("");
        setActive(false);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal_content active" : "modal_content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="contain">
          <p className="p1">
            <h1>ADD ORDERS INFORMATION</h1>
          </p>
          <form onSubmit={handleSubmit} className="containform">
            <div className="inputers">
              <p>depName</p>
              <input
                type="text"
                id="depName"
                onChange={(e) => setDepName(e.target.value)}
                value={depName}
                required
              />
              <p>create item name</p>
              <input
                type="text"
                id="create-item"
                onChange={(e) => setItem(e.target.value)}
                value={item}
                required
              />
              <p>price per individual</p>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />

              <p>price for the organization</p>
              <input
                type="text"
                onChange={(e) => setPrice1(e.target.value)}
                value={price1}
              />
              <div>
                <form>
                  <input
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.target.files[0];

                      let files = new FormData();
                      files.append("image", file);
                      if (files.has("image")) {
                        const response = await axios({
                          method: "post",
                          url: `${URL}api/v1/superAdmin/upload`,
                          data: files,
                        });
                        let photo = response.data.filename;
                        setImg(photo);
                      } else {
                        console.log(
                          "Error: File not appended to FormData object"
                        );
                      }

                      if (file && file.type.substr(0, 5) === "image") {
                        setImage(file);
                      } else {
                        setImage(null);
                      }
                    }}
                  />
                  <label className="add " htmlFor="file">
                    
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click();
                      }}
                      className="adds"
                    >
                      +
                    </button>
                  </label>
                </form>
              </div>
            </div>

            <div className="registraciabutton">
              <button>Save</button>
            </div>
          </form>
          <button className="btn5" onClick={() => navigate(0)}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
