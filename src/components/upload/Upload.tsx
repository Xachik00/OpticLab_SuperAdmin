import { useAppDispatch } from "../../hooks/redux";
import {  uploadImage } from "../../store/action/governmentAddRemoveMembers";
import "./Upload.scss"

export function Upload({name}:any) {

    const dispatch = useAppDispatch();
    const  uploadImageHandler  = async (e: any) => {
        dispatch(uploadImage(e.target.files[0]));
    };
    

    return (

        <div className="upp" >
            <label htmlFor={name} >+</label>
            <input type="file" accept="image/*" id={name} name={name} value={""} style={{display:'none'}} onChange={uploadImageHandler} />
        </div>
    );
}