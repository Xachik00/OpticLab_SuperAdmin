
import axios from "axios"
import { useEffect, useState } from "react";
import "./PaymentSetings.scss"
import { useraxios } from "../../axios/axios";


export const PaymentSetings = () => {


    const [pay,setPay]=useState<any>([])
    const [payment,setPayment] = useState<Object[]>()
    async function name() {
        
        const response = await useraxios.get('paymentMethods');
        setPayment(response.data)
        console.log(payment);
        
      }
      useEffect(()=>{

          name()
    },[])
    
   function addPay(n:any){
         
  let newPay:any = payment?.map((el:any)=>{
    if(el.id === n ){
      el={...el, status:!el.status}
    }
    return el
   }
   )
   setPayment(newPay)
        if(pay.length === 0){
            setPay([n])
        }
        pay.map((el:any,index:any)=>{
            if(el === n ){
               pay.splice(index,1)
                  
               setPay(pay)
            }else{
                setPay([...pay,n])
            }
        })
   
      
    }

    async function save() {
        try{
        
           await  useraxios({
              method: 'PUT',
              url: 'paymentMethods',
              data: pay
              
            });
          
          
           await name();
           setPay([])
    
      }catch(error){
          console.log(error as Error);
      }
    }


    return (
        <div className='PaymentSetings'>
            <div className="Setings-payment">
                <h1>Payment metod</h1>

               {
                payment?.map((el:any)=><div>
                    <span>{el.title}</span>
                    <input type="checkbox" checked={el.status}  onChange={()=>{addPay(el.id)}} />
                </div>)
               }
                {/* <div>
                    <span>PayPal</span>
                    <input type="checkbox" onChange={()=>{addPay(1)}}/>
                </div>
                <div>
                    <span>Stripe</span>
                    <input type="checkbox" onChange={()=>{addPay(2)}}/>
                </div>
                <div>
                    <span>Google Pay</span>
                    <input type="checkbox" onChange={()=>{addPay(3)}}/>
                </div> */}
               
            </div>
            <div
        className='button-sayt'><button onClick={()=>{save()}}>Save</button></div>
               
        </div>
    )
}
