import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'xaridxisobot',
    initialState: {
        purchaseReport: [],
        xaridOne: null,
        message: '',
        getBoolean: false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.purchaseReport = action.payload.object
            } else {
                state.purchaseReport = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
        },
        getFrom2: (state, action) => {
            if (action.payload.success) {
                let a = []
                a.push(action.payload.object?.purchase)
                state.xaridOne = a
                state.xaridTwo = action.payload.object?.purchaseProductList
            } else {
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
        }
    }
});


export const getPurchaseReportByBusiness = (data) => apiCall({
    url: `/purchase/get-info-by-business/` + data.businessId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getPurchaseReportByBranch = (data) => apiCall({
    url: `/purchase/get-info-by-branch/` + data.branchId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});


export const getOneXaridXisobot = (data) => apiCall({
    url: '/purchase/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom2.type,
    onFail: slice.actions.getFrom2.type
});

export default slice.reducer