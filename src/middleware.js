import axios from "axios";
// export  const  BaseUrl = 'http://147.182.161.225:8080/api'
export  const  BaseUrl = 'https://backend.miro.uz/api'

// export  const  BaseUrl = 'http://localhost:8080/api'
// export  const  BaseUrl = 'http://192.168.50.62:8080/api'


export const axiosCreate = axios.create({
    baseURL: BaseUrl,
    headers:{
        "Content-Type":  'application/json',
        Authorization:`Bearer ${localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')}`
    },
})
export const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== "api/apiCall") {
        next(action)
        return
    }
    next(action)
    const {url, method, data, onSuccess,params, onFail,contentType} = action.payload
    axios({
        baseURL: BaseUrl,
        headers:{
            "Content-Type": contentType ? contentType : 'application/json',
            Authorization:`Bearer ${ localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')}`
        },
        url, method, data,params
    }).then(res => {
         dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        console.error(err.response)
        dispatch({
            type: onFail,
            payload: {...err?.response?.data,success:false}
        })
    })
}
export default api
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
