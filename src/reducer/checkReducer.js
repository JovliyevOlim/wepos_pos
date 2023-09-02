import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'check',
    initialState: {
        check:null,
        current:false,
        getBoolean:false,
        saveBoolean:false,
        message:''
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.check = action.payload.object
            }
            else{
                state.check = null
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        editfrom: (state,action) => {
            if (action.payload.success){
                toast.success('Success')
                state.saveBoolean = true
            }
            else{
                toast.error(action.payload.message)
            }
            state.current=!state.current

        },

    }
});

export const getInvoice=(data)=>apiCall({
    url: '/invoice/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const  editInvoice=(data)=>apiCall({
    url: '/invoice/'+data.branchId,
    method:'put',
    data,
    onSuccess: slice.actions.editfrom.type,
    onFail: slice.actions.editfrom.type,
});

export default slice.reducer