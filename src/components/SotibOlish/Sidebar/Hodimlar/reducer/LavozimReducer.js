import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'lavozimlar',
    initialState: {
        roles: [],
        oneRole:{},
        current: false,
        message: '',
        getBoolean: false,
        saveRoleBool: false,
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.roles = action.payload.object
            } else {
                state.roles = []
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveRoleBool = false
        },
        getFromOne: (state, action) => {
            if (action.payload.success) {
                state.oneRole = action.payload.object
            } else {
                state.oneRole = {}
                state.message = action.payload.message
            }
            state.getBoolean = !state.getBoolean
            state.saveRoleBool = false
        },
        savefrom: (state, action) => {
            if (action.payload.success) {
                toast.success(action.payload.message)
                state.saveRoleBool = true
            } else {
                toast.warning(action.payload.message)
            }
            state.current = !state.current
        },
    }
});

export const getLavozim = (data) => apiCall({
    url: '/role/get-by-business/' + data,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
});
export const getLavozimById = (data) => apiCall({
    url: '/role/' + data,
    method: 'get',
    onSuccess: slice.actions.getFromOne.type,
    onFail: slice.actions.getFromOne.type,
});
export const saveLavozim = (data) => apiCall({
    url: '/role',
    method: 'post',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const editLavozim = (data) => apiCall({
    url: '/role/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
});

export const deleteLavozim = (data) => apiCall({
    url: '/role/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type
})

export default slice.reducer