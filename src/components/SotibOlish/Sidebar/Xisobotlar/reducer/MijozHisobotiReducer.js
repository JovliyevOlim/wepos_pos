import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";

const slice = createSlice({
    name: 'mijozhisobot',
    initialState: {
        customerReport: [],
        mijozhisobot2:null,
        message:'',
        getBoolean:false,
    },
    reducers: {
        getFrom: (state, action) => {
            if(action.payload.success){
                state.customerReport = action.payload.object
            }
            else{
                state.customerReport = []
                state.message =action.payload.message
            }
            state.getBoolean = !state.getBoolean
        },
    }
});

export const getCustomerReportByBusiness=(data)=>apiCall({
    url: '/customer/get-info-by-business/'+data.businessId,
    method:'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getCustomerReportByBranch=(data)=>apiCall({
    url: '/customer/get-info-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export default slice.reducer