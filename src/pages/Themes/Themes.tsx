import React, { useState } from 'react'
import "./Themes.scss"
import { Eddditor } from '../../components/Editor';

export  function Themes() {
  const [edit,setEdit]=useState(false)
  const [content, setContent] = useState(localStorage.getItem('editor')||(""));

  return (
    <div className="themes">
      <div className='line_div'>
        <div className='line'></div>
        <p>Terms and Conditions</p>
        <div className='line'></div>
      </div>
      {
        edit?<Eddditor setEdit={setEdit}/>:
        <>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <button onClick={()=>setEdit(true)}>edit</button>
        </>
      }
      
      

    </div>
  );
}
