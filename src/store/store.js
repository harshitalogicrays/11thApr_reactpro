import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";
import filterSlice from "./slices/filterSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        product:productSlice.reducer,
        cart:cartSlice.reducer,
        checkout:checkoutSlice.reducer,
        order:orderSlice.reducer,
        filter:filterSlice.reducer
    }
})
