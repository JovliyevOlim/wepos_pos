import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'savdolar',
    initialState: {
        trades: [],
        tradeOne: null,
        tradeView:[],
        treadeId:null,
        getTradeBool: false,
        current: false,
        success: false,
        message: '',
        saveBoolean: false,
        editBoolean: false,
        getOneBoolean:false,
        saveBooleanLid: false
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.trades = action.payload.object
            } else {
                state.trades = []
                state.message = action.payload.message
            }
            state.getTradeBool = !state.getTradeBool
            state.success = false
            state.saveBooleanLid=false
            state.editBoolean = false
        },
        getFromById: (state, action) => {
            if (action.payload.success){
                state.tradeOne = action.payload.object
            }else {
                state.message = action.payload.message
                state.tradeOne = null
            }
            state.getOneBoolean = !state.getOneBoolean
        },
        viewFromById: (state, action) => {
            if (action.payload.success){
                let a  =  []
                a.push(action.payload.object)
                state.tradeView = a
            }else {
                state.message = action.payload.message
                state.tradeView = []
            }
            state.getOneBoolean = !state.getOneBoolean

        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                // state.current = !state.current
                state.success = true
                state.saveBoolean = true
                state.treadeId = action.payload?.object
                state.saveBooleanLid=true
            } else if (action.payload.success === false) {
                toast.warning(action.payload.message)
                state.treadeId = null
                state.success = false
            }
            state.current = !state.current

        },
        editfrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.success = true
                state.treadeId = action.payload?.object
                state.editBoolean=true
            } else if (action.payload.success === false) {
                toast.warning(action.payload.message)
                state.treadeId = null
                state.success = false
            }
            state.current = !state.current

        },
        clearSuccess: (state, action) => {
            state.success = false
        }

    }
});

export const getTradeByBusiness = (data) => apiCall({
    url: '/trade/get-by-business/' + data.businessId,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getTradeByBranch = (data) => apiCall({
    url: `/trade/get-by-branch/`+data.branchId,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getTradeById = (data) => apiCall({
    url: '/trade/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromById.type,
    onFail: slice.actions.getFromById.type
});

export const viewTradeById = (data) => apiCall({
    url: '/trade/view/' + data,
    method: 'get',
    onSuccess: slice.actions.viewFromById.type,
    onFail: slice.actions.viewFromById.type
});

export const saveSavdolar = (data) => apiCall({
    url: '/trade',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const editSavdolar = (data) => apiCall({
    url: '/trade/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editfrom.type,
    onFail: slice.actions.editfrom.type,
});

export const deleteSavdolar = (data) => apiCall({
    url: '/trade/' + data.deleteID,
    method: 'delete',
    params: data.params,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})



export const {clearSuccess} = slice.actions
export default slice.reducer
