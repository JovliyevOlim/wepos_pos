import axios from "axios";

export const BaseUrl = 'http://192.168.1.217:8090/api'
// export  const  BaseUrl = 'https://backend.miro.uz/api'


export const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== "api/apiCall") {
        next(action)
        return
    }
    next(action)
    const {url, method, data, onSuccess, params, onFail, contentType} = action.payload
    axios({
        baseURL: BaseUrl,
        headers: {
            "Content-Type": contentType ? contentType : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')}`
        },
        url, method, data, params
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        console.error(err.response)
        dispatch({
            type: onFail,
            payload: {...err?.response?.data, success: false}
        })
    })
}
axios.interceptors.response.use((res) => {
    return res;
}, (error) => {
    const status = error?.response?.status;
    if (status === 401) {
        // localStorage.removeItem("user");
        // localStorage.removeItem("tokenname");
        // sessionStorage.removeItem("user");
        // sessionStorage.removeItem("tokenname");
        // window.location.href='/login'
    }
    return Promise.reject(error)
})
