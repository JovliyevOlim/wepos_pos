import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'tariff',
    initialState: {
        tariff: null,
        permissionList: [],
        oneTariff: null,
        current: false,
        tariffchoose: [],
        message:'',
        saveTariffBoolean: false

    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.tariff = action.payload.object
            } else {
                state.tariff = null
                state.message  = action.payload.message
            }
            state.saveTariffBoolean  = false
        },
        getFromPermissions: (state, action) => {
            if (action.payload.success) {
                state.permissionList = action.payload.object
            } else {
                state.permissionList = []
            }
        },
        getFromChoose: (state, action) => {
            if (action.payload.success) {
                state.tariffchoose = action.payload.object
            } else {
                state.tariffchoose = []
                state.message  = action.payload.message
            }
            state.saveTariffBoolean  = false
        },
        getFromById: (state, action) => {
            state.oneTariff = action.payload.object
            state.current = !state.current
        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveTariffBoolean  = true
            }
            else{
                toast.error(action.payload.message)
            }
            state.current = !state.current

        },

        deletefrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
            }
            else{
                toast.error(action.payload.message)
            }
            state.current = !state.current
            state.saveTariffBoolean  = false
        }
    }
});

export const getTariff = () => apiCall({
    url: '/tariff',
    method: 'get',
    onSuccess: slice.actions.getFrom.type
});

export const getTariffById = (data) => apiCall({
    url: '/tariff/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromById.type
});

export const saveTariff = (data) => apiCall({
    url: '/tariff',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const getTariffChoose = () => apiCall({
    url: '/tariff/all',
    method: 'get',
    onSuccess: slice.actions.getFromChoose.type,
    onFail: slice.actions.getFromChoose.type
});

export const editTariff = (data) => apiCall({
    url: '/tariff/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteTariff = (id) => apiCall({
    url: '/tariff/' + id,
    method: 'delete',
    onSuccess: slice.actions.deletefrom.type,
    onFail: slice.actions.deletefrom.type
});

export default slice.reducer