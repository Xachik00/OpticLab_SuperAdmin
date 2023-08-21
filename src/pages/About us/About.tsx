import "./About.scss";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchAbout } from "../../store/action/AboutAction";
import { EditOutlined, CloseOutlined, CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from '../../axios/adminaxios'
import { Upload } from '../../components/upload'
import { uploadImage } from '../../store/action/governmentAddRemoveMembers'
import adminaxios from "../../axios/adminaxios";
export function About() {

  const { About } = useAppSelector(state => state.About)
  const { image }: any = useAppSelector((state) => state.image);

  const dispatch = useAppDispatch()
  const [name] = useState('Products and Services')
  const [edite, setEdite] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [add, setAdd] = useState(false)
  useEffect(() => {
    dispatch(fetchAbout(name))
  }, [dispatch, name])

  async function Edit(title_div: any) {

    try {
      if (image) {
        const response = await adminaxios.put('about', {
          id: edite,
          title_div: title_div,
          title: title,
          text: text,
          image: image

        }); setEdite(false)
      } else {
        const response = await adminaxios.put('about', {
          id: edite,
          title_div: title_div,
          title: title,
          text: text,

        }); setEdite(false); setText(''); setTitle("")
      }
      dispatch(fetchAbout(name))

    }
    catch (error) {

    }


  }
  async function deletes(id: any) {

    try {
      const response = await axios.delete(`about/${id}`, {

      });
      setText(''); setTitle("")
      dispatch(fetchAbout(name))

    }
    catch (error) {

    }

  }
  async function addItem(e: any) {
    e.preventDefault()

    try {
      const response = await axios.post('about/add', {

        title_div: "Products and Services",
        title: title,
        text: text,
        image: image

      });
      setAdd(false)
      dispatch(fetchAbout(name))

    }
    catch (error) {

    }
  }
 

  return (
    <div className="about">
      <div className="line_div">
        <div className="line"></div>
        <p>{About[0]?.title_div}</p>
        <div className="line"></div>
      </div>
      {
        About?.map((el: any, index: number) =>
          <div className="About_div" key={el.id}>
            {index % 2 === 0 ? <div className="About_box">
              <div className="div_box">
                {edite === el.id ? <div className="edit_img" > <img src={image ? image : el.image} alt="" /> <div id="uploadimg"> <Upload name={About[0]?.title_div} /> </div></div> : <img src={el.image} alt="" />}
                <div>
                  {edite === el.id ? <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /> : <h2>{el.title}</h2>}
                  {edite === el.id ? < TextArea
                    rows={8}
                    cols={100}
                    //  maxLength={130}
                    className="textarea"
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                  />
                    : <p>{el.text}</p>}
                  </div>
              </div>

              <div className="About_edit">
                {edite === el.id ? < CloseOutlined
                  onClick={() => setEdite(false)}
                /> : <EditOutlined onClick={() => {
                  setEdite(el.id)
                  setTitle(el?.title);
                  setText(el?.text);
                }} />}
                {edite === el.id ?
                  <   CheckSquareOutlined onClick={() => { Edit(el.title_div) }} /> : <DeleteOutlined onClick={() => { deletes(el.id) }} />}
              </div>
            </div> : <div className="About_box">
              <div className="div_box">
                <div>
                  {edite === el.id ? <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /> : <h2>{el.title}</h2>}
                  {edite === el.id ? < TextArea
                    rows={8}
                    cols={100}
                    maxLength={130}
                    className="textarea"
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                  />
                  : <p>{el.text}</p>}
                </div>
                {edite === el.id ? <div className="edit_img" > <img src={image ? image : el.image} alt="" /> <div id="uploadimg"> <Upload name={About[0]?.title_div} /> </div> </div> : <img src={el.image} alt="" />}
              </div>

              <div className="About_edit">
                {edite === el.id ? < CloseOutlined
                  onClick={() => setEdite(false)}
                /> : <EditOutlined onClick={() => {
                  setEdite(el.id)
                  setTitle(el?.title);
                  setText(el?.text);
                }} />}
                {edite === el.id ?
                  <   CheckSquareOutlined onClick={() => { Edit(el.title_div) }} /> : <DeleteOutlined onClick={() => { deletes(el.id) }} />}
              </div>
            </div>}
          </div>)
      }
      <p className="addbtn" onClick={() => { setAdd(!add) }}>+ ADD</p>
      {
        add && <form className="addItem" onSubmit={(e) => { addItem(e) }}>
          <label htmlFor="">Title</label>
          <input type="text" required={true} onChange={(e) => { setTitle(e.target.value) }} />
          <label htmlFor="">Text</label>
          <input type="text" required={true} onChange={(e) => { setText(e.target.value) }} />
          <label htmlFor="">Upload Image</label>
         {image && <img src={image} alt="Upload image" />}
          <Upload name="Products and Services" />
          <input type="submit" value="Save" />
        </form>
      }
    </div>
  );
}