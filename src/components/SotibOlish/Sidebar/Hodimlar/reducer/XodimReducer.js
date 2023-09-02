import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'xodimlar',
    initialState: {
        users: [],
        oneXodim: {},
        usersFiltering:[],
        current: true,
        message: '',
        getBoolean: false,
        saveUserBool: false,
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.users = action.payload.object
            } else {
                state.users = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveUserBool = false
        },
        getFiltering: (state, action) => {
            if (action.payload.success) {
                state.usersFiltering = action.payload.object
            } else {
                state.usersFiltering = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveUserBool = false
        },
        getFromById: (state, action) => {
            if (action.payload.success) {
                state.oneXodim = action.payload.object
            }
            else {
                state.oneXodim = {}
                state.message = action.payload.message
            }
        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                state.saveUserBool = true
                toast.success(action.payload.message)
            } else {
                toast.warning(action.payload.message)
            }
            state.current = !state.current
        },
    }
});
export const getUserByBranch = (data) => apiCall({
    url: '/user/get-by-branch/' + data.id,
    method: 'get',
    params: data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});

export const getXodim = (data) => apiCall({
    url: '/user/get-by-business/' + data.id,
    method: 'get',
    params:data.params,
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});
export const getUserForFiltering = (data) => apiCall({
    url: '/user/user-list/' + data,
    method: 'get',
    onSuccess: slice.actions.getFiltering.type,
    onFail: slice.actions.getFiltering.type
});
export const getUserForFilteringBusiness = (data) => apiCall({
    url: '/user/user-list-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFiltering.type,
    onFail: slice.actions.getFiltering.type
});
export const getXodimID = (data) => apiCall({
    url: '/user/' + data,
    method: 'get',
    data,
    onSuccess: slice.actions.getFromById.type,
    onFail: slice.actions.getFromById.type
});

export const saveXodim = (data) => apiCall({
    url: '/user',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const editXodim = (data) => apiCall({
    url: '/user/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteXodim = (data) => apiCall({
    url: '/user/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer
