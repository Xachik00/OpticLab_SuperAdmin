import { useCallback, useEffect, useRef, useState } from 'react';
import "./Clip.scss"
import { Upload } from '../upload';
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchClip,fetchAddClip ,deleteClip,EditeClip} from "../../store/action/ClipAction";
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { CheckSquareOutlined,CloseOutlined,EditOutlined } from '@ant-design/icons';


export function Clip() {
  const {Clip}:any=useAppSelector(state=>state.Clip);
  const idd:number = Clip[0]?.id;
  
  
  const { image }: any = useAppSelector((state) => state.image);
  const navigate=useNavigate()
  const dispatch = useAppDispatch()
  const name='Clip Styles'
  const [addimg, setAddimg] = useState(false)


  const [showEdit, setShowEdit] = useState('');
  const [valueTitle, setValueTitle] = useState<any>("");

  useEffect(() => {
    dispatch(fetchClip(name));
    
}, [dispatch]);
  
useEffect(() => {
  if (addimg && image.length !== '' && image != null && image != undefined && image   ) {
      dispatch(fetchAddClip(name,image))
      navigate(0)
      setAddimg(false)
      
    }
}, [image,dispatch])


function deleteImage() {
  dispatch(deleteClip(name,idd))
  // navigate(0)
}

function edite(){
  dispatch(EditeClip(idd,valueTitle))
}

  const delay = 2000;
  const [index, setIndex] = useState(0);

  const timeoutRef: any = useRef(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const fun = useCallback(() => {

    timeoutRef.current = setTimeout(() => {
      setIndex((x) => (x === Clip.length - 1 ? 0 : x + 1));
    }, delay);
  }, [Clip.length]);

  useEffect(() => {
    resetTimeout();
    fun();


    return () => {
      resetTimeout();

    };
  }, [resetTimeout, fun, Clip.length, setIndex, index]);


  return (
    <div className='Clip'>
      <div className='Clip_line_div'>
        <div className='Clip_line'></div>
        {showEdit === Clip[0]?.title_div ? (
          <div className="text_divv">
            <input className="line_input"
              type="text"
              onChange={(e) => {
                setValueTitle(e.target.value);
              }}
              value={valueTitle}
            />
              <div className= "checkk" >
              <CheckSquareOutlined onClick={() =>{ setShowEdit(Clip[0].title_div);
                edite()
              } 
                }  />
              <CloseOutlined onClick={()=>setShowEdit('')}/>

            </div>
          </div>
        ) : (
          <>
            <p>{Clip[0]?.title_div} </p>
            <EditOutlined
              onClick={() => {
                setShowEdit(Clip[0]?.title_div);
                setValueTitle(Clip[0]?.title_div);
              }}
            />
          </>
        )}
        </div>
      <div
        className="Clip_slideshow"
      >
        <div
          className="Clip_slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >

          {Clip.map((el:any, index:number) => (
            <div className={index < index + 1 && index > index - 1 ? "Clip_activee" : "Clip_aslide"} key={index} onClick={() => {setIndex(index)}}>
              {
                <img src={el?.image} />
              }
            </div>
          ))}

        </div>
        <div className='Clip_slideshowDots_111'>
          <div className="Clip_slideshowDots">
            {Clip.map((el:any, idx:number) => (
              <div key={idx} className={`Clip_slideshowDot${index === idx ? " active" : ""}`} onClick={() => {setIndex(idx)}}> 
                <img src={el.image} /> 
                <DeleteOutlined onClick={() => deleteImage()} />  

              </div>
            ))}
          </div>
          <button onClick={()=>{setAddimg(true) }}>
          <Upload name={'Clip'} />
          </button>
        </div>
      </div>

    </div>
  )
}