/*eslint-disabled */
import "./Style.scss";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";
import adminaxios from "../../axios/adminaxios";


export  function Style() {
    const { LoginStyle }:any = useAppSelector(state => state.LoginStyle);
    const dispatch = useAppDispatch()
  const [color, setColor] = useState<any>()
  const [colorbtn, setColorbtn] = useState<any>()
  const [bgcolor, setBgColor] = useState<any>()



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

    async function saveLocalstorage() {
      const newColor = {
        loginBg_color: bgcolor,
        login_color: color,
        buttonBg_color: colorbtn
      }
      await adminaxios.put('changeLoginOptions', newColor)
      dispatch(fetchLoginStyle())
    }

    async function saveLocalstorageValue() {
        const newText = {
          login_title: login,
          password_title: passwordd,
          signUp_title: signup,
          signIn_title: signin,
          registration_title: registration,
          remember_title: remember
        }
        await adminaxios.put(`changeLoginOptions`, newText)
      }


      async function saveTitle() {
        const newTitle = {
          title: text
        }
        await adminaxios.put(`changeLoginOptions`, newTitle)
    
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
                  <button id='buttonId' onClick={() => {setText(LoginStyle?.title);setEdit(true)}} style={{ color: color || LoginStyle?.login_color, background: colorbtn || LoginStyle?.buttonBg_color }}>
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
