import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'userHistory',
    initialState: {
        userHistory: [],
        message : '',
        getBoolean:false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.userHistory = action.payload.object
            }
            else{
                state.userHistory = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
        }
    }
});

export const getUserHistoryByBusiness=(data)=>apiCall({
    url: '/history/get-info-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getUserHistoryByBranch=(data)=>apiCall({
    url: '/history/get-info-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});


export default slice.reducer