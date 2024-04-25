import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'maxsulotlar',
    initialState: {
        productTableSearch:{},
        productSearch: [],
        productForShopping:[],
        productLifeTime:[],
        OneProductLifeTime:[],
        isClearInput:false,
        product: {},
        productView:{},
        productViewExtra:{},
        current: false,
        active:false,
        message:'',
        excel: '',
        getBoolean: false,
        saveBoolean: false,
    },
    reducers: {
        getFromForTable: (state, action) => {
            if (action.payload.success) {
                state.productTableSearch = action.payload.object
            } else {
                state.productTableSearch = null
                state.message = action.payload.message
            }
            state.getBoolean=!state.getBoolean
            state.saveBoolean = false
        },
        getFromForTableLifeTime: (state, action) => {
            if (action.payload.success) {
                state.productLifeTime = action.payload.object
            } else {
                state.productLifeTime = null
                state.message = action.payload.message
            }
            state.getBoolean=!state.getBoolean
            state.saveBoolean = false
        },
        getFromBarcodeAndName: (state, action) => {
            console.log(state.productSearch)
            if (action.payload.success) {
                state.productSearch = action.payload.object
                state.isClearInput = false
            } else {
                state.isClearInput = true
                state.productSearch = []
                toast.warning(action.payload.message)
            }
            state.getBoolean=!state.getBoolean
            state.saveBoolean = false
        },
        getProductByBranchForShopping: (state, action) => {
            if (action.payload.success) {
                state.productForShopping = action.payload.object
            } else {
                state.productForShopping = []
                state.message = action.payload.message
            }
            state.getBoolean=!state.getBoolean
            state.saveBoolean = false
        },
        getFromById: (state, action) => {
            if (action.payload.success){
                state.product = action.payload.object
                state.active = !state.active
            }else {
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
        },
        getFromByIdView: (state, action) => {
            if (action.payload.success){
                state.productView = action.payload.object?.getDto
                state.productViewExtra = action.payload.object?.amountDto
                state.active = !state.active
            }else {
                state.message = action.payload.message
                state.productView = {}
                state.productViewExtra = {}
            }
            state.getBoolean = !state.getBoolean
        },
        savefrom: (state, action) => {
            if (action.payload.success){
                state.saveBoolean = true
                toast.success(action.payload.message)
            }
            else {
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
        savefromByExcel: (state, action) => {
            if (action.payload.success){
                state.saveBoolean =true
                toast.success(action.payload.message)
            }else {
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
    }
});


export const getProductTableSearch = (data) => apiCall({
    url: `/product/get-by-business/${data.businessId}`,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFromForTable.type,
    onFail: slice.actions.getFromForTable.type
});
export const getProductTableLifeTime = (id) => apiCall({
    url: `/product-lifetime/view-lifetime/${id}`,
    method: 'get',
    onSuccess: slice.actions.getFromForTableLifeTime.type,
    onFail: slice.actions.getFromForTableLifeTime.type
});
export const getProductTableLifeTimeEndDate = (id) => apiCall({
    url: `/product-lifetime/view-end-date/${id}`,
    method: 'get',
    onSuccess: slice.actions.getFromForTableLifeTime.type,
    onFail: slice.actions.getFromForTableLifeTime.type
});
export const getProductTableSearchBranch = (data) => apiCall({
    url: `/product/get-by-branch/${data.branchId}`,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFromForTable.type,
    onFail: slice.actions.getFromForTable.type
});
export const getMaxsulotById = (data) => apiCall({
    url: '/product/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromById.type,
    onFail: slice.actions.getFromById.type
});

export const getMaxsulotByIdView = (data) => apiCall({
    url: '/product/view/' + data.productId,
    method: 'get',
    params:{
        id:data.id,
    },
    onSuccess: slice.actions.getFromByIdView.type,
    onFail: slice.actions.getFromByIdView.type
});

export const getBarcodeAndName = (data) => apiCall({
    url: '/product/search-by-product/'+data.branchId,
    method: 'get',
    params:{
        search:data.name
    },
    onSuccess: slice.actions.getFromBarcodeAndName.type,
    onFail: slice.actions.getFromBarcodeAndName.type

});
export const getProductForShopping = (data) => apiCall({
    url: '/product/search-by-category/'+data.branchId,
    method: 'get',
    params:{
        categoryId:data.categoryId
    },
    onSuccess: slice.actions.getProductByBranchForShopping.type,
    onFail: slice.actions.getProductByBranchForShopping.type

});

export const saveMaxsulotRuyxati = (data) => apiCall({
    url: '/product',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const saveProductByExcelFile = (data)=>apiCall({
    url:`/excel/`+data.branchId,
    method:'post',
    data:data.file,
    contentType:'"multipart/form-data"',
    onSuccess:slice.actions.savefromByExcel.type,
    onFail:slice.actions.savefromByExcel.type
})
export const editMaxsulotRuyxati = (data) => apiCall({
    url: '/product/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteMaxsulotRuyxati = (data) => apiCall({
    url: '/product/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})
export const deleteMaxsulotRuyxatiByIds = (data) => apiCall({
    url: '/product/delete-few',
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})


export default slice.reducer
