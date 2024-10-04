import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';
import {  PayPalScriptProvider  } from "@paypal/react-paypal-js";



const Payment =  (props) => {



  return (
    <PayPalScriptProvider options={{"client-id" : "AYWd62mCkVqaZIcTHZNwU4QMXWChwL-5Ts4jEF16T04wAvkM-8CKyZp8_Wg6m91dB-SEqgyyEz5Z2QP4"}}>
      <PayPalButtons className='z-50 ' style={{ layout: "horizontal" }}
      createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: `${props.price}`,
                },
                payee:{
                  email_address:props.EMAIL
                },
                custom_id:props.product_id
              },
            ],
          });
        }}

        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
              toast.success('Payment completed. Thank you, ' + details.payer.name.given_name)
          });
      }}

      onCancel={() => toast(
        "You cancelled the payment. Try again by clicking the PayPal button", {
        duration: 6000,
    })}

    onError={(err) => {
      toast.error(
          "There was an error processing your payment. If this error please contact support.", {
          duration: 6000,
      });                    }}
      />
    </PayPalScriptProvider>

    )
}

export default Payment