import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'reports',
    initialState: {
        warehouse: [],
        getBoolean:false,
        saveBoolean:false,
        message:'',
        current:false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.warehouse = action.payload.object
            }
            else{
                state.message = action.payload.message
                state.warehouse = []
            }
            state.getBoolean =!state.getBoolean
            state.saveBoolean = false
        },
        saveFrom: (state, action) => {
            if (action.payload.success){
                toast.success(action.payload.message)
                state.saveBoolean = true
                state.current = !state.current
            }
            else{
                toast.error(action.payload.message)
            }
        },
    }

});


export const getWarehouseByBranch=(data)=>apiCall({
    url: `/warehouse/get-info-by-branch/`+data.branchId,
    method:'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getWarehouseByBusiness=(data)=>apiCall({
    url: `/warehouse/get-info-by-business/`+data.businessId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const resetWarehouse=(data)=>apiCall({
    url: `/warehouse/`+data,
    method:'put',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type
});

export default slice.reducer