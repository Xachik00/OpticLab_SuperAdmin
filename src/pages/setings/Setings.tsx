import './setings.scss';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/modal';
import { Style } from '../../components/StyleSettings';
import { LoginSetings } from '../../components/loginSetings';
import { CommiteSetings } from '../../components/commiteSetings';
import { ComponySetings } from '../../components/componySetings';
import { PaymentSetings } from '../../components/paymentSetings';
import { ShippingSetings } from '../../components/ShippingSetings';
import { CloseOutlined, SettingOutlined  } from "@ant-design/icons";


export const Setings = () => {
    
    const [seenArr,setSeenArr]=useState(0);
    const kov:any = sessionStorage.getItem('setings');
    let [setings, setSetings] = useState(JSON.parse(kov)||1);
    const[mobile, setMobile] = useState(false)


    useEffect(()=>{
        if(kov === undefined){  
            let setString:string = JSON.stringify(setings);
            let sett:any = sessionStorage.setItem("setings",setString);
            let setParse = JSON.parse(sett);
            setSetings(setParse);
    
        }else{
            setSetings(JSON.parse(kov))
        }

        const seen:any=sessionStorage.getItem('seenArr')
        setSeenArr(JSON.parse(seen))
    

    },[])

    let valueStorage:any = sessionStorage.getItem("setings");
    let value = JSON.parse(valueStorage);

   
    function saveLocalStorage(e:any){
        let a = JSON.stringify(e);
        sessionStorage.setItem("setings",a);
        let b:any = sessionStorage.getItem("setings");
        let c = JSON.parse(b)

        setSetings(c) 

         
    
    }

    
    return (
        <div className='Setings'>
           
           <div
          className="headericone"
          id="headericone"
          onClick={() => setMobile(true)}
        >
          {!mobile && (
            <div onClick={() => setMobile(true)}>
              <SettingOutlined />
            </div>
          )}
        </div>
        
        <div className={!mobile ? "items" : "items-mobile"}>
        {mobile && (
              <div className="closeHeader" id="closeHeader">
                <CloseOutlined onClick={() => setMobile(!mobile)} />
              </div>
            )}
                <h2>Setings</h2>
                <ul>
                    <li className={setings === 1 ? 'activ' : ''} onClick={() =>  saveLocalStorage(1)}>Compony Setings <span></span></li>
                    <li className={setings === 2 ? 'activ' : ''} onClick={() =>  saveLocalStorage(2)}>Login Setings</li>
                    <li className={setings === 3 ? 'activ' : ''} onClick={() =>  saveLocalStorage(3)}>Payment Setings </li>
                    <li className={setings === 4 ? 'activ' : ''} onClick={() =>  saveLocalStorage(4)}>Shipping Setings </li>
                    <li className={setings === 5 ? 'activ' : ''} onClick={() =>  saveLocalStorage(5)}>Commits{seenArr!==0&&<p>{seenArr}</p>}</li>
                    <li className={setings === 6 ? 'activ' : ''} onClick={() =>  saveLocalStorage(6)}>Style Settings</li>
                    <li className={setings === 7 ? 'activ' : ''} onClick={() =>  saveLocalStorage(7)}>Add Admin</li>
                </ul>
                
            </div>

            {setings === 1 && <div className='Component-setings'><ComponySetings /></div>}
            {setings === 2 && <div className='Component-setings'><LoginSetings /></div>}
            {setings === 3 && <div className='Component-setings'><PaymentSetings /></div>}
            {setings === 4 && <div className='Component-setings'><ShippingSetings /></div>}
            {setings === 5 && <div className='Component-setings'><CommiteSetings/></div>}
            {setings === 6 && <div className='Component-setings'><Style/></div>}
            {setings === 7 && <div className='Component-setings'><Modal/></div>}

        </div>
    )
}
