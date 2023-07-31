import { useState, useEffect } from "react";
import "./Lens.scss";
import { Color } from "../ColorStyles";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMirrorCoating } from "../../store/action/MirrorCoatingAction";
import { fetchAntiReflectiveCoating } from "../../store/action/AntiReflectiveCoatingAction";
import { EditOutlined, CloseOutlined, CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload } from "../upload";

export default function Lens() {

  const { MirrorCoating } = useAppSelector(state => state.MirrorCoating);
  const { AntiReflectiveCoating } = useAppSelector(state => state.AntiReflectiveCoating)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('Mirror Coating')
  const [name1, setName1] = useState('Anti-Reflective Coating')
  const [Show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState('');
  const [shows, setShows] = useState(-1);
  const [showss, setShowss] = useState(-1);
  const [valueTitle, setValueTitle] = useState("");
  const [valueTitle1, setValueTitle1] = useState("");
  const [textareaInput, setTextareaInput] = useState("");
  const [textareaInput1, setTextareaInput1] = useState("");
  useEffect(() => {
    dispatch(fetchMirrorCoating(name));
    dispatch(fetchAntiReflectiveCoating(name1))
  }, [dispatch]);
  
  
  return (
    <div className="lens">
      <div className="line_div">
        <div className="line"></div>
            <p>{MirrorCoating[0]?.title_div} </p>
        <div className="line"></div>
      </div>

      <div className="contaDiv">
        {MirrorCoating.map((el) =>
          shows === el.id ? (
            <div key={el.id} className="contaDiv_edit">
              <input className="contaDiv_input" type="text" value={valueTitle} onChange={(e) => { setValueTitle(e.target.value) }} />

              <textarea className="contaDiv_textarea"rows={53} cols={50} value={textareaInput} onChange={(e) => { setTextareaInput(e.target.value) }} />
              <CheckSquareOutlined />
              <CloseOutlined onClick={()=>setShows(-1)} />
            </div>
          ) : (
            <div key={el.id}>
              <p className="titleP">{el.title}</p>

              <p className="texta">{el.text}</p>
              <EditOutlined
                onClick={() => {
                  setShows(el.id)
                  setValueTitle(el.title);
                  setTextareaInput(el.text);
                }}
              />
              <DeleteOutlined />
            </div>
          )
        )}
        <div className="butt">
          <button className="submit" onClick={() => setShow(!Show)}>
            {Show ? "HIDDE" : "SHOW"} COLOR GUIDE
          </button>
        </div>
        {Show && <Color />}
      </div>
{/* 
      <div className="lens">
        <div className="line_div">
          <div className="line"></div>
          {showEdit === AntiReflectiveCoating[0]?.title_div ? (
          <div className="text_divv">
            
              <input
                type="text"
                onChange={(e) => {
                  setValueTitle(e.target.value);
                }}
                value={valueTitle}
                
              />
              <div  className= "checkk">
                <CheckSquareOutlined onClick={() => setShowEdit(AntiReflectiveCoating[0]?.title_div)} />
                <CloseOutlined onClick={()=>setShowEdit('')}/>
              </div>
            </div>
          ) : (
            < >
              <p>{AntiReflectiveCoating[0]?.title_div} </p>
              <EditOutlined
                onClick={() => {
                  setShowEdit(AntiReflectiveCoating[0]?.title_div);
                  setValueTitle(AntiReflectiveCoating[0]?.title_div);
                }}
              />
            </>
          )}
          <div className="line"></div>
        </div>

        <div className="classBottomm">
          {AntiReflectiveCoating?.map((el, index) => (
            <div className="classBottom" key={index}>
              {showss === el.id ?

                  <>

                  <div>
                    <Upload />
                    <img src={el.image} />
                  </div>

                  <div className="aaa">

                    <input type="text" value={valueTitle1} onChange={(e1) => { setValueTitle1(e1.target.value) }} />

                    <textarea value={textareaInput1} onChange={(e2) => { setTextareaInput1(e2.target.value) }} />
                  </div>
                  <div className="but">
                    <CheckSquareOutlined />
                    <CloseOutlined onClick={()=>setShowss(-1)}/>
                  </div>

                </> : <>
                  <div className="divImage1">
                    <img src={el.image} alt="Image" />
                  </div>

                  <div className="Lens_textaBottom">
                    <p className="textaBottomTitle">{el.title}</p>

                    <p className="textaM">{el.text}</p>
                  </div>
                  <EditOutlined
                    onClick={() => {
                      setShowss(el.id)
                      setValueTitle1(el.title);
                      setTextareaInput1(el.text);
                    }}
                  />
                  <DeleteOutlined />
                </>
              }
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
