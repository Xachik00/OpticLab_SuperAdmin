import { useState, useEffect } from "react";
import "./Color.scss";
import { CheckSquareOutlined, EditOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload } from "../upload";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMirrorColors } from "../../store/action/MirrorColorsAction";


export function Color() {
  const {MirrorColors}=useAppSelector(state=>state.MirrorColors)
  const { image } = useAppSelector(state => state.image)
  const dispatch = useAppDispatch()
  const name='Mirror Colors'
  
  useEffect(() => {
    dispatch(fetchMirrorColors(name));
}, [dispatch]);
  
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [shows, setShows] = useState(false);
  const [value1, setValue1] = useState(" Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.");
  const [textValue, setTextValue] = useState("");
  const [showss, setShowss] = useState(-1);
  useEffect(() => {
    dispatch(fetchMirrorColors(name));
  }, [dispatch]);

  return (
    <div className="color" >
      <div className="line_div1">
        <div className="line1"></div>
        {show ? (
          <>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <CheckSquareOutlined className="bbb" />
            <CloseOutlined className="bbb" onClick={() => setShow(false)} />
          </>
        ) : (
          <>
            <p className="mirorparagraph" >{MirrorColors[0]?.title_div}</p>
            <div>
              <EditOutlined
                onClick={() => {
                  setShow(!show);
                  setValue(MirrorColors[0].title_div);
                }}
              />
            </div>
          </>
        )}

        <div className="line1"></div>
      </div>
      <div className="gridContainer" >
        {MirrorColors?.map((el, index) => (
          <div key={index} className="gridik">
            {showss === index ? 
                <div key={el.id} className='color_div'>




                <div ><Upload name={'Color'} /></div>




                  <div className='color_div_image'>
                    <img src={el.image} />
                    <input type="text" value={el.title} name="" id="" />
                    <textarea name="" id="" value={el.text}/>
                  </div>
                <CheckSquareOutlined />
                <CloseOutlined />
                </div>
            : 
                <div key={el.id} className='color_div'>
                  <div className='color_div_image'>
                    <img src={el.image} />
                    <p>{el.title}</p>
                  <span></span>
                  </div>
                  <p>{el.text}</p>
                  <EditOutlined onClick={() => setShowss(index)} />
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
            <li>{value1}</li>

            <EditOutlined
              onClick={() => {
                setShows(!shows);
                setTextValue(value1);
              }}
            />
          </>
        )}
      </ul>
    </div>
  );
}
