import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:'filter',
    initialState:{filterproducts:[]},
    reducers:{
        FILTER_BY_SEARCH(state,action){
           let {search,products}=action.payload
           let temppro=products.filter((product)=>
           product.name.includes(search) || product.category.includes(search)
           )
           state.filterproducts=temppro
        }
    }
})
export const {FILTER_BY_SEARCH} =filterSlice.actions
export default filterSlice
export const selectfilterProducts=state=>state.filter.filterproducts