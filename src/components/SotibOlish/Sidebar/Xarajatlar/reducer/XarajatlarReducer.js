import {createSlice, current} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'xarajatlar',
    initialState: {
        xarajatlar: null,
        outlays: [],
        current: false,
        getOne: null,
        message: '',
        outlayType: null,
        getOutlaysBool: false,
        saveOutlaysBool: false,
        xarajatbranch: []
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.outlays = action.payload.object
            } else {
                state.outlays = []
                state.message = action.payload.message
            }
            state.getOutlaysBool = !state.getOutlaysBool
            state.saveOutlaysBool = false
        },
        getFrombranch: (state, action) => {
            if (action.payload.success) {
                state.xarajatlar = action.payload.object
            } else {
                state.xarajatlar = null
                state.message = action.payload.message
            }
            state.getOutlaysBool = !state.getOutlaysBool
            state.saveOutlaysBool = false
            state.xarajatbranch = action.payload.object
        },
        getFromOutlayType: (state, action) => {
            state.outlayType = action.payload.object
        },
        getFromOne: (state, action) => {
            state.getOne = action.payload.object
            state.counter = !state.counter
        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                state.saveOutlaysBool = true
                toast.success(action.payload.message)
            } else {
                toast.warning(action.payload.message)
            }
            state.current = !state.current

        }
    }
});

export const getOutlayByBusiness = (data) => apiCall({
    url: '/outlay/get-by-business/' + data.id,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getOutlayByBranch = (data) => apiCall({
    url: '/outlay/get-by-branch/' + data.id,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getOutlayOne = (data) => apiCall({
    url: '/outlay/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromOne.type,
    onFail: slice.actions.getFromOne.type
});

export const getXarajatlar = (data) => apiCall({
    url: '/outlay/get-by-business/' + data,
    params: data.params,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getXarajatlarbranch = (data) => apiCall({
    url: '/outlay/get-by-branch/' + data,
    params: data.params,
    method: 'get',
    onSuccess: slice.actions.getFrombranch.type,
    onFail: slice.actions.getFrombranch.type
});

export const saveXarajatlar = (data) => apiCall({
    url: '/outlay',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const editXarajatlar = (data) => apiCall({
    url: '/outlay/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteXarajatlar = (data) => apiCall({
    url: '/outlay/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer