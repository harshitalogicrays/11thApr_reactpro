import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../store/slices/cartSlice'
import { selectEmail } from '../store/slices/authSlice'
import { selectShippingAddress } from '../store/slices/checkoutSlice'
import { toast } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'

let stripePromise=loadStripe('pk_test_51MWzILSJqCDJ3ZovShOg1ilq2hxwZLPytjDlf4Y8sK7c3tdyVqTvSkvMElvXsUZ7yteLaiyp7FqdlSMLMfjX5sMz00ThusY7s3')
const Checkout = () => {
  const [message,setMessage]=useState("initailzing checkout")
  const [clientSecret,setClientSecret]=useState("")
  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectTotalAmount)
  const userEmail=useSelector(selectEmail)
  const shippingAddress=useSelector(selectShippingAddress)
  useEffect(()=>{
    fetch("http://localhost:1000/payment",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify({email:userEmail,amount:totalAmount,shippingAddress:shippingAddress,description:'ecommerce site'})
    }).then((res)=>{
      return res.json().then((data)=>{
        setClientSecret(data.clientSecret)
        console.log(data.clientSecret)
      })
    }).catch((error)=>{
      setMessage("Failed to initializing checkout")
      toast.error("something went wrong")
    })
  },[])
  const appearance={theme:'stripe'}
  const options={clientSecret,appearance}
  return (
    <div className='container mt-5'>
      {!clientSecret && <h3>{message}</h3>}
      {
        clientSecret && <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
      }
    </div>
  )
}

export default Checkout
