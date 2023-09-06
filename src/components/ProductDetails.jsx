import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../customhooks/useFetchDocument'
import spinnerImg from '../assets/spinner.jpg'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../store/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
const ProductDetails = () => {
    const {id} =useParams()
    const {document}=useFetchDocument("products",id)
    const [product,setProduct]=useState(null)
    const cartItems=useSelector(selectCartItems)
    const cart=cartItems.find((item)=>item.id === id)
    const isCartAdded= cartItems.findIndex((item)=>item.id === id)
    const dispatch=useDispatch()
    useEffect(()=>{
        setProduct(document)
    },[document])
  return ( 
    <div className='container mt-4'>
    <div className='col-12'>
      <h2>Product Details</h2>
      <Link to='/' className='btn btn-primary'>&larr; Back to Products</Link>
    </div>
    <div className='row shadow mt-2 border p-5'>
      {product==null?
      <img src={spinnerImg} alt="Loading" style={{width:'270px'}}/>
      :
      <>
        <div className='col-4'>
          <img src={product.imageURL} alt={product.name} 
          style={{border:'2px solid black',width:'400px',height:'250px'}}/>
      </div>
      <div className='col-6 offset-2'>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.brand}</p>
          <p>{product.desc}</p>
          <div>
            {isCartAdded <0 ?
            <button type="button" class="btn btn-danger" onClick={()=>dispatch(ADD_TO_CART(product))}
         >Add to Cart</button>:(
              <>
              <div className='input-group'>
                            <button type="button"  onClick={()=>dispatch(DECREASE(product))}>-</button>
                              <input type="text"
                                name="" id="" style={{width:'40px'}} placeholder="" className='text-center' readOnly value={cart.cartQuantity}/>
                               <button type="button" onClick={()=>dispatch(ADD_TO_CART(product))}>+</button>
                        </div>
              </>
            )}
          </div>
          
      </div>
    </>
}
    </div>
</div>

  )
}

export default ProductDetails
