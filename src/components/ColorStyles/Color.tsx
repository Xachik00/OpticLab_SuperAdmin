import { useState, useEffect } from "react";
import "./Color.scss";
import { CheckSquareOutlined, EditOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload } from "../upload";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMirrorColors } from "../../store/action/MirrorColorsAction";
import adminaxios from "../../axios/adminaxios";

interface IEditValue  {
  id: number | undefined,
  title_div: string | undefined,
  title: string | undefined ,
  text: string | undefined ,
  color?: string | undefined ,
  note:string | null | any,

}



export function Color() {
  const {MirrorColors}=useAppSelector(state=>state.MirrorColors)
  const { image } = useAppSelector(state => state.image)
  const dispatch = useAppDispatch()
  const name='Mirror Colors'
  console.log(MirrorColors);
  
  useEffect(() => {
    dispatch(fetchMirrorColors(name));
}, [dispatch]);
  
  // const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [shows, setShows] = useState(false);
  // const [value1, setValue1] = useState(" Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.");
  const [textValue, setTextValue] = useState<any>();
  const [showss, setShowss] = useState(-1);
  const [editValue,setEditValue] = useState<IEditValue>();
  useEffect(() => {
    dispatch(fetchMirrorColors(name));
  }, [dispatch]);


  async function changeColor(){
    try{
      console.log(editValue);
      const response = await adminaxios.put(`styles`,editValue);

      setShowss(-1);
      await dispatch(fetchMirrorColors(name))
      
    }
    catch(error){
      console.log(error);
      
    }

  }

  return (
    <div className="color" >
      <div className="line_div1">
        <div className="line1"></div>
          <>
            <p className="mirorparagraph" >{MirrorColors[0]?.title_div}</p>
            <div>
                    </div>
          </>
        <div className="line1"></div>
      </div>
      <div className="gridContainer" >
        {MirrorColors?.map((el, index) => (
          <div key={index} className="gridik">
            {showss === index ? 
                <div key={el.id} className='color_div'>
                  <input type="color" value={editValue?.color} onChange={(e)=>setEditValue({
                      id:editValue?.id,
                      title_div:editValue?.title_div,
                      title:editValue?.title,
                      text:editValue?.text,
                      color:e.target.value,
                      note:editValue?.note,

                    })} style={{height:'200px',width:'200px'}}/>
                  <div className='color_div_image'>
                    {/* <img src={el.image} /> */}
                    <input type="text"  value={editValue?.title} onChange={(e)=> setEditValue({
                      id:editValue?.id,
                      title_div:editValue?.title_div,
                      title:e.target.value,
                      text:editValue?.text,
                      color:editValue?.color,
                      note:editValue?.note,

                    })} name="text" id="text" />
                    <textarea name="text"  value={editValue?.text}   rows={5}
                    onChange={(e)=> setEditValue({
                      id:editValue?.id,
                      title_div:editValue?.title_div,
                      title:editValue?.title,
                      text:e.target.value,
                      color:editValue?.color,
                      note:editValue?.note,

                    })}
                    
                    />
                  </div>
                <CheckSquareOutlined onClick={()=>changeColor()} />
                <CloseOutlined onClick={()=>setShowss(-1)} />
                </div>
            : 
                <div key={el.id} className='color_div'>
                  <div className='color_div_image'  >
                    {/* <img src={el.image} /> */}
                    <div className="img" style={{background:el.color}}></div>
                    <p>{el.title}</p>
                  <span></span>
                  </div>
                  <p>{el.text}</p>
                  <EditOutlined onClick={() => {setShowss(index);setEditValue({
                      id:el?.id,
                      title_div:el?.title_div,
                      title:el?.title,
                      text:el?.text,
                      color:el?.color,
                      note:el?.note,

                    })}} />
                  <DeleteOutlined />
                </div>
                
            }
          </div>
        ))}
      </div>
      <ul className="liText">
        {shows ? (
          <>
            <textarea
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
            />
            <CheckSquareOutlined />
          </>
        ) : (
          <>
            <li>{MirrorColors[0]?.note}</li>

            <EditOutlined
              onClick={() => {
                setShows(!shows);
                setTextValue(MirrorColors[0]?.note);
              }}
            />
          </>
        )}
      </ul>
    </div>
  );
}
