// import React from 'react'
import "./Modal.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import adminAxios from '../../axios/adminaxios';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


export default function Modal() {
    
    const navigate=useNavigate()
    const [inputActive, setIputActive] = useState(true)

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(user);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v2 = PWD_REGEX.test(pwd);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }
       
        try {
            
            const response = await  adminAxios({
                method: 'post',
                url: 'createAdmin',
                data: {
                  username: user,
                  password: pwd
                }
              });
           
              console.log(response);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/home')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
     }

  return (


    <div className={'modal1'} >
        <div className={ 'modal_content1' } onClick={e=>e.stopPropagation()}>
              <div className='contain'>
                <p className='p1'><h1>Registration on the site</h1></p>
                <form onSubmit={handleSubmit} className='containform'>
                    <div className='inputs'>
                        <p>UserName</p>
                      <input
                     type="text"
                     id="username"
                     ref={userRef}
                     autoComplete="off"
                     onChange={(e) => setUser(e.target.value)}
                     value={user}
                     required
                     aria-invalid={validName ? "false" : "true"}
                     aria-describedby="uidnote"
                     onFocus={() => setUserFocus(true)}
                     onBlur={() => setUserFocus(false)}
                 />


                         <p>Password</p>
                     <input
                     type="password"
                     id="password"
                     onChange={(e) => setPwd(e.target.value)}
                     value={pwd}
                     required
                     aria-invalid={validPwd ? "false" : "true"}
                     aria-describedby="pwdnote"
                     onFocus={() => setPwdFocus(true)}
                     onBlur={() => setPwdFocus(false)}
                 />



                         <p>Password</p>
                    <input
                     type="password"
                     id="confirm_pwd"
                     onChange={(e) => setMatchPwd(e.target.value)}
                     value={matchPwd}
                     required
                     aria-invalid={validMatch ? "false" : "true"}
                     aria-describedby="confirmnote"
                     onFocus={() => setMatchFocus(true)}
                     onBlur={() => setMatchFocus(false)}
                 />


                         {/* <p>Company Name</p> */}
                    {/* <input type="text" disabled={inputActive}  /> */}
                    </div>
                    
                    <div className='registraciabutton'>

                       <button disabled={!validName || !validPwd || !validMatch ? true : false}>Registration</button>

                    {/* <button onClick={()=>navigate(0)}>Go Back</button> */}
                    
                    </div>
                             

                    </form>
                </div>
              </div>
        </div>

    
  )
}

