import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:null,email:null,userName:null,userID:null,role:null},
    reducers:{
        LoginUser(state,action){
            let {email,userID,userName,role}=action.payload
            state.isLoggedIn=true
            state.email=email
            state.userName=userName
            state.userID=userID
            state.role=role
        },
        LogoutUser(state,action){
            state.isLoggedIn=false
            state.email=null
            state.userName=null
            state.userID=null
            state.role=null
                }
    }
})
export const {LoginUser,LogoutUser}=authSlice.actions
export default authSlice
export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectEmail=state=>state.auth.email
export const selectUserName=state=>state.auth.userName
export const selectUserID=state=>state.auth.userID
export const selectUserRole=state=>state.auth.role