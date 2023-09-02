import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'files',
    initialState: {
        files:null,
        filesResponse:null,
        current:false,
        getBoolean:false,
        saveBoolean:false,
        message:''
    },
    reducers:{
        getFrom: (state, action) => {
            console.log(action)
            if (action.payload.success){
                state.filesResponse = action.payload
            }
            else{
                state.filesResponse = null
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        saveFrom: (state, action) => {
            if (action.payload.success){
                state.saveBoolean = true
                state.files = action.payload.object
            }
            else{
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
        deleteFrom: (state, action) => {
            if (action.payload.success){
            }
            else{
                toast.error(action.payload.message)
            }
        },
        clearFiles:(state,action)=>{
            state.saveBoolean=false
            state.files = null
        },
    }
});

export const saveFiles=(data)=>apiCall({
    url: '/files',
    method:'post',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
});
export const getFiles=(data)=>apiCall({
    url: '/files/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const deleteFiles=(data)=>apiCall({
    url: '/files/'+data,
    method:'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
});

export default slice.reducer
export const {clearFiles} = slice.actions