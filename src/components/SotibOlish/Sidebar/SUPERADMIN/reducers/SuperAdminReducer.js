import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'Filter',
    initialState:{
        Filter: [],
        user:[],
        message:''
    },
    reducers: {
        getFrom:(state,action)=>{
            state.Filter = action.payload.object
            console.log(state.Filter)
        },
        getFromUser:(state,action)=>{
           if(action.payload.success){
               state.user = action.payload.object
           }
           else{
               state.user = []
               state.message = action.payload.message
           }
        },
        saveFromUser:(state,action)=>{
            if(action.payload.success){
               toast.success(action.payload.message)
            }
            else{
                toast.error(action.payload.message)
            }
        },
    }
})

export const getfilter =(data)=>apiCall({
    url: `/business/info?time=${data.time}`,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail:slice.actions.getFrom.type
})
export const getUserForPassword =(data)=>apiCall({
    url: `/user/search-by-username/${data}`,
    method: 'get',
    onSuccess: slice.actions.getFromUser.type,
    onFail:slice.actions.getFromUser.type
})
export const changePassword =(data)=>apiCall({
    url: `/user/edit-password/${data.id}`,
    method: 'put',
    data:data.password,
    onSuccess: slice.actions.saveFromUser.type,
    onFail:slice.actions.saveFromUser.type
})
export default slice.reducer