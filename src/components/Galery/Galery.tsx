import { useCallback, useEffect, useRef, useState } from "react";
import "./Galery.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Upload } from "../../components/upload";
import { fetchHome, fetchAddHome, deleteHome } from "../../store/action/HomeAction";
import { DeleteOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RemoveItem } from "../removeItem";
import { ViewImage } from "../viewImage";

export function Galery() {
  const { image }: any = useAppSelector((state) => state.image);
  const { Home, loading }: any = useAppSelector((state) => state.Home)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [id,setId]=useState(0)
  const [add, setAdd] = useState(false);
  const [view, setView] = useState(-1);
  const [deletePage,setDeletePage]=useState(false)


  useEffect(() => {
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


  async function deleteImage(id: number) {
    await dispatch(deleteHome(id))
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
    <>{loading ? <div style={{ margin: '100px' }}>Loading</div> :
      <div className="photoGalery">
        <div className="line_div">
          <div className="line"></div>
          <p>Photo Galery</p>
          <div className="line"></div>
        </div>
          <div className="imageDiv">
            {Home?.map((el: any, idx: number) => (
              <div
                key={idx}
                className='imagesItem'
                onClick={() => {
                  setIndex(idx);
                }}
              >

                <img src={el.image} />

                <div className="deleteviewDiv">
                <FullscreenOutlined onClick={()=>setView(idx)}/>
                  <DeleteOutlined onClick={() =>{ setDeletePage(true);setId(el.id)}} className="deleteImages" />
                  </div>
              </div>
            ))}
            <button className="uploadImage" onClick={() => setAdd(true)}><Upload name={'Galery'} /></button>
          </div>
        {deletePage&&<RemoveItem deleteItem={deleteImage} name={'Image'} setDeletePage={setDeletePage} id={id}/>}
        {view!==-1&&<ViewImage id={view} imageArr={Home} setView={setView}/>}
      </div>}</>
  );
}
