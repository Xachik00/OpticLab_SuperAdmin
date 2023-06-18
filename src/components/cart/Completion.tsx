import {useEffect, useState} from 'react';
import { Header } from '../Header';
import "./cart.scss"
import {CheckCircleOutlined}  from "@ant-design/icons";
import {CloseCircleOutlined}  from "@ant-design/icons";


function Completion(props:any) {
  const [ messageBody, setMessageBody ] = useState<any>('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe:any) => {
      const url:URL = new URL(window.location.href);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);

  return (
    <>
     <Header/>
      
     {messageBody ? <div className="messages" role="alert" style={{display: 'block'}}> <h1 className='h1'>ERROR</h1>  <CloseCircleOutlined />  Status onsucssed </div>
      :<div className="messages" role="alert" style={{display: 'block'}}> <h1 className='h1'>TANK YOU</h1>  <CheckCircleOutlined />  Status sucssed </div>}
    </>
  );
}

export default Completion;