import { useCallback, useEffect, useRef, useState } from "react";
import "./Galery.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Upload } from "../../components/upload";
import { fetchHome, fetchAddHome, deleteHome } from "../../store/action/HomeAction";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function Galery() {
  const { image }: any = useAppSelector((state) => state.image);
  const { Home }: any = useAppSelector((state) => state.Home)
  const dispatch = useAppDispatch();
const [add,setAdd]=useState(false);
  const navigate = useNavigate()

  useEffect( () => {
     dispatch(fetchHome())
    }, [dispatch])

  useEffect(() => {
    if (image.length !== '' && image != null && image != undefined && image && add) {
      dispatch(fetchAddHome(image))
      navigate(0)
      setAdd(false)
    }
  }, [image, dispatch])


  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef: any = useRef(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);


  function deleteImage(id: number) {
    dispatch(deleteHome(id))
    navigate(0)
  }

  const fun = useCallback(() => {

    timeoutRef.current = setTimeout(() => {

      setIndex((x) => (x === Home.length - 1 ? 0 : x + 1));
    }, delay);
  }, [Home.length]);

  useEffect(() => {
    resetTimeout();
    fun();

    return () => {
      resetTimeout();

    };
  }, [resetTimeout, fun, Home.length, setIndex, index]);

  
  return (
    <>{Home[0]==undefined?<div style={{margin:'100px'}}>Loading</div>:
    <div>
      <div className="line_div">
        <div className="line"></div>
        <p>Photo Galery</p>
        <div className="line"></div>
      </div>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 70}%, 0, 0)` }}
        >
          {Home?.map((el: any, inde: number) => (
            <div
              className={index !== inde ? "activee" : "activee aaa"}
              key={inde}
              onClick={() => {
                setIndex(inde);
              }}
            >
              <img src={el.image} />
            </div>
          ))}
        </div>
        <div className="slideshowDots_111">
          <div className="slideshowDots">
            {Home?.map((el: any, idx: number) => (
              <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}
              >

                <img src={el.image} />

                <DeleteOutlined onClick={() => deleteImage(el.id)} />
              </div>
            ))}
            <button className="bbb111" onClick={() => setAdd(true)}><Upload  name={'Galery'}/></button>
          </div>
        </div>
      </div>
    </div>}</>
  );
}
