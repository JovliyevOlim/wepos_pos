import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice=createSlice({
    name:'lossProduct',
    initialState:{
        exchange:[],
        oneExchange:[],
        current:false,
        saveBoolean:false,
        getBoolean:false,
        message:''
    },
    reducers:{
        get:(state,action)=>{
            if(action.payload.success){
                state.exchange=action.payload.object
            }
            else{
                state.exchange = []
                state.message= action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean=false
        },
        getOne:(state,action)=>{
            if(action.payload.success){
                state.oneExchange=action.payload.object
            }
            else{
                state.oneExchange = []
                state.message= action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean=false
        },
        save:(state,action)=>{
            if (action.payload.success){
                toast.success(action.payload.message)
                state.saveBoolean = true
            }
            else{
                toast.warning(action.payload.message)
            }
            state.current= !state.current

        }
    }
})

export const getExchangeByBranch=(data)=>apiCall({
    url:'/exchange/get-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess:slice.actions.get.type,
    onFail:slice.actions.get.type
})
export const getExchangeByBusiness=(data)=>apiCall({
    url:'/exchange/get-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess:slice.actions.get.type,
    onFail:slice.actions.get.type
})
export const getExchangeOne=(data)=>apiCall({
    url:'/exchange/get-by/'+data,
    method:'get',
    onSuccess:slice.actions.getOne.type,
    onFail:slice.actions.getOne.type
})
export const saveExchange=(data)=>apiCall({
    url:'/exchange',
    method:'post',
    data,
    onSuccess:slice.actions.save.type,
    onFail:slice.actions.save.type,
})


export default slice.reducer