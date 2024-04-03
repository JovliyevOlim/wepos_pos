import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../../../../../api";
import {toast} from "react-toastify";

const slice = createSlice({
  name: 'registerUsers',
  initialState: {
    registerUsers: null,
    current: false,
    message:'',
    boolean: false

  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.registerUsers = action.payload?.object
      } else {
        state.registerUsers = null
        state.message  = action.payload?.message
      }
      state.boolean  = false
    },
    savefrom: (state, action) => {
      if (action.payload.success) {
        toast.success(action.payload?.message)
        state.boolean  = true
      }
      else{
        toast.error(action.payload?.message)
      }
      state.current = !state.current
    },
  }
});

export const getRegisterUsers = (item) => apiCall({
  url: `/suggestions/getAll?page=${item.page - 1}&size=${item.size}`,
  method: 'get',
  onSuccess: slice.actions.getFrom.type
});

export const editRegisterUsers = (data) => apiCall({
  url: '/tariff/' + data.id,
  method: 'put',
  data,
  onSuccess: slice.actions.savefrom.type,
  onFail: slice.actions.savefrom.type
});

export default slice.reducer
