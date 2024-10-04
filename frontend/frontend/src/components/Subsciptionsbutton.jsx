import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import  toast  from 'react-hot-toast'
import {  PayPalScriptProvider  } from "@paypal/react-paypal-js";

const Subsciptionsbutton = ({ current_time , USERNAME, type,EMAIL, price}) => {

  console.log("current time " + current_time)
  console.log("EMAIL " + EMAIL)
  console.log("price " + price)


  const PLAN_ID = "P-5HJ87162TR138653PM3ZVRLI"
  return (
    <PayPalScriptProvider options={{"client-id" : "AYWd62mCkVqaZIcTHZNwU4QMXWChwL-5Ts4jEF16T04wAvkM-8CKyZp8_Wg6m91dB-SEqgyyEz5Z2QP4", vault:true, components: "buttons", intent: "subscription"}}>   
    <PayPalButtons className='z-50 ' style={{labet: 'subscribe'}}
      createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id:PLAN_ID,
            custom_id:type,
            start_time:current_time,
            quantity:1,
            /*shipping_amount:{
              currency_code:"USD",
              value:price
            },*/
            subscriber:{
              email_address:EMAIL
            },
            application_context:{
              return_url:"",
              cancel_url:""
            },
          });
      }}
      onApprove={()=>toast.success("the subscription been paid with success")}

      onError={()=>toast.error("an error happend please try again later ")}

      >

      </PayPalButtons>
    </PayPalScriptProvider>

  )
}

export default Subsciptionsbutton
