import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice = createSlice({
    name: 'info',
    initialState: {
        infoBalance: {},
        infoObject:{},
        infoObjectPercent:{},
        infoForBusiness: {},
        infoTradeUser: [],
        current: false,
        getInfoBool: false,
        saveBranchBool: false,
        message: '',
    },
    reducers: {
        getInfoBalance: (state, action) => {
            if (action.payload.success) {
                state.infoBalance = action.payload.object
            } else {
                state.infoBalance = {}
                state.message = action.payload.message
            }
            state.getInfoBool = !state.getInfoBool
        },
        getInfo: (state, action) => {
            if (action.payload.success) {
                state.infoObject = action.payload.object?.infoDto
                state.infoObjectPercent = action.payload.object?.percentDto
            } else {
                state.infoObject = {}
                state.infoObjectPercent = {}
                state.message = action.payload.message
            }
            state.getInfoBool = !state.getInfoBool
        },
        getInfoTradeUser: (state, action) => {
            if (action.payload.success) {
                state.infoTradeUser = action.payload.object
            } else {
                state.infoTradeUser = []
                state.message = action.payload.message
            }
            state.getInfoBool = !state.getInfoBool
        },
        getInfoBy: (state, action) => {
            if (action.payload.success) {
                state.infoForBusiness = action.payload.object
            } else {
                state.infoForBusiness = {}
                toast.warning(action.payload.message)
            }
            state.getInfoBool = !state.getInfoBool
        },

    }
})

export const getInfoBalanceByBusiness = (data) => apiCall({
    url: '/info/balance-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getInfoBalance.type,
    onFail: slice.actions.getInfoBalance.type,
})
export const getInfoBalanceByBranch = (data) => apiCall({
    url: '/info/balance-by-branch/'+data,
    method: 'get',
    onSuccess: slice.actions.getInfoBalance.type,
    onFail: slice.actions.getInfoBalance.type
})
export const getInfoByBusiness = (data) => apiCall({
    url: '/info/get-by-business/' + data.businessId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getInfo.type,
    onFail: slice.actions.getInfo.type,
})
export const getInfoUserByTradeByBranch = (data) => apiCall({
    url: '/info/get-user-trade-sum/' + data.id,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getInfoTradeUser.type,
    onFail: slice.actions.getInfoTradeUser.type,
})
export const getInfoByBranch = (data) => apiCall({
    url: '/info/get-by-branch/'+data.branchId,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getInfo.type,
    onFail: slice.actions.getInfo.type
})
export const getInfo= () => apiCall({
    url: '/info',
    method: 'get',
    onSuccess: slice.actions.getInfoBy.type,
    onFail: slice.actions.getInfoBy.type
})
export default slice.reducer
