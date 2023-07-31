import { useCallback, useEffect, useRef, useState } from 'react';
import "./Clip.scss"
import { Upload } from '../upload';
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchClip,fetchAddClip ,deleteClip,EditeClip} from "../../store/action/ClipAction";
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, FullscreenOutlined } from '@ant-design/icons';
import { CheckSquareOutlined,CloseOutlined,EditOutlined } from '@ant-design/icons';
import { RemoveItem } from '../removeItem';
import { ViewImage } from '../viewImage';


export function Clip() {
  const {Clip,loading}:any=useAppSelector(state=>state.Clip);
  const idd:number = Clip[0]?.id;
  
  
  const { image }: any = useAppSelector((state) => state.image);
  const navigate=useNavigate()
  const dispatch = useAppDispatch()
  const name='Clip Styles'
  const [addimg, setAddimg] = useState(false)
  const [view,setView]=useState(-1)
  const [deletePage,setDeletePage]=useState(-1)
  
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


async function deleteImage() {
  await dispatch(deleteClip(name,idd))
  navigate(0)
}
  return (
    <>{loading ? <div style={{ margin: '100px' }}>Loading</div> :
      <div className="photoGalery ">
        <div className="line_div">
          <div className="line"></div>
          <p>Clip Style</p>
          <div className="line"></div>
        </div>
          <div className="imageDiv">
            {Clip?.map((el: any, idx: number) => (
              <div
                key={idx}
                className='imagesItem'
              >

                <img src={el.image} />

                <div className="deleteviewDiv">
                <FullscreenOutlined onClick={()=>setView(idx)}/>
                  <DeleteOutlined onClick={() =>{ setDeletePage(el.id)}} className="deleteImages" />
                  </div>
              </div>
            ))}
            <button className="uploadImage" onClick={() => setAddimg(true)}><Upload name={'Clip'} /></button>
          </div>
        {deletePage!==-1&&<RemoveItem deleteItem={deleteImage} name={'Image'} setDeletePage={setDeletePage} id={deletePage}/>}
        {view!==-1&&<ViewImage id={view} imageArr={Clip} setView={setView}/>}
      </div>}</>
  );
}