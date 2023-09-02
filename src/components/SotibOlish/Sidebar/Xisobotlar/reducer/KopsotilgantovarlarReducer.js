import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../api";
// import {toast} from "react-toastify";

const slice = createSlice({
    name: 'kopsotilgan',
    initialState: {
        kopsotilgan: null,
        current: false,
        message: ''
    },
    reducers: {
        getFrom: (state, action) => {
            if (action.payload.success) {
                state.kopsotilgan = action.payload.object
                state.current = !state.current
            } else {
                state.kopsotilgan = null
                state.message = action.payload.message
                state.current = !state.current

            }

        }

    }
});

export const getKopsotilgan = (data) => apiCall({
    url: `/reports/most-sale/${data.branchId}?${data.category ? `&categoryId=${data.category}` : ''}${data.brand ? `&brandId=${data.brand}` : ''}${data.startDate ? `&startDate=${data.startDate}` : ''}${data.endDate ? `&endDate=${data.endDate}` : ''}`,
    method: 'get',
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type
});


export default slice.reducer