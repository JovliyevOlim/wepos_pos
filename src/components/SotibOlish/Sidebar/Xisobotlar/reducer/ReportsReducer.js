import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'reports',
    initialState: {
        reports: [],
        getChart:null,
        getChartBoolean:false,
        lidReport: null,
        projectReport:null,
        message:'',
        lidTrade:null,
        kassa: null,
        statics:null,
        bestSellers: null,
        getKassaBoolean:false,
        bestSellerChart: null,
        isTrue: false
    },
    reducers: {
        getFrom: (state, action) => {
            state.reports = action.payload.object
        },
        getFromBestSellerChart:(state,action)=>{
          if (action.payload.success){
              state.bestSellerChart = action.payload.object
          }  else {
              state.bestSellerChart = null
          }
          state.isTrue=!state.isTrue
        },
        getFromChart: (state, action) => {
            if (action.payload.success){
                state.getChart = action.payload.object
            }
            else{
                state.getChart = null
            }
            state.getChartBoolean = !state.getChartBoolean
        },
        getBestSeller:(state,action)=>{
          if (action.payload.success){
              state.bestSellers = action.payload.object
          }  else {
              state.bestSellers = null
          }
        },
        getTradeLid:(state,action)=>{
          if (action.payload.success){
              state.lidTrade = action.payload.object
          }  else {
              state.lidTrade = null
          }
        },
        getFromLid: (state, action) => {
            if (action.payload.success){
                state.lidReport = action.payload.object
            }
        },
        getFromProject: (state, action) => {
            if (action.payload.success){
                state.projectReport = action.payload.object
            }
            else{
                state.projectReport = null
            }
        },
        getKassa:(state,action)=>{
            if (action.payload.success){
                state.kassa = action.payload.object
            }else {
                state.kassa = null
            }
            state.getKassaBoolean=!state.getKassaBoolean
        },
        getStatic:(state, action)=>{
            if (action.payload.success){
                state.statics = action.payload.object
            }else {
                state.statics = action.payload.object
            }

        }

    }

});

export const getReports=(data)=>apiCall({
    url: '/reports/all-by-branch/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getBestSellerChart=(data)=>apiCall({
    url: '/reports/get-seller-for-chart/'+data.businessId,
    method:'get',
    params: data.params,
    onSuccess: slice.actions.getFromBestSellerChart.type,
    onFail: slice.actions.getFromBestSellerChart.type
});
export const getReportsChart=(data)=>apiCall({
    url: '/reports/get-chart/'+data.branchId,
    method:'get',
    params: data.params,
    onSuccess: slice.actions.getFromChart.type,
    onFail: slice.actions.getFromChart.type
});
export const getBestSellers=(data)=>apiCall({
    url: '/reports/get-best-seller/'+data,
    method:'get',
    onSuccess: slice.actions.getBestSeller.type,
    onFail: slice.actions.getBestSeller.type
});
export const getStatics=(data)=>apiCall({
    url: '/reports/get-increase/'+data.businessId,
    method:'get',
    params: data.params,
    onSuccess: slice.actions.getStatic.type,
    onFail: slice.actions.getStatic.type
});
export const getLidTrade=(data)=>apiCall({
    url: '/reports/get-trade-by-lid/'+data.businessId,
    method:'get',
    params: data.params,
    onSuccess: slice.actions.getTradeLid.type,
    onFail: slice.actions.getTradeLid.type
});


export const getLidReportBusinessId=(data)=>apiCall({
    url: '/reports/lid-report/'+data,
    method:'get',
    onSuccess: slice.actions.getFromLid.type,
    onFail: slice.actions.getFromLid.type,
});

export const getReportProject=(data)=>apiCall({
    url: '/reports/amounts-by-project',
    method:'get',
    params:data,
    onSuccess: slice.actions.getFromProject.type,
    onFail: slice.actions.getFromProject.type,
});
export const getCashKassa=(data)=>apiCall({
    url: `/reports/get-checkout/`+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getKassa.type,
    onFail: slice.actions.getKassa.type,
});


export default slice.reducer
