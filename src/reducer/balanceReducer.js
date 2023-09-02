import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'trades',
    initialState: {
        balance: [],
        balanceHistory: [],
        current: false,
        getBoolean: false,
        saveBoolean: false,
        message: '',
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.balance = action.payload.object
            } else {
                state.balance = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        getFromHistory: (state, action) => {
            if (action.payload.success) {
                state.balanceHistory = action.payload.object
            } else {
                state.balanceHistory = []
                state.message= action.payload.message
            }
            state.getBoolean = !state.getBoolean

        },
        editfrom: (state, action) => {
            if (action.payload.success) {
                toast.success('Success')
                state.saveBoolean = true
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current

        },
        saveFrom: (state, action) => {
            if (action.payload.success) {
                toast.success('Success')
                state.saveBoolean = true
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current

        },

    }
});

export const getBalanceByBusiness = (data) => apiCall({
    url: '/balance/balance-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const getBalanceByBranch = (data) => apiCall({
    url: '/balance/balance-by-branch/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const getBalanceHistoryByBusiness = (data) => apiCall({
    url: `/balance/balance-history-by-business/`+data.businessId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFromHistory.type,
    onFail: slice.actions.getFromHistory.type,
});

export const getBalanceHistoryByBranch = (data) => apiCall({
    url: `/balance/balance-history-by-branch/`+data.branchId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFromHistory.type,
    onFail: slice.actions.getFromHistory.type,
});
export const editBalance = (data) => apiCall({
    url: '/balance/' + data.branchId,
    method: 'put',
    data,
    onSuccess: slice.actions.editfrom.type,
    onFail: slice.actions.editfrom.type,
});
export const saveBalance = (data) => apiCall({
    url: '/balance/get-put/' + data,
    method: 'post',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
});

export default slice.reducer