import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../store/slices/cartSlice'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const cartTotalAmount=useSelector(selectTotalAmount)
  return (
    <div>
      {cartItems.length==0 && <>
        <p>No Item in cart</p>
        <Link to='/'><FaArrowLeft/> Back to home</Link>
      </>}
      <> <h4>{`Cart Item(s) : ${cartItems.length}`}</h4>
            <h5>{`Subtotal: ${cartTotalAmount}`}</h5>
            {cartItems.map((item,index)=>
                <div class="card mb-2" key={index}>
                    <div class="card-body">
                        <h4 class="card-title">Product: {item.name}</h4>
                        <p class="card-text">Quantity: {item.cartQuantity}</p>
                        <p class="card-text">Unit Price: {item.price}</p>
                        <p class="card-text">Total: {item.price * item.cartQuantity}</p>
                    </div>
                </div>
            )}
            </>
    </div>
  )
}

export default CheckoutSummary
