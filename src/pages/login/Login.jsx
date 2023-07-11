/* eslint-disable */
import "./login.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import auth from "../../auth";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";
import { useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_BASE_URL

export const Login = () => {

  const { LoginStyle } = useAppSelector(state => state.LoginStyle)
  const dispatch = useAppDispatch()



  const [active, setActive] = useState(false);
  const [modalActive, setModalActive] = useState(false)
  const [color, setColor] = useState()
  const [colorbtn, setColorbtn] = useState()
  const [bgcolor, setBgColor] = useState()

  async function saveLocalstorage() {
    const newColor = {
      loginBg_color: bgcolor,
      login_color: color,
      buttonBg_color: colorbtn
    }
    await axios.put(URL + 'api/v1/superAdmin/changeLoginOptions', newColor)
    dispatch(fetchLoginStyle())
  }
  const [signup, setSignup] = useState('')
  const [login, setLogin] = useState('')
  const [passwordd, setPasswordd] = useState('')
  const [registration, setRegistration] = useState('')
  const [remember, setRemember] = useState('')
  const [signin, setSignin] = useState('')

  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState({});
  const [loginError, setLoginError] = useState({});
  const [password, setPassword] = useState({});
  const [passwordError, setPasswordError] = useState({});


  useEffect(() => {
    dispatch(fetchLoginStyle());
    setColor(LoginStyle?.login_color)
    setBgColor(LoginStyle?.loginBg_color)
    setColorbtn(LoginStyle?.buttonBg_color)
    setPasswordd(LoginStyle?.password_title)
    setSignup(LoginStyle?.signUp_title)
    setSignin(LoginStyle?.signIn_title)
    setRegistration(LoginStyle?.registration_title)
    setRemember(LoginStyle?.remember_title)
    setLogin(LoginStyle?.login_title)
  }, [dispatch])

  async function saveLocalstorageValue() {
    const newText = {
      login_title: login,
      password_title: passwordd,
      signUp_title: signup,
      signIn_title: signin,
      registration_title: registration,
      remember_title: remember
    }
    await axios.put(URL + 'api/v1/superAdmin/changeLoginOptions', newText)
  }
  async function saveTitle() {
    const newTitle = {
      title: text
    }
    await axios.put(URL + 'api/v1/superAdmin/changeLoginOptions', newTitle)

  }






  const loginRequest = async () => {

    try {
      const user = await axios.post(`${URL}api/v1/auth/login`, {
        username: checkLogin.login,
        password: password.password,
      });
      const lifetime = active
        ? (new Date).setDate((new Date()).getDate() + 356)
        : (new Date).setDate((new Date()).getDate() + 1)

      localStorage.setItem('auth', JSON.stringify({ ...user.data, lifetime: lifetime }));

    } catch (error) {
      loginError.login = 'error';
      setLoginError({ ...loginError });
    }
  }

  const checkValidation = async (e) => {
    e.preventDefault();
    let check = 0;


    if (checkLogin['login'] && checkLogin['login'].length >= 3 && checkLogin['login'].length <= 38) {
      check++;
      setLoginError({});
    } else if (checkLogin['login'] == '' || checkLogin['login'] == null) {
      loginError.login = 'ricuared';
      setLoginError({ ...loginError });
    } else if (checkLogin['login'] && checkLogin['login'].length < 3 || checkLogin['login'].length > 38) {
      loginError.login = 'min 3, max 38';
      setLoginError({ ...loginError });
    }

    //  password validation
    if (password['password'] && password['password'].length >= 3 && password['password'].length <= 38) {
      check++;
      setPasswordError({});
    }
    else if (password['password'] == '' || password['password'] == null) {
      passwordError.password = 'Error';
      setPasswordError({ ...passwordError });
    }
    else if (password['password'] && password['password'].length < 3 || password['password'].length > 38) {
      passwordError.password = 'Error';
      setPasswordError({ ...passwordError });
    }
    await loginRequest();

    if (check == 2 && auth().role === "superAdmin") {
      navigate("/home")
    }




  }
  return (
    <div className="login">
      <div className="main">
        <div className="containeri" id="container">

          <div className="containerHeader" id="containerHeader">
            <img src="../../../../images/logo11.webp" />
            <h3 id={"containerHeaderH1"}>{LoginStyle?.title}</h3>
          </div>
          <div className="containerMain">
            <div>
              <img src="../../../../images/logins.webp" alt="" srcset="" />

            </div>

            <form className="loginForm" style={{ background: bgcolor || LoginStyle?.loginBg_color }} onSubmit={checkValidation} >
              <h3 className="loginFormTitle" style={{ color: color || LoginStyle?.login_color }}>{signup || LoginStyle?.signUp_title}</h3>
              <div id="loginFormChildLogin" className="loginFormChild">
                <label style={{ color: color || LoginStyle?.login_color }}>{login || LoginStyle?.login_title}</label>
                <Input placeholder="Login" name="login"
                  onChange={(e) => {
                    e.preventDefault();
                    setCheckLogin({ ...checkLogin, [e.target.name]: e.target.value })
                  }}
                  style={{ "borderRadius": "0px" }}
                  id={loginError.login ? "loginError1" : ""}
                  className={loginError.login ? "loginError1 loginFormChildid" : "loginFormChildid"}

                />
                <p className="login_p">{loginError.login} </p>
              </div>

              <div id="loginFormChildPassword" className="loginFormChild">
                <label style={{ color: color || LoginStyle?.login_color }}>{passwordd || LoginStyle?.password_title}</label>
                <Input.Password
                  placeholder="*******"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  name='password'
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword({ ...password, [e.target.name]: e.target.value })
                  }}
                  style={{ "borderRadius": "0px" }}
                  className={loginError.login ? "loginError1 loginFormChildid" : "loginFormChildid"}
                />

                <p className="password_p">{passwordError.password}</p>

              </div>

              <div id="loginFormChildCheckbox" className="loginFormCheckbox">
                {/* <button className="RegistrationButton" onClick={(e) => { setModalActive(true); e.preventDefault() }} style={{ color: color || LoginStyle?.login_color }}>{registration || LoginStyle?.registration_title}</button> */}
                <label> Remember </label>
                <div id="loginFormCheckboxChild" className="loginFormCheckboxChild">

                  <div className="remcheck"> <input type="checkbox"

                  />


                    <label id={active ? "unCheked" : "saveCheck"} style={{ color: color || LoginStyle?.login_color }}>{remember || LoginStyle?.remember_title}</label>
                  </div>
                </div>
              </div>

              <button id="loginFormChildButton" className="loginFormButton" style={{ color: color || LoginStyle?.login_color, background: colorbtn || LoginStyle?.buttonBg_color }} >{signin || LoginStyle?.signIn_title}</button>
              <div className="google" >



                <div id="signInDiv"></div>



              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
