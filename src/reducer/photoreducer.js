import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'photo',
    initialState: {
        photo: null,
        titlePhoto:null,
        photoManyProduct:null,
        ManyCurrent:false,
        current:false,
        titlePhotoCurrent:false,
        savePhoto:false
    },
    reducers: {
        savefrom: (state,action) => {
            state.current=!state.current
            let a  = action.payload.object.id
            state.savePhoto = true
            state.photo = a
        },
        savefromMany: (state,action) => {
            state.ManyCurrent=!state.ManyCurrent
            let a  = action.payload.object.id
            state.photoManyProduct = a
            toast.success('Saqlandi')
        },
        saveTitle: (state,action) => {
            state.titlePhotoCurrent=!state.titlePhotoCurrent
            let a  = action.payload.object.id
            state.titlePhoto = a
            toast.success('Saqlandi')
        },
        deleteFrom: (state,action) => {
        },
        clearPhotoId:(state,action)=>{
            let a  = null
            state.photo = a
            state.titlePhoto = a
            state.savePhoto = false
        }
    }
});


export const savephoto=(data)=>apiCall({
    url: '/attachment/upload',
    method:'post',
    data:data,
    onSuccess: slice.actions.savefrom.type,
    onFail: slice.actions.savefrom.type,
});

export const savePhotoProduct=(data)=>apiCall({
    url: '/attachment/upload',
    method:'post',
    data:data,
    onSuccess: slice.actions.savefromMany.type
});

export const savePhotoTitle=(data)=>apiCall({
    url: '/attachment/upload',
    method:'post',
    data:data,
    onSuccess: slice.actions.saveTitle.type
});
export const deletePhoto=(data)=>apiCall({
    url: '/attachment/'+data,
    method:'delete',
    data:data,
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type
});

export const {clearPhotoId} = slice.actions
export default slice.reducer