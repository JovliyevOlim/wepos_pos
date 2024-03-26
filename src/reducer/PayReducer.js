import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'paymethod',
    initialState: {
        paymethod: [],
        current: false,
        getBoolean: false,
        saveBoolean: false,
        message: ''
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.paymethod = action.payload.object
            } else {
                state.paymethod = []
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        save: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveBoolean = true
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
    }
});

export const getPay = (data) => apiCall({
    url: '/payment-method/'+data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});

export const AddPaymentMethod = (data) => apiCall({
    url: '/payment-method',
    method: 'post',
    data,
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type,
});

export const EditPaymentMethod = (data) => apiCall({
    url: '/payment-method/'+data.id,
    method: 'put',
    params:data.params,
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type,
});

export const DeletePaymentMethod = (data) => apiCall({
    url: '/payment-method/'+data,
    method: 'delete',
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type,
});

export default slice.reducer