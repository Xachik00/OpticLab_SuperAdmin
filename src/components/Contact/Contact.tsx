import React, { useState } from "react";
import "./Contact.scss";
import { CheckCircleOutlined } from "@ant-design/icons";
export function Contact() {
  const data = new Date();
  const day: number = data.getDay();

  const arrData = [
    "  Mon 09:00 am – 05:00 pm",
    "Tue 09:00 am – 05:00 pm ",
    "Wed 09:00 am – 05:00 pm ",
    "Thu 09:00 am – 05:00 pm",
    "Fri 09:00 am – 05:00 pm ",
    "  Sat Closed",
    "Sun Closed",
  ];

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [send, setSend] = useState(false);
  function valid() {
    if (name === "" || mail === "" || message === "") {
      if (name === "") {
        setErrorName(true);
      }

      if (mail === "") {
        setErrorMail(true);
      }

      if (message === "") {
        setErrorMessage(true);
      }
    } else {
      setSend(!send);
    }
  }

  return (
    <div className="contact">
      {send ? (
        <div className="ok">
          <div className="icon">
            <CheckCircleOutlined />
          </div>
          <div className="iconText">
            Thank you for your inquiry! We will get back to you within 48 hours.
          </div>
        </div>
      ) : (
        <div>
          <div className="title">info@bestopticlab.com</div>

          <div className="inputs">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName( e.target.value );
                setErrorName(false);
              }}
              className={errorName ? "anasun inputError" : "anasun"}
            />
            <input
              type="email"
              placeholder="Email*"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
                setErrorMail(false)
              }}
              className={errorMail ? "anasun inputError" : "anasun"}
            />

            <textarea
              placeholder="Message"
              className={errorMessage ? "text inputError" : "text"}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrorMessage(false)
              }}
            />
          </div>

          <div className="btn">
            <button onClick={() => valid()}>SEND</button>
            <p>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>
      )}

      <div className="textBottom">
        <div className="textLeft">
          <h2>Best Optic Lab, Inc</h2>
          <p>820 Thompson Ave, Ste 30 Glendale, CA 91201</p>
          <p>(818) 649-1799</p>
        </div>
        <div className="textRight">
          <h2>Hours</h2>

          {arrData.map((item: any, index: any) =>
            index == day - 1 ? (
              <b key={index}>{item}</b>
            ) : (
              <p key={index}>{item}</p>
            )
          )}
        </div>
      </div>

      <div className="footerTop">
        <div className="sub">Supscribe</div>
        <div className="in">
          <input type="email" placeholder="EMAIL ADRESS" />
        </div>
        <div className="btn2">
          <button>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}
