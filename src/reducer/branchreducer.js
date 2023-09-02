import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice = createSlice({
    name: 'branch',
    initialState: {
        branch: [],
        branches: null,
        current: false,
        getBranchBool: false,
        saveBranchBool: false,
        message: '',
        saveBranch: null
    },
    reducers: {
        get: (state, action) => {
            if (action.payload.success) {
                state.branch = action.payload.object
                let a = action.payload.object.map(({
                                                       name: label,
                                                       id: value, ...rest
                                                   }) => ({label, value, ...rest}));
                state.branches = a
            } else {
                state.branches = null
                state.branch = []
                state.message = action.payload.message
            }
            state.getBranchBool = !state.getBranchBool
            state.saveBranchBool = false
        },
        save: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveBranchBool = true
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
    }
})

export const getbranch = (data) => apiCall({
    url: '/branch/get-all-by-business/' + data,
    method: 'get',
    data,
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
})
export const savebranch = (data) => apiCall({
    url: '/branch',
    method: 'post',
    data,
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type
})
export const editbranch = (data) => apiCall({
    url: '/branch/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type,
})

export const deletebranch = (data) => apiCall({
    url: '/branch/' + data,
    method: 'delete',
    onSuccess: slice.actions.save.type,
    onFail: slice.actions.save.type,
})

export default slice.reducer
