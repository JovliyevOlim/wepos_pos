import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'array',
    initialState: {
        current:false,
        list:[],
        business: [],
        id:'',
        status:'',
        message:'',
        saveBoolean:false
    },
    reducers: {
        getFrom: (state, action) => {
            state.business=action.payload.object
            console.log(state.business)
        },
        savefrom: (state,action) => {
            state.current=!state.current
            if (action.payload.success){
               toast.success(action.payload.message)
                state.message = action.payload.message
                if (action.payload.message==='ADDED'){
                    state.message = action.payload.message
                }
            }else {
                toast.error(action.payload.message)
            }
            state.status = action.payload.status
            console.log(action.payload)
        },
        saveinfo:(state,action)=>{
            state.list = action.payload
        },
        saveiD:(state,action)=>{
            state.id = action.payload
            console.log(action.payload)
        }
    }
});

export const saveBusiness=(data)=>apiCall({
    url: '/business/create',
    method:'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail:slice.actions.savefrom.type
});


export const getAllBusiness=()=>apiCall({
    url: '/business/all',
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export default slice.reducer
export const {saveinfo}  = slice.actions
export const {saveiD}  = slice.actions