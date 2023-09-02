import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice = createSlice({
    name: 'notification',
    initialState: {
        notificationCount: 0,
        notifications: [],
        current: false,
        message: '',
        saveBoolean: false,
        saveSmsBoolean: false
    },
    reducers: {
        get: (state, action) => {
            if (action.payload.success) {
                state.notificationCount = action.payload.object
            } else {
                state.notificationCount = 0
            }
            state.saveBoolean = false

        },
        getAll: (state, action) => {
            if (action.payload.success) {
                state.notifications = action.payload.object
            } else {
                state.notifications = []
                state.message = action.payload.message
            }
            state.current = !state.current
            state.saveBoolean = false

        },
        readNotifications:(state,action)=>{
            state.saveBoolean = true
            state.current=!state.current
        },
        saveSms:(state,action)=>{
            if (action.payload.success){
                toast.success('SMS JO`NATILDI')
                state.saveSmsBoolean = true
            } else {
               toast.success(action.payload.message)
            }
        },
        saveWebSocket:(state,action)=>{
            if (action.payload.success){
                toast.success('SAVED')
            }  else {
                toast.error('ERROR')
            }
        },
        deleteAll: (state, action) => {
            if (action.payload.success) {
                state.current = !state.current

            } else {
                state.current = !state.current
                state.message = action.payload.message
            }
        }
    }
})

export const getNotification = () => apiCall({
    url: '/notification/count',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type
})

export const getNotificationAll = () => apiCall({
    url: '/notification',
    method: 'get',
    onSuccess: slice.actions.getAll.type,
    onFail: slice.actions.getAll.type
})
export const isReadNotification = (data) => apiCall({
    url: '/notification/read/'+data,
    method: 'put',
    onSuccess: slice.actions.readNotifications.type,
    onFail: slice.actions.readNotifications.type
})
export const sendSms = (data) => apiCall({
    url: '/sms',
    method: 'post',
    data,
    onSuccess: slice.actions.saveSms.type,
    onFail: slice.actions.saveSms.type
})
export const sendWebSocket = (data) => apiCall({
    url: '/send',
    method: 'post',
    data,
    onSuccess: slice.actions.saveWebSocket.type,
    onFail: slice.actions.saveWebSocket.type
})

export const deleteNotification = (id) => apiCall({
    url: '/notification/'+id,
    method: 'delete',
    onSuccess: slice.actions.readNotifications.type,
    onFail: slice.actions.readNotifications.type
})
export const deleteAllNotification = (id) => apiCall({
    url: '/notification/all',
    method: 'delete',
    onSuccess: slice.actions.readNotifications.type,
    onFail: slice.actions.readNotifications.type
})
export default slice.reducer