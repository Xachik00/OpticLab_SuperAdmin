import Payment from "../../components/cart/Payment";
import Completion from "../../components/cart/Completion";
import { knopka } from "../../components/cart/checkoutForm";
import React, {useState, useEffect} from "react";
import {loadStripe} from '@stripe/stripe-js';

import "./payment.scss"

const Pay = () => {

    const [ stripePromise, setStripePromise ] = useState<any>(null);
    useEffect(() => {
      fetch("/config").then(async (r) => {
        const { publishableKey }:any = await r.json();
        setStripePromise(loadStripe(publishableKey));
      });
    }, []);


    let mek=knopka()

  return (
    <main className='pay'>
      {  mek  ?
             <Payment stripePromise={stripePromise} />
          
      :
           <Completion stripePromise={stripePromise} />
       }
    </main>
  )
}

export default Pay