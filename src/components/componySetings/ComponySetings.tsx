import './ComponySetings.scss'
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchCompany } from "../../store/action/CompanyAction";
import { imageSlice } from '../../store/slice/GovernmetMembersFullInfo';
import { EditOutlined, CloseOutlined, CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from '../../axios/adminaxios'
import { Upload } from '../../components/upload'

export const ComponySetings = () => {
  const { image }: any = useAppSelector((state) => state.image);
   const [images,setImages]=useState(image)

    const { Company } = useAppSelector(state => state.Company)
  const dispatch = useAppDispatch()
  const [edite, setEdite] = useState(false)
  const [add, setAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [itemChange, setItemChange] = useState('')

  useEffect(()=>{
    setItemChange(image)
    setImages(image)
    
  },[image])
    useEffect(() => {
        dispatch(fetchCompany())
      }, [dispatch])
 
      async function Edit(el:any) {
        try {
              const response = await axios.put('changeCompanySettings', {
              [el]:itemChange,
            }); 
          
          dispatch(fetchCompany())
          setEdite(false)
        }
        catch (error) {
    
        }
      }

      async function deletes(id: any) {

        try {
          const response = await axios.delete(`deleteCompanySettings/${id}`, {
    
          });
          
          dispatch(fetchCompany())
    
        }
        catch (error) {
    
        }
    
      }
      async function addItem(e: any) {
        e.preventDefault()
    
        try {
          const response = await axios.post('addCompanySettings', {
         [title]:text,
           
          });
          setAdd(false)
          dispatch(fetchCompany())
    
        }
        catch (error) {
    
        }
      }
  return (
    <div className='ComponySetings'>
      <div className="Setings-sayt">
            <h3>COMPONY SETTINGS</h3>
 
            
            
      {Company.map((el:any) => (
         Object.keys(el).map((key) => (key !== "id" && key !== "created_at" && key !== "updated_at" && <div className='box'>
          <div key={key} className='info_box'>
              { <span>{key}:</span>}
              {key === "logo" &&  <div className="edit_img" > <img src={images ? images : el[key]} alt="" /> {edite === el[key] && <div id="uploadimg"> <Upload name="COMPONY SETTINGS" /> </div>}</div>  }
              { key !== "logo" && <div>{edite ===el[key] ?  <input className='changeInput' type="text"  value={itemChange} onChange={(e)=>{setItemChange(e.target.value)}} />:<span>{el[key]}</span>}</div> }
            </div>
            <div className="About_edit">
            {edite === el[key] ? < CloseOutlined
              onClick={() => {setEdite(false);setImages('')}}
            /> : <EditOutlined onClick={() => {
              setEdite(el[key])
              setItemChange(el[key])
            ;
            }} />}
            {edite === el[key] ?
              <   CheckSquareOutlined onClick={() => { Edit(key) }} />: <DeleteOutlined onClick={() => { deletes(key) }} /> }
          </div></div>
          ))
      ))}
            <p className="addbtn" onClick={() => { setAdd(!add) }}>+ ADD</p>
      {
        add && <form className="addItem" onSubmit={(e) => { addItem(e) }}>
          <label htmlFor="">Column name</label>
          <input type="text" required={true} onChange={(e) => { setTitle(e.target.value) }} />
          <label htmlFor="">Column value</label>
          <input type="text" required={true} onChange={(e) => { setText(e.target.value) }} />
         
          <input type="submit" value="Save" />
        </form>
      }
      </div>
  
    </div>
  )
}
