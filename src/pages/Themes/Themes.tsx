import React, { useEffect, useState } from 'react'
import "./Themes.scss"
import { Eddditor } from '../../components/Editor';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchThemes } from '../../store/action/ThemesAction';

export  function Themes() {
  const [edit,setEdit]=useState(false)
  const {Themes}:any=useAppSelector(state=>state.Themes)
  const dispatch=useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchThemes())

  },[dispatch])

    return (
    <div className="themes">
      <div className='line_div'>
        <div className='line'></div>
        <p>{Themes.title_div}</p>
        <div className='line'></div>
      </div>
      {
        edit?<Eddditor setEdit={setEdit} value={Themes.text}/>:
        <>
          <div dangerouslySetInnerHTML={{ __html: Themes.text }} />
          <button onClick={()=>setEdit(true)}>edit</button>
        </>
      }
      
      

    </div>
  );
}
