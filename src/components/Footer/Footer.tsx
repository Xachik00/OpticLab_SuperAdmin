import React, { useState ,useEffect} from "react";
import "./Footer.scss";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";


export function Footer() {
  const navigate = useNavigate()
  // const [show, setShow] = useState( false );

    
  const {LoginStyle}:any=useAppSelector(state=>state.LoginStyle)

  const dispatch = useAppDispatch()
 
  useEffect(() => {
      dispatch(fetchLoginStyle());
  }, [dispatch])

  return (
    <div className="footer" style={{background:LoginStyle?.loginBg_color}}>
      <footer className="containerFooter">
        <div className="linkIcons">
          <div className="link1">
            <a href="https://www.facebook.com/bestopticlab/">
              <FacebookOutlined />
            </a>
          </div>
          <div className="link2">
            <a href="https://www.instagram.com/best_optic_lab/?__coig_restricted=1">
              <InstagramOutlined />
            </a>
          </div>
        </div>

        <div className="footerText">
          <div className="textAbout">
            Copyright © 2018 Best Optic Lab, Inc - All Rights Reserved.{" "}
          </div>
          <div className="linkText">
            <a href="https://www.freeprivacypolicy.com/privacy/view/435a9c30b1335b8e09e21580430da181">
              Privacy Policy
              <span>/</span>
            </a>

            <span onClick={() => { navigate( "/terms-and-conditions" ); }} >Terms and Conditions</span>

            <span onClick={() => {
              navigate("/contact")
            }} >Contact US</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
