import "./Lens.scss";
import { Upload } from "../upload";
import { RemoveItem } from "../removeItem";
import { useState, useEffect } from "react";
import { Color } from "../ColorStyles";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMirrorCoating, editStyles, addStyles, deleteMiror } from "../../store/action/MirrorCoatingAction";
import { fetchAntiReflectiveCoating } from "../../store/action/AntiReflectiveCoatingAction";
import { EditOutlined, CloseOutlined, CheckSquareOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
export default function Lens() {

  const { MirrorCoating } = useAppSelector(state => state.MirrorCoating);
  const { AntiReflectiveCoating } = useAppSelector(state => state.AntiReflectiveCoating)
  const { image } = useAppSelector((state) => state.image);
  
  const dispatch = useAppDispatch()
  
  const name = "Mirror Coating";
  const name1 = 'Anti-Reflective Coating'
  
  const [shows, setShows] = useState(-1);
  const [Show, setShow] = useState(false);
  const [showss, setShowss] = useState(-1);
  const [addAnti, setAddAnti] = useState<any>({});
  const [imageState, setImageState] = useState('')
  const [valueTitle, setValueTitle] = useState("");
  const [deleteItem, setDeleteItem] = useState(-1)
  const [addValue, setAddValue] = useState<any>({})
  const [addMirror, setAddMirror] = useState(false);
  const [antiActive, setAntiActive] = useState(false);
  const [errorValue, setErrorValue] = useState(false);
  const [antiValue, setAntiValue] = useState<any>({});
  const [textareaInput, setTextareaInput] = useState("");
  useEffect(() => {
    if (image && image !== null && image !== undefined) {
      setImageState(image)
    }
  }, [image])
  useEffect(() => {
    dispatch(fetchMirrorCoating(name));
    dispatch(fetchAntiReflectiveCoating(name1))
  }, [dispatch]);

  async function editText(id: number) {
    const newArr = {
      id,
      title: valueTitle,
      text: textareaInput
    }
    await dispatch(editStyles(newArr))
    await dispatch(fetchMirrorCoating(name))
    setShows(-1)
  }
  async function addMir(name: string) {
    if (name == name1) {
      if (!addAnti?.title || !addAnti?.text) {
        setErrorValue(true)
      } else {
        const newAnti = {
          title_div: name,
          image: imageState,
          ...addAnti
        }

        await dispatch(addStyles(newAnti))
        await dispatch(fetchAntiReflectiveCoating(name1))
        setAddAnti({})
        setAntiActive(false)
        setImageState('')
      }
    } else {
      if (!addValue?.title || !addValue?.text) {
        setErrorValue(true)
        console.log(addAnti);
      } else {
        const newMiror = {
          title_div: name,
          ...addValue
        }
        console.log(addAnti);

        await dispatch(addStyles(newMiror))
        await dispatch(fetchMirrorCoating(name))
        setAddValue({})
        setAddMirror(false)
        setImageState('')
      }
    }

  }
  async function deleteMirorItem(id: number) {
    await dispatch(deleteMiror(id))
    await dispatch(fetchMirrorCoating(name))
    await dispatch(fetchAntiReflectiveCoating(name1))
  }
  async function changeAntiCoating() {
    const newAntiCoating =
    {
      image: imageState || antiValue?.image,
      ...antiValue,
    }
    await dispatch(editStyles(newAntiCoating));
    await dispatch(fetchAntiReflectiveCoating(name1));

    setShowss(-1)

  }

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

              <textarea className="contaDiv_textarea" rows={12} cols={50} value={textareaInput} onChange={(e) => { setTextareaInput(e.target.value) }} />
              <CheckSquareOutlined onClick={() => {
                editText(el.id);
              }} />
              <CloseOutlined onClick={() => setShows(-1)} />
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
              <DeleteOutlined onClick={() => setDeleteItem(el.id)} />
            </div>
          )
        )}
        <div>
          < PlusCircleOutlined onClick={() => setAddMirror(true)} />
          {addMirror &&
            <div className={errorValue ? 'addMiror errorMiror ' : "addMiror"}>
              <input type="text" placeholder="Write new mirorr name" value={addValue?.title} onChange={(e) => setAddValue({
                title: e.target.value,
                text: addValue?.text,
              })} />

              <textarea cols={20} rows={7} value={addValue?.text}
                placeholder="Write new mirorr text"
                onChange={(e: any) => setAddValue({
                  title: addValue?.title,
                  text: e.target.value,
                })}
              />

              <CloseOutlined onClick={() => { setAddValue({}); setAddMirror(false); setErrorValue(false) }} />
              <CheckSquareOutlined onClick={() => addMir('Mirror Coating')} />

            </div>
          }
        </div>
        <div className="butt">
          <button className="submit" onClick={() => setShow(!Show)}>
            {Show ? "HIDDE" : "SHOW"} COLOR GUIDE
          </button>
        </div>
        {Show && <Color />}
      </div>

      <div className="lens">
        <div className="line_div">
          <div className="line"></div>
          <div className="text_divv">


            <div className="checkk">
            </div>
          </div>

          < >
            <p>{AntiReflectiveCoating[0]?.title_div} </p>
          </>
          <div className="line"></div>
        </div>

        <div className="classBottomm">
          {AntiReflectiveCoating?.map((el, index) => (
            <div className={showss === el.id ? "classBottom classBottom1" : "classBottom"} key={index}>
              {showss === el.id ?

                <>
                  <div>
                    <Upload name={name1} />
                    <div className="imageDivEdit" >  <img src={imageState || el.image} /> </div>
                  </div>

                  <div className="aaa">

                    <input type="text" value={antiValue?.title} onChange={(e) => {
                      setAntiValue({
                        id: el?.id,
                        title_div: antiValue?.title_div,
                        title: e.target.value,
                        text: antiValue?.text,
                      })
                    }} />

                    <textarea cols={30} rows={10} value={antiValue?.text}

                      onChange={(e) => {

                        setAntiValue({
                          id: el?.id,
                          title_div: antiValue?.title_div,
                          title: antiValue?.title,
                          text: e.target.value,

                        })
                      }}
                    />
                  </div>
                  <div className="but">
                    <CheckSquareOutlined onClick={() => changeAntiCoating()} />
                    <CloseOutlined onClick={() => setShowss(-1)} />
                  </div>

                </> : <>
                  <div className="editDiv">
                    <div className="divImage1">
                      <img src={el.image} alt="Image" />
                    </div>
                    <div className="Lens_textaBottom">
                      <p className="textaBottomTitle">{el.title}</p>

                      <p className="textaM">{el.text}</p>
                    </div>

                  </div>
                  <EditOutlined
                    onClick={() => {
                      setShowss(el?.id)
                        ;
                      setAntiValue({
                        id: el?.id,
                        title_div: el?.title_div,
                        title: el?.title,
                        text: el?.text,

                      })
                    }}
                  />
                  <DeleteOutlined onClick={() => setDeleteItem(el.id)} />



                </>
              }

            </div>
          ))}
        </div>
        {!antiActive && <PlusCircleOutlined onClick={() => setAntiActive(true)} />}
        {antiActive &&
          <div className={errorValue ? 'addMiror errorMiror ' : "addMiror"}>
            <div>
              {imageState ?
                <img src={imageState} alt="AntiImage" /> :
                <Upload name={name1} />}
            </div>
            <input type="text" placeholder="Write new antiReflection coating name" value={addAnti?.title} onChange={(e) => setAddAnti({
              title: e.target.value,
              text: addAnti?.text,
            })} />

            <textarea cols={20} rows={7} value={addAnti?.text}
              placeholder="Write new antiReflection coating text"
              onChange={(e: any) => setAddAnti({
                title: addAnti?.title,
                text: e.target.value,
              })}
            />

            <CloseOutlined onClick={() => { setAddAnti({}); setAntiActive(false); setErrorValue(false);setImageState('') }} />
            <CheckSquareOutlined onClick={() => { addMir(name1) }} />

          </div>
        }
      </div>



      {deleteItem !== -1 && <RemoveItem deleteItem={deleteMirorItem} name={'Item'} setDeletePage={setDeleteItem} id={deleteItem} />}

    </div>
  );
}
