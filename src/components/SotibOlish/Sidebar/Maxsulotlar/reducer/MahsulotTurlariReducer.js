import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'productType',
    initialState:{
        productType: [],
        productOneType:[],
        current: false,
        message:'',
        getBoolean: false,
        saveBoolean:false
    },
    reducers:{
        getForm: (state, action) =>{
            if (action.payload.success){
                state.productType = action.payload.object
            }else {
                state.message = action.payload.message
                state.productType = null
            }
            state.getBoolean =!state.getBoolean
            state.saveBoolean = false
        },
        getFormById:(state,action)=>{
            if (action.payload.success){
                state.productOneType = action.payload.object.values
            }else {
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
        },
        saveForm: (state,action)=>{
            if (action.payload.success){
                state.saveBoolean = true
                toast.success(action.payload.message)
            }else {
                toast.error(action.payload.message)
            }
            state.current=!state.current
        },
        editForm2: (state, action)=>{
            if (action.payload.success){
                state.current=!state.current
            }else {
                toast.error(action.payload.message)
            }

        },
    }
})

export const getProductType=(data)=>apiCall({
    url: '/type/get-by-business/'+data,
    method: 'get',
    onSuccess: slice.actions.getForm.type,
    onFail: slice.actions.getForm.type
})
export const getProductTypeByID=(id)=>apiCall({
    url: '/type/'+id,
    method: 'get',
    onSuccess: slice.actions.getFormById.type,
    onFail: slice.actions.getFormById.type
})

export const saveProductType=(data)=>apiCall({
    url: '/type',
    method: 'post',
    data,
    onSuccess: slice.actions.saveForm.type,
    onFail: slice.actions.saveForm.type
})


export const editProductType=(data)=>apiCall({
    url: '/type/'+data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.saveForm.type,
    onFail: slice.actions.saveForm.type
});
export const deleteProductType=(data)=>apiCall({
    url: '/type/'+data,
    method: 'delete',
    onSuccess: slice.actions.saveForm.type,
    onFail: slice.actions.saveForm.type
});

export default slice.reducer