import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice=createSlice({
    name:'lossProduct',
    initialState:{
        lossProduct:[],
        oneLossProduct:[],
        current:false,
        saveBoolean:false,
        getBoolean:false,
        message:''
    },
    reducers:{
        get:(state,action)=>{
             if(action.payload.success){
                 state.lossProduct=action.payload.object
             }
             else{
                 state.lossProduct = []
                 state.message= action.payload.message
             }
             state.getBoolean = !state.getBoolean
            state.saveBoolean=false
        },
        getOne:(state,action)=>{
            if(action.payload.success){
                let a = []
                a.push(action.payload.object)
                state.oneLossProduct=a
            }
            else{
                state.oneLossProduct = []
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

export const getLossProductByBranch=(data)=>apiCall({
    url:'/loss/get-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess:slice.actions.get.type,
    onFail:slice.actions.get.type
})
export const getLossProductByBusiness=(data)=>apiCall({
    url:'/loss/get-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess:slice.actions.get.type,
    onFail:slice.actions.get.type
})
export const getLossProductOne=(data)=>apiCall({
    url:'/loss/'+data,
    method:'get',
    onSuccess:slice.actions.getOne.type,
    onFail:slice.actions.getOne.type
})
export const saveLossProduct=(data)=>apiCall({
    url:'/loss',
    method:'post',
    data,
    onSuccess:slice.actions.save.type,
    onFail:slice.actions.save.type,
})


export default slice.reducer