import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'subscrip',
    initialState: {
        subscrip: [],
        current: false,
        onebusiness:[],
        saveSubsBoolean: false,
        message:''
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.subscrip = action.payload.object
            }
            else{
                state.subscrip = []
                state.message = action.payload.message
            }
            state.saveSubsBoolean = false
        },
        saveFrom:(state,action)=>{
            if (action.payload.success){
                toast.success(action.payload.message)
                state.saveSubsBoolean=true
            }
            else{
                toast.error(action.payload.message)
            }
            state.current=!state.current
        },
    }

});

export const getAllSubscrip=(data)=>apiCall({
    url: '/subscription',
    method:'get',
    params:data,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const saveSubscrip=(data)=>apiCall({
    url: '/subscription',
    method:'post',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type
});
export const editSubscrip=(data)=>apiCall({
    url: '/subscription/confirm/'+data.subscriptionId,
    method:'put',
    params:data.params,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type
});
export const paymentToBusiness = (data) => apiCall({
    url: '/business/payment/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type
});
export default slice.reducer