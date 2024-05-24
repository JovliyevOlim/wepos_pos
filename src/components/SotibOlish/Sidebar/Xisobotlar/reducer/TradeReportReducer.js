import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'savdotulov',
    initialState: {
        tradeReports: [],
        savdoOne:[],
        getBoolean:false,
        message:''
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.tradeReports = action.payload.object
            }
            else{
                state.tradeReports   =  []
                state.message = action.payload.message
            }
           state.getBoolean = !state.getBoolean
        },
    }
});

export const getTradeReportByBranch=(data)=>apiCall({
    url: '/trade/get-info-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getTradeReportByBusiness=(data)=>apiCall({
    url: '/trade/get-info-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getOneSavdo=(data)=>apiCall({
    url:'/trade/'+data,
    method: 'get',
    onSuccess: slice.actions.getFrom2.type,
    onFail: slice.actions.getFrom2.type
});

export default slice.reducer