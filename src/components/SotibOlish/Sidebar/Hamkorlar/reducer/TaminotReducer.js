import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'taminot',
    initialState: {
        supplier: [],
        AllSupplier:[],
        current: false,
        oneSupplier: {},
        message: '',
        getBoolean: false,
        saveBoolean:false,
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.supplier = action.payload.object
            } else{
                state.message = action.payload.message
                state.supplier = []
            }
            state.getBoolean=!state.getBoolean
            state.saveBoolean = false
        },
        getFromAll: (state, action) => {
            if (action.payload.success) {
                state.AllSupplier = action.payload.object
            } else{
                state.message = action.payload.message
                state.AllSupplier = []
            }
            state.getBoolean=!state.getBoolean
            state.saveBoolean = false
        },
        getFromOne: (state, action) => {
            if (action.payload.success) {
                state.oneSupplier = action.payload.object
            } else {
                state.taminot = null
                toast.error(action.payload.message)
            }
        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                 state.saveBoolean = true
                toast.success(action.payload.message)
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current

        },
    }
});

export const getTaminot = (data) => apiCall({
    url: '/supplier/get-by-business/' + data.id,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail:slice.actions.getFrom.type
});
export const getAllSupplier= (data) => apiCall({
    url: '/supplier/for-purchase/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromAll.type,
    onFail:slice.actions.getFromAll.type
});

export const getSupplierOne = (data) => apiCall({
    url: '/supplier/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromOne.type,
    onFail: slice.actions.getFromOne.type
});
export const saveTaminot = (data) => apiCall({
    url: '/supplier',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const editTaminot = (data) => apiCall({
    url: '/supplier/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const deleteTaminot = (data) => apiCall({
    url: '/supplier/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})
export const debtSupplier = (data) => apiCall({
    url: '/supplier/payment/' + data.id,
    method: 'put',
    data,
    params:{
        branchId: data.branchId,
    },
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export default slice.reducer