import { ComponySetings } from '../../components/componySetings'
import { LoginSetings } from '../../components/loginSetings'
import { PaymentSetings } from '../../components/paymentSetings'
import { ShippingSetings } from '../../components/ShippingSetings'
import { PostSetings } from '../../components/postSetings'
import { useEffect, useState } from 'react'
import './setings.scss'
import { CommiteSetings } from '../../components/commiteSetings'
import { Style } from '../../components/StyleSettings'
import { Modal } from '../../components/modal'

export const Setings = () => {
    
    const [seenArr,setSeenArr]=useState(0);
    const kov:any = sessionStorage.getItem('setings');
    let [setings, setSetings] = useState(JSON.parse(kov)||1);


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
            <div className='Setings-menu'>
                <h2>Setings</h2>
                <ul>
                    <li className={setings === 1 ? 'activ' : ''} onClick={() =>  saveLocalStorage(1)}>Compony Setings <span></span></li>
                    <li className={setings === 2 ? 'activ' : ''} onClick={() =>  saveLocalStorage(2)}>Login Setings</li>
                    <li className={setings === 3 ? 'activ' : ''} onClick={() =>  saveLocalStorage(3)}>Payment Setings </li>
                    <li className={setings === 4 ? 'activ' : ''} onClick={() =>  saveLocalStorage(4)}>Shipping Setings </li>
                    <li className={setings === 5 ? 'activ' : ''} onClick={() =>  saveLocalStorage(5)}>Post Setings</li>
                    <li className={setings === 6 ? 'activ' : ''} onClick={() =>  saveLocalStorage(6)}>Commits{seenArr!==0&&<p>{seenArr}</p>}</li>
                    <li className={setings === 7 ? 'activ' : ''} onClick={() =>  saveLocalStorage(7)}>Style Settings</li>
                    <li className={setings === 8 ? 'activ' : ''} onClick={() =>  saveLocalStorage(8)}>Add Admin</li>
                </ul>
            </div>
            {setings === 1 && <ComponySetings />}
            {setings === 2 && <LoginSetings />}
            {setings === 3 && <PaymentSetings />}
            {setings === 4 && <ShippingSetings />}
            {setings === 5 && <PostSetings />}
            {setings === 6 && <CommiteSetings/>}
            {setings === 7 && <Style/>}
            {setings === 8 && <Modal/>}

        </div>
    )
}
