import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'foydazarar',
    initialState: {
        foydazarar: [],
        report:[],
        delivery: 0,
        FoydaDate: []
    },
    reducers: {
        getFrom: (state, action) => {
            state.foydazarar = action.payload.object

        },
        getFrom2: (state,action)=>{
            state.report = action.payload.object
        },
        getFrom3: (state,action)=>{
            state.delivery = action.payload.object
        },
        getFrom4: (state,action)=>{
            state.FoydaDate = action.payload.object
        }
    }

});

export const getFoydaZarar=()=>apiCall({
    url: '/benefit-lost/one-date',
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getFoydaReport1=(data)=>apiCall({
    url: '/reports/all-by-business/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom2.type,
    onFail: slice.actions.getFrom2.type
})

export const getDelivery=(data)=>apiCall({
    url: '/reports/delivery/'+data,
    method:'get',
    onSuccess:slice.actions.getFrom3.type,
    onFail: slice.actions.getFrom3.type
})

export default slice.reducer