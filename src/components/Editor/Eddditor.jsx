import { useState, useRef,} from "react";
import JoditEditor from "jodit-react";
import "./Editor.scss";
import { useNavigate } from "react-router-dom";
import { fetchEditThemes } from "../../store/action/ThemesAction";
import { useAppDispatch } from "../../hooks/redux";


export  function Eddditor({setEdit,value}) {
 
 
  const navigate=useNavigate()
  const editor = useRef(null);
  const dispatch=useAppDispatch()
  
  const [content, setContent] = useState(value);
  const config = {
    readonly: false,
    height: 'auto'
  };
  const handleUpdate = (event) => {
    setContent(event);
  };

  const handleclick =async (e) => {
    const newContent={
      text:content
    };
    await dispatch(fetchEditThemes(newContent))
    setContent(e)
    setEdit(false)
  }
  return (
    <div className="App">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
      />
      <div className="saveButton btn " onClick={()=> {handleclick()}} > <button>Save</button></div>
    </div>
    
  );
}