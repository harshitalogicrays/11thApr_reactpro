import React, { useEffect, useState } from 'react'
import spinnerImg from '../assets/spinner.jpg'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectEmail, selectUserID } from '../store/slices/authSlice'
import { EMPTY_CART, selectCartItems, selectTotalAmount } from '../store/slices/cartSlice'
import { selectShippingAddress } from '../store/slices/checkoutSlice'
import CheckoutSummary from './CheckoutSummary'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser';
const CheckoutForm = () => {
    const [message,setMessage]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userID=useSelector(selectUserID)
    const userEmail=useSelector(selectEmail)
    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectTotalAmount)
    const shippingAddress=useSelector(selectShippingAddress)

    useEffect(()=>{
        const clientSecret=new URLSearchParams(window.location.search).get("payment_intent_client_secret")
    },[stripe])
    let handleSubmit=async(e)=>{
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
        const confirmPayment=await stripe.confirmPayment({
          elements,
          confirmParams:{
            return_url:"http://localhost:3000/checkout-success" },
          redirect:"if_required"
        }).then((result)=>{
            if(result.error){
              toast.error(result.error.message)
              setMessage(result.error.message)
              return;
            }
            if(result.paymentIntent){
              if(result.paymentIntent.status=="succeeded"){
                setIsLoading(false)
                toast.success("payment success")
                saveorder()
              }
            }
        })
        setIsLoading(false)
    }

    let saveorder=()=>{
        let today=new Date()
        let date=today.toDateString()
        let time=today.toLocaleTimeString()
        const orderConfig={
          userID:userID,userEmail:userEmail,orderDate:date,orderTime:time,
          orderAmount:totalAmount,orderStatus:'Order Placed',shippingAddress:shippingAddress,
          cartItems:cartItems,createdAt:Timestamp.now().toDate()
        }
        try{
            addDoc(collection(db,"orders"),orderConfig)
            dispatch(EMPTY_CART())
            // send mail
            emailjs.send('service_6mb4fno', 'template_evvp4gq', {user_email:userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.orderAmount,date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
          .then((result) => {
            toast.success("Order Placed")
            navigate('/checkout-success')
          }, (error) => {
              console.log(error.text);
          });         
        }
        catch(error){
          toast.error(error.message)
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='row mt-3'>
            <div className='card col-5 me-2'>
                <CheckoutSummary/>
            </div>
            <div className='card col-5'>
                <h3>Stripe Checkout</h3>
                <PaymentElement id="payment_element"></PaymentElement>
                <button disabled={isLoading || !stripe || !elements} id="submit" type='submit' className='btn btn-primary mt-2'>
                    <span>
                        {isLoading ? <img src={spinnerImg} alt='loading' height='50px'/> :<> (Pay Now) </>}
                    </span>
                </button>
                {message && <div>{message}</div>}
            </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
