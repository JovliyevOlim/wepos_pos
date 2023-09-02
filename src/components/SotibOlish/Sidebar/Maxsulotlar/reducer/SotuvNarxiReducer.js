import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'sotuvnarxi',
    initialState: {
        sotuvnarxi: []
    },
    reducers: {
        getFrom: (state, action) => {
            state.sotuvnarxi = action.payload
        },
        savefrom: (state,action) => {
            state.sotuvnarxi.unshift(action.payload)
            toast.success('SAQLANDI')
        },
        editfrom: (state,action) => {
            state.sotuvnarxi.map((item,index)=>{
                if (item.id === action.payload.id){
                    item.login = action.payload.login
                }
            })
            toast.success('Tahrirlandi')
        },
        deletefrom:(state,action)=>{

            // toast.info('O`chirildi')
        }
    }
});

export const getSotuvNarxi=()=>apiCall({
    url: '/user',
    method:'get',
    onSuccess: slice.actions.getFrom.type
});

export const saveSotuvNarxi=(data)=>apiCall({
    url: '/user',
    method:'post',
    data,
    onSuccess: slice.actions.savefrom.type
});

export const editSotuvNarxi=(data)=>apiCall({
    url: '/user',
    method: 'post',
    data,
    onSuccess: slice.actions.editfrom.type
});

export const deleteSotuvNarxi=(data)=>apiCall({
    url: '/user',
    method:'post',
    data,
    onSuccess: slice.actions.deletefrom.type
})

export default slice.reducer