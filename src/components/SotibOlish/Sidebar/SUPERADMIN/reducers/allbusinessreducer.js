import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'allbusiness',
    initialState: {
        business:null,
        current: false,
        onebusiness:null,
        addBusinessSuccess: false,
        status: null,
        existBusiness: false,
        existUser: false,
        getBoolean: false,
        saveBoolean: false,
        message: '',
        businessMinusSHopBoolean: false,
        changeMinusBoolean: false,
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.business = action.payload.object
            } else {
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveBoolean = false
            state.addBusinessSuccess = false
        },
        getFrom2: (state, action) => {
            if (action.payload.success) {
                state.onebusiness = action.payload.object
            } else {
                state.onebusiness = null
                state.message = action.payload.message
            }
            state.changeMinusBoolean = false
            state.businessMinusSHopBoolean = !state.businessMinusSHopBoolean
        },
        saveFrom: (state, action) => {
            if (action.payload.success) {
                state.addBusinessSuccess = true
                toast.success(action.payload.message)
            } else {
                state.addBusinessSuccess = false
                toast.warning(action.payload.message)
            }
            state.current= !state.current
        },
        checkBusiness: (state, action) => {
            if (action.payload.success) {
                state.existBusiness = false
            } else {
                state.existBusiness = true
            }
        },
        checkUser: (state, action) => {
            if (action.payload.success) {
                state.existUser = false
            } else {
                state.existUser = true
            }
        },
        editFrom: (state, action) => {
            if (action.payload.success) {
                toast.success(`Tahrirlandi`)

            } else {
                toast.success(action.payload.message)
            }
            state.current = !state.current
            state.changeMinusBoolean = true
        },
        deleteFrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
            }
            else {
                toast.warning(action.payload.message)
            }
            state.current =!state.current
        }
    }

});

export const getAllBusiness = (data) => apiCall({
    url: '/business',
    method: 'get',
    params:data,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getOneBusiness = (data) => apiCall({
    url: '/business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom2.type,
    onFail: slice.actions.getFrom2.type
});
export const changeBusinessActive=(data)=>apiCall({
    url: '/business/de-active/'+data,
    method: 'put',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
})
export const editMyBusiness=(data)=>apiCall({
    url: '/business/edit-my-business',
    method: 'put',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
})
export const checkBusiness = (data) => apiCall({
    url: '/business/check-business-name',
    method: 'post',
    data,
    onSuccess: slice.actions.checkBusiness.type,
    onFail: slice.actions.checkBusiness.type
});

export const checkUser = (data) => apiCall({
    url: '/business/check-username',
    method: 'post',
    data,
    onSuccess: slice.actions.checkUser.type,
    onFail: slice.actions.checkUser.type
});
export const saveBusiness = (data) => apiCall({
    url: '/business/create',
    method: 'post',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
});
export const editBusiness = (data) => apiCall({
    url: '/business/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type
});

export const changeBusinessMinus = (data) => apiCall({
    url: '/business/setting',
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type
});
export const deleteBusiness = (data) => apiCall({
    url: '/business/'+data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type
});


export default slice.reducer
