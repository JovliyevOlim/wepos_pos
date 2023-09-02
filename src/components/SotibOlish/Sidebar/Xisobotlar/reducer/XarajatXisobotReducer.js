import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'xarajatxisobot',
    initialState: {
        xarajatxisobot: null,
        message:'',
        current: false,
    },
    reducers: {
        getFrom: (state, action) => {
            if(action.payload.success){
                state.xarajatxisobot = action.payload.object
                state.current =!state.current
            }
            else{
                state.xarajatxisobot = null
                    state.message =  action.payload.message
            }
            console.log(action.payload);
        },
    }
});
export const getXarajatlarxisobot=(data)=>apiCall({
    url: `/reports/outlay/${data.branchId}/?${data.outlay ? `categoryId=${data.outlay}`:''}${data.startDate ? `&startDate=${data.startDate}`:''}${data.endDate ? `&endDate=${data.endDate}`:''}`,
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export default slice.reducer