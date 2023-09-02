import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'savdolar',
    initialState: {
        savdolar: [],
        amount:0,
        qarz:0,
        uzcard:0,
        naqd:0,
        humo:0,
    },
    reducers: {
        getFrom: (state, action) => {
            state.savdolar = action.payload.object
            let amount=0
            let qarz=0
            let uzcard=0
            let naqd=0
            let humo=0
            action.payload.object.map(item=>{
                    amount+=item.amountPaid
                    qarz+=item.loan
                    if (item.payMethod.id===2){
                        uzcard+=item.amountPaid
                    }
                    else if(item.payMethod.id===1){
                        naqd+=item.amountPaid
                    }
                    else if(item.payMethod.id===3){
                        humo+=item.amountPaid
                    }
                },
            )
            state.amount=amount
            state.qarz=qarz
            state.uzcard=uzcard
            state.humo=humo
            state.naqd=naqd
        },
        savefrom: (state,action) => {
            state.savdolar.unshift(action.payload.object)
            // state.savdolar.unshift(action.payload.message)
            toast.success('Savdo qo`shildi')
        },
        editfrom: (state,action) => {
            state.savdolar.map((item,index)=>{
                if (item.id === action.payload.id){
                    item.login = action.payload.login
                }
            })
            toast.success('Savdo tahrirlandi')
        },
        deletefrom:(state,action)=>{
            toast.info('Savdo O`chirildi')
        }
    }
});

export const getSavdolarHistory=(data)=>apiCall({
    url: '/trade-history/get-by-business/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type
});

export const getSavdolar2 =(data)=>apiCall({
    url: 'trade/get-by-branchId/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type
});

export const getSavdolar3 =(data)=>apiCall({
    url: 'trade/get-by-PayDate/'+data,
    method:'get',
    onSuccess: slice.actions.getFrom.type
});

export const saveSavdolar=(data)=>apiCall({
    url: '/trade',
    method:'post',
    data,
    onSuccess: slice.actions.savefrom.type
});

export const editSavdolar=(data)=>apiCall({
    url: '/trade/'+data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editfrom.type
});

export const deleteSavdolar=(data)=>apiCall({
    url: '/trade/'+data,
    method:'delete',
    data,
    onSuccess: slice.actions.deletefrom.type
})

export default slice.reducer