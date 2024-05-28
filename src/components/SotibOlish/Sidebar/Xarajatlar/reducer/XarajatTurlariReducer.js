import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'xarajatturlari',
    initialState: {
        xarajatturlari: [],
        current: false,
        message: '',
        getOutlayBool: false,
        saveBoolean: false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.xarajatturlari = action.payload.object
            } else {
                state.message = action.payload.message
                state.xarajatturlari = []
            }
            state.getOutlayBool = !state.getOutlayBool
            state.saveBoolean = false
        },
        savefrom: (state, action) => {
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

export const getXarajatlarTurlari = (data) => apiCall({
    url: '/outlay-category/get-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});


export const saveXarajatlarTurlari = (data) => apiCall({
    url: '/outlay-category',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type,
});

export const editXarajatlarTurlari = (data) => apiCall({
    url: '/outlay-category/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteXarajatlarTurlari = (data) => apiCall({
    url: '/outlay-category/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer