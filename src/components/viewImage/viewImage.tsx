import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import './viewImage.scss'
import { useState } from 'react'
export const ViewImage = ({ id, imageArr, setView }: { id: number, imageArr: string[], setView: (id: number) => void }) => {
    const [Id, setId] = useState(id)
    function nextImage() {
        if (imageArr.length < Id + 2) {
            setId(0)
        } else {
            setId(Id + 1)
        }
    }
    function backImage() {
        if (Id < 1) {
            setId(imageArr.length - 1)
        } else {
            setId(Id - 1)
        }

    }

    return (
        <div className="ViewImage">
            <CloseOutlined className='closeDiv' onClick={() => setView(-1)} />
            <div className='imageDiv'>
                <LeftOutlined onClick={backImage} />
                {
                    imageArr.map((el: any, index: number) => (
                        index === Id && <div className="imageviewdiv">
                            <img src={el.image} alt="" />
                        </div>
                    ))
                }
                <RightOutlined onClick={nextImage} />
            </div>
        </div>
    )
}

