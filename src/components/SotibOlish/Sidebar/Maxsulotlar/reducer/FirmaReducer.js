import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'firmalar',
    initialState: {
        firmalar: [],
        current: false,
        message: '',
        getBoolean: false,
        saveBoolean: false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.firmalar = action.payload.object
            } else {
                state.message = action.payload.message
                state.firmalar = []
            }
            state.getBoolean = !state.getBoolean
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

export const getFirma = (data) => apiCall({
    url: '/brand/get-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const saveFirma = (data) => apiCall({
    url: '/brand',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const editFirma = (data) => apiCall({
    url: '/brand/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteFirma = (data) => apiCall({
    url: '/brand/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer