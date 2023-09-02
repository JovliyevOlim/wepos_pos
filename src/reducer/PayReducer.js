import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";

const slice = createSlice({
    name: 'paymethod',
    initialState: {
        paymethod: [],
        current:false,

    },
    reducers: {
        getFrom: (state, action) => {
            state.paymethod = action.payload.object
        },
    }
});

export const getPay=()=>apiCall({
    url: '/payment-method',
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});

export default slice.reducer