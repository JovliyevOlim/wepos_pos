import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'xaridlar',
    initialState: {
        purchase: [],
        puchaseOne: [],
        saveBoolean:false,
        getBoolean:false,
        message:'',
        current:false,


        xaridlarjami:0,
        xaridsumma:0,
        xaridqarz:0,
        xaridlarcost:{},
        xaridMahsulot:null,
        xaridTotal: 0,
        xaridProductList: [],
        loading : false,

    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success){
                state.purchase = action.payload.object
            }else {
                state.message = action.payload.message
                state.purchase = []
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        getFromOne: (state, action) => {
            if (action.payload.success){
                let a = []
                a.push(action.payload.object)
                state.purchaseOne = a
            }else {
                toast.error(action.payload.message)
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean=false
        },
        getProductType:(state,action)=>{

            if (action.payload.success){
                state.xaridMahsulot = null
                state.xaridMahsulot = action.payload.object
                state.loading = true
            }
            else{
                state.loading = false
                state.xaridMahsulot = null
                state.message = action.payload.message
            }
            state.saveBoolean = false

        },
        getFromcost: (state, action) => {
            if (action.payload.success){
                state.xaridlarcost = action.payload.object
            }else {
                state.message = action.payload.message
            }
            state.saveBoolean=!state.saveBoolean
        },
        getFromTotal:(state,action)=>{
            if (action.payload.success){
                state.xaridTotal = action.payload.object
            }else {
                state.message = action.payload.message
            }
            state.saveBoolean=!state.saveBoolean
        },
        savefrom: (state,action) => {
            if (action.payload.success){
                state.saveBoolean = true
                toast.success(action.payload.message)
            }else {
                toast.error(action.payload.message)
            }
            state.current=!state.current
        },
    }
});

export const getPurchaseByBusiness=(data)=>apiCall({
    url: '/purchase/get-by-business/'+data.businessId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail:slice.actions.getFrom.type
});
export const getPurchaseByBranch=(data)=>apiCall({
    url: '/purchase/get-by-branch/'+data.branchId,
    method:'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getXaridProductType=(data)=>apiCall({
    url: '/product/get-by-branch-for-purchase-trade/'+data,
    method:'get',
    onSuccess: slice.actions.getProductType.type,
    onFail: slice.actions.getProductType.type,
});
export const getPurchaseById=(data)=>apiCall({
    url: '/purchase/'+data,
    method:'get',
    onSuccess: slice.actions.getFromOne.type,
    onFail: slice.actions.getFromOne.type
});
export const getPurchaseView=(data)=>apiCall({
    url: '/purchase/view/'+data,
    method:'get',
    onSuccess: slice.actions.getFromOne.type,
    onFail: slice.actions.getFromOne.type
});

export const getXaridCost=(data)=>apiCall({
    url: '/purchase/get-by-business/'+data,
    method:'get',
    onSuccess: slice.actions.getFromcost.type,
    onFail: slice.actions.getFromcost.type
});
export const saveXarid=(data)=>apiCall({
    url: '/purchase',
    method:'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const editXarid=(data)=>apiCall({
    url: '/purchase/'+data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteXarid=(data)=>apiCall({
    url: '/purchase/'+data,
    method:'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer
