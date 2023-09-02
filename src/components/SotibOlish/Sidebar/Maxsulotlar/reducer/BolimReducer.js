import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'bolimlar',
    initialState: {
        bolimlar: [],
        current: false,
        getBoolean: false,
        saveBoolean: false,
        message: ''
    }, reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.bolimlar = action.payload.object
            } else {
                state.message = action.payload.message
                state.bolimlar = []
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        }, savefrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveBoolean = true
            } else {
                toast.success(action.payload.message)
            }
            state.current = !state.current

        },
    }
});


export const getBolim = (data) => apiCall({
    url: '/category/get-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});


export const saveBolim = (data) => apiCall({
    url: '/category',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type,
});

export const editBolim = (data) => apiCall({
    url: '/category/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteBolim = (data) => apiCall({
    url: '/category/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer