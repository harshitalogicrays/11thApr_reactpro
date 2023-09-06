import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../store/slices/cartSlice'
import {Link} from 'react-router-dom'
const ProductItem = ({id,name,price,imageURL,brand,category,product}) => {
const dispatch=useDispatch()
  let addToCart=(product)=>{
    dispatch(ADD_TO_CART(product))
  }
  return (
    <div class="card col-12 col-md-3 m-2">
      <Link to={`/details/${id}`}> 
          <img class="card-img-top" src={imageURL} style={{height:'200px'}}  
          alt="Title"/>
      </Link>
      <div class="card-body">
        <h4 class="card-title">{name}</h4>
        <p class="card-text">{category}</p>
        <p class="card-text">{brand}</p>
        <p class="card-text">{price}</p>
        <button type="button" class="btn btn-danger" onClick={()=>addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductItem
