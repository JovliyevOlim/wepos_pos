import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'supplierReport',
    initialState: {
        supplierReport: [],
        getBoolean: false,
        message: ''
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.supplierReport = action.payload.object
            } else {
                state.supplierReport = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
        },
    }
});

export const getSupplierReportByBusiness = (data) => apiCall({
    url: '/supplier/get-info-by-business/' + data.businessId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getSupplierReportByBranch = (data) => apiCall({
    url: '/supplier/get-info-by-branch/' + data.branchId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export default slice.reducer