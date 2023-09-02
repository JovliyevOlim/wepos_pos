import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'customer',
    initialState: {
        customers:[],
        customersTrade:[],
        current: false,
        message: '',
        CustomerOne: null,
        getBoolean: false,
        saveBoolean: false,
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.customers = action.payload.object

            } else {
                state.message = action.payload.message
                state.customers = []
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        getFromForTrade: (state, action) => {
            if (action.payload.success) {
                state.customersTrade = action.payload.object

            } else {
                state.message = action.payload.message
                state.customersTrade = []
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
        },
        getFromCustomerOne: (state, action) => {
            state.CustomerOne = action.payload.object
        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveBoolean = true
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current

        },
    }
});

export const getCustomers = (data) => apiCall({
    url: '/customer/get-by-business/' + data.businessId,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const getCustomersByBranch = (data) => apiCall({
    url: '/customer/get-by-branch/' + data.branchId,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getCustomersForTrade = (data) => apiCall({
    url: '/customer/for-trade/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromForTrade.type,
    onFail: slice.actions.getFromForTrade.type
});
export const getCustomersForTradeBusiness = (data) => apiCall({
    url: '/customer/for-trade-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromForTrade.type,
    onFail: slice.actions.getFromForTrade.type
});
export const saveCustomer = (data) => apiCall({
    url: '/customer',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const editCustomer = (data) => apiCall({
    url: '/customer/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const deleteCustomer = (data) => apiCall({
    url: '/customer/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type,
});
export const customerGetPayment = (data) => apiCall({
    url: '/customer/get-payment/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});
export const customerReturnPayment = (data) => apiCall({
    url: '/customer/return-payment/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const getCustomerOne = (data) => apiCall({
    url: '/customer/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromCustomerOne.type,
    onFail: slice.actions.getFromCustomerOne.type
});


export default slice.reducer
