import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'maxsulotxisobot',
    initialState: {
        productHistory:[],
        productPage:null,
        productWorked:[],
        lossProducts:[],
        message:'',
        getBoolean:false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.productHistory = action.payload.object
            }
            else{
                state.message = action.payload.message
                state.productHistory = []
            }
            state.getBoolean = !state.getBoolean
        },
        getFromLoss: (state, action) => {
            if (action.payload.success){
                state.lossProducts = action.payload.object
            }
            else{
                state.message = action.payload.message
                state.lossProducts = []
            }
            state.getBoolean = !state.getBoolean
        },
        getFromByProduct: (state, action) => {
            if (action.payload.success){
                state.productWorked = action.payload.object
            }
            else{
                state.message = action.payload.message
                state.productWorked = []
            }
            state.getBoolean = !state.getBoolean
        },
    }
});

export const getProductHistoryByBusiness=(data)=>apiCall({
    url: '/product-history/get-info-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail:slice.actions.getFrom.type
});

export const getProductHistoryByBranch=(data)=>apiCall({
    url: '/product-history/get-info-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail:slice.actions.getFrom.type
});

export const getProductHistoryByProductByBusiness=(data)=>apiCall({
    url: '/product-history/get-by-product-by-business/'+data.productId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFromByProduct.type,
    onFail:slice.actions.getFromByProduct.type
});

export const getProductHistoryByProductByBranch=(data)=>apiCall({
    url: '/product-history/get-by-product-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFromByProduct.type,
    onFail:slice.actions.getFromByProduct.type
});

export const getLossProductByBusiness=(data)=>apiCall({
    url: '/loss/get-info-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFromLoss.type,
    onFail:slice.actions.getFromLoss.type
});

export const getLossProductByBranch=(data)=>apiCall({
    url: '/loss/get-info-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFromLoss.type,
    onFail:slice.actions.getFromLoss.type
});

export default slice.reducer