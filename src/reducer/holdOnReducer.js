import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'holdOn',
    initialState: {
        holdOn:null,
        current:false,
        getBoolean:false,
        saveBoolean:false,
        message:''
    },
    reducers:{
        getFrom: (state, action) => {
            if (action.payload.success){
                state.holdOn = action.payload.object
            }
            else{
                state.holdOn = null
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        saveFrom: (state, action) => {
            if (action.payload.success){
                state.saveBoolean = true
                toast.success('Mahsulot kutish xonasida')
            }
            else{
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
        deleteFrom: (state, action) => {
            state.current = !state.current
        },
        clearFiles:(state,action)=>{
            state.saveBoolean=true
        },
    }
});

export const saveHoldOn=(data)=>apiCall({
    url: '/waiting',
    method:'post',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
});
export const getHoldOn=(data)=>apiCall({
    url: '/waiting/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const deleteHoldOn=(data)=>apiCall({
    url: '/waiting/'+data,
    method:'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
});

export default slice.reducer
export const {clearFiles} = slice.actions