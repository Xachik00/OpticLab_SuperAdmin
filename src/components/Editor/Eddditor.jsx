import { useState, useRef,} from "react";
import JoditEditor from "jodit-react";
import "./Editor.scss";
import { useNavigate } from "react-router-dom";


export  function Eddditor({setEdit}) {
 
 
  const navigate=useNavigate()
  const editor = useRef(null);
  
  const [content, setContent] = useState(localStorage.getItem('editor')||"Start writing");
  const config = {
    readonly: false,
    height: 'auto'
  };
  const handleUpdate = (event) => {
    setContent(event);
  };

  const handleclick = (e) => {

    localStorage.removeItem('editor')
    localStorage.setItem('editor',content)
    setContent(e);
  }
  return (
    <div className="App">
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
      />
      <div className="saveButton btn " onClick={()=> {handleclick();navigate(0)}} > <button>Save</button></div>
    </div>
    
  );
}