
import axios from "axios"
import { useState } from "react";
const URL = process.env.REACT_APP_BASE_URL;


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
console.log(pay);

    async function save() {
        try{
        
          const response = await  axios({
              method: 'PUT',
              url: URL + 'api/v1/users/paymentMethods',
              data: pay
              
            });
           
            console.log(response)
          // TODO: remove console.logs before deployment
        
    
      }catch(error){
          console.log(error as Error);
      }
    }


    return (
        <div className='PaymentSetings'>
            <div className="Setings-payment">
                <h3>Payment</h3>
                <div>
                    <input type="checkbox" onChange={()=>{addPay(1)}}/>
                    <span>PayPal</span>
                </div>
                <div>
                    <input type="checkbox" onChange={()=>{addPay(2)}}/>
                    <span>Stripe</span>
                </div>
                <div>
                    <input type="checkbox" onChange={()=>{addPay(3)}}/>
                    <span>Google Pay</span>
                </div>
               
                <button onClick={()=>{save()}}>Save</button>
            </div>
        </div>
    )
}
