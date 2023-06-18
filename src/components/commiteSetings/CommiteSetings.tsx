import './CommiteSetings.scss'
import { useEffect ,useState} from 'react'
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMessige,EditMessige,DeleteMessige } from "../../store/action/MessigeAction";
import { FolderViewOutlined,DeleteOutlined } from '@ant-design/icons';
import { RemoveItem } from '../removeItem';


export const CommiteSetings = () => {

  const { Messige } = useAppSelector(state => state.Messige)

  const dispatch = useAppDispatch()
  const [deletePage,setDeletePage]=useState(false)
  const [id,setId]=useState(0)

  
  useEffect(() => {
    dispatch(fetchMessige());
  }, [dispatch,deletePage]);


  function editMessige(id:number){
    dispatch(EditMessige(id))
    dispatch(fetchMessige());

  }
  
  function deleteItem(id:number){
    dispatch(DeleteMessige(id))
    dispatch(fetchMessige());
    setDeletePage(false)

  }

  return (
    <div className='CommiteSetings'>
      <table>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Commit for user</th>
          <th>seting</th>
        </tr>
        <>
          {Messige?.map((el, index) =>
            <tr className={index % 2  ? !el.seen? 'sev seen' :  'sev' :   !el.seen ? 'seen ' : ''} >
              <td>{index + 1}{!el.seen&&<p>new</p>}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.message}</td>
              <td className='del'><div onClick={()=>editMessige(el.id)}><FolderViewOutlined /></div><div onClick={()=>{setDeletePage(true);setId(el.id)}}><DeleteOutlined /></div> </td>
            </tr>
          )} </>
      </table>
      {deletePage&&<RemoveItem deleteItem={deleteItem} setDeletePage={setDeletePage} id={id}/>}
    </div>
  )
}
