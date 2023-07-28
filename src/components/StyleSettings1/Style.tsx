/*eslint-disabled */
import "./Style.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";
import axiosadmin from '../../axios/adminaxios';

export function Style() {
  const { LoginStyle }: any = useAppSelector(state => state.LoginStyle);
  const dispatch = useAppDispatch()
  const [color, setColor] = useState<any>()
  const [colorbtn, setColorbtn] = useState<any>()
  const [bgcolor, setBgColor] = useState<any>()
  const local: any = localStorage.getItem('auth')
  const localAuth = JSON.parse(local)
  const token = localAuth?.accessToken
  
const URL = 'http://localhost:3005/api/v1/superAdmin/changeLoginOptions';


async function saveLocalstorage() {
  // const URL = 'https://example.com/api/endpoint'; // Замените на свой URL
  // const token = 'your_access_token'; // Замените на ваш токен доступа
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization':` Bearer ${token}`,
  };
  
  const data = {
    loginBg_color: bgcolor,
    login_color: color,
    buttonBg_color:colorbtn ,
  };
  await axios.put(URL, data, { headers })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received from the server:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  })
  .finally(() => {
    console.log('Request completed.'); // Optional: Log when the request is completed (successful or not).
  })
  
  // axios.put(URL, data, { headers })
  //   .then(response => {
  //     // Обработка успешного ответа
  //     console.log('Успешный ответ:', response.data);
  //   })
  //   .catch(error => {
  //     // Обработка ошибки
  //     console.error('Ошибка:', error);
  //   });
}

  const [signup, setSignup] = useState<any>('')
  const [login, setLogin] = useState<any>('')
  const [passwordd, setPasswordd] = useState<any>('')
  const [registration, setRegistration] = useState<any>('')
  const [remember, setRemember] = useState<any>('')
  const [signin, setSignin] = useState<any>('')
  const [text, setText] = useState('')
  const [edit, setEdit] = useState(false)




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
  }, [dispatch]);

  async function saveLocalstorageValue() {
    const newText = {
      login_title: login,
      password_title: passwordd,
      signUp_title: signup,
      signIn_title: signin,
      registration_title: registration,
      remember_title: remember
    }
    await axiosadmin.put('changeLoginOptions', newText)
  }


  async function saveTitle() {
    const newTitle = {
      title: text
    }
    await axiosadmin.put('changeLoginOptions', newTitle)

  }


  return (
    <div className='style' >
      {
        edit ?
          <div className="txt" id='txtt' >
            <input value={text} onChange={(e) => setText(e.target.value)} id='inputId' />
            <button onClick={() => { saveTitle(); setEdit(false) }} id='inputButtonId' style={{ color: color || LoginStyle?.login_color, background: colorbtn || LoginStyle?.buttonBg_color }}>save</button>
          </div> :
          <>
            <h3 id={"containerHeaderH11"}>{LoginStyle?.title}</h3>
            <button id='buttonId' onClick={() => { setText(LoginStyle?.title); setEdit(true) }} style={{ color: color || LoginStyle?.login_color, background: colorbtn || LoginStyle?.buttonBg_color }}>
              edit

            </button>
          </>
      }

      <div className="setings-div">
        <div className="setings">
          <div>
            <span>Header,Footer,Login background Color: </span>
            <input type="color" value={bgcolor || LoginStyle.loginBg_color} onChange={(e) => { setBgColor(e.target.value) }}></input>
          </div>
          <div>
            <span>Login Color: </span>
            <input type="color" value={color || LoginStyle?.login_color} onChange={(e) => { setColor(e.target.value) }}></input>
          </div>
          <div>
            <span>Button background Color: </span>
            <input type="color" value={colorbtn || LoginStyle.buttonBg_color} onChange={(e) => { setColorbtn(e.target.value) }}></input>
          </div>
          <button style={{ color: color || LoginStyle?.login_color, background: colorbtn || LoginStyle?.buttonBg_color }} onClick={() => saveLocalstorage()}>save</button>
        </div>
        <div className="setings-text">
          <input type="text" value={signup || LoginStyle?.signUp_title} onChange={(e) => setSignup(e.target.value)} />
          <input type="text" value={login || LoginStyle?.login_title} onChange={(e) => setLogin(e.target.value)} />
          <input type="text" value={passwordd || LoginStyle?.password_title} onChange={(e) => setPasswordd(e.target.value)} />
          <input type="text" value={registration || LoginStyle?.registration_title} onChange={(e) => setRegistration(e.target.value)} />
          <input type="text" value={remember || LoginStyle?.remember_title} onChange={(e) => setRemember(e.target.value)} />
          <input type="text" value={signin || LoginStyle?.signIn_title} onChange={(e) => setSignin(e.target.value)} />
          <button style={{ color: color || LoginStyle?.login_color, background: colorbtn || LoginStyle?.buttonBg_color }} onClick={() => saveLocalstorageValue()}>save</button>
        </div>
      </div>
    </div>
  )
}
