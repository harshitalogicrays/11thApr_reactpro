import React, { useEffect } from 'react'
import useFetchCollection from '../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, store_product } from '../store/slices/productSlice';
import ProductList from './ProductList';
import { selectfilterProducts } from '../store/slices/filterSlice';

const Products = () => {
    let {data,isLoading}=useFetchCollection("products");
    const dispatch=useDispatch()
    const products=useSelector(selectProducts)
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data,dispatch])
    const filterproducts=useSelector(selectfilterProducts)
  return (
    <div className='container-fluid'>
      <h1>My Products</h1>
      {filterproducts == null ? <ProductList products={products}/>
        :
        <ProductList products={filterproducts}/>
      }
      
    </div>
  )
}

export default Products
