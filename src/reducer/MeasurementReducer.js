import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice = createSlice({
    name: 'kg',
    initialState: {
        measurements: [],
        current: false,
        message: '',
        saveBoolean: true,
        getBoolean: false
    },
    reducers: {
        get: (state, action) => {
            if (action.payload.success) {
                state.measurements = action.payload.object
            } else {
                state.measurements = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        save: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveBoolean = true
            }
            else{
                toast.error(action.payload.message)
            }
            state.current = !state.current
            state.getBoolean = false
        }
    }
})

export const getMeasurement = (data) => apiCall({
    url: '/measurement/get-by-business/' + data,
    method: 'get',
    data,
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type
})
export const saveMeasurement = (data) => apiCall({
    url: '/measurement',
    method: 'post',
    data,
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type
})
export const editMeasurement = (data) => apiCall({
    url: '/measurement/'+data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type
})
export const deleteMeasurement = (data) => apiCall({
    url: '/measurement/'+data,
    method: 'delete',
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type
})
export default slice.reducer