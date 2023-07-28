
import axios from "axios"
import { useState } from "react";
import "./PaymentSetings.scss"
import { useraxios } from "../../axios/axios";


export const PaymentSetings = () => {


    const [pay,setPay]=useState<any>([])

    async function addPay(n:any){
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
        
          const response = await  useraxios({
              method: 'PUT',
              url: 'paymentMethods',
              data: pay
              
            });
           
          // TODO: remove console.logs before deployment
        
    
      }catch(error){
          console.log(error as Error);
      }
    }


    return (
        <div className='PaymentSetings'>
            <div className="Setings-payment">
                <h1>Payment metod</h1>
                <div>
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
                </div>
               
            </div>
            <div
        className='button-sayt'><button onClick={()=>{save()}}>Save</button></div>
               
        </div>
    )
}
