import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice = createSlice({
    name: 'users',
    initialState: {
        userInfo: null,
        users: [],
        id: '',
        user: {},
        token: {
            token_name: ''
        },
        branches: [],
        branchesValues: [],
        roles: [],
        roleID: '',
        businessId: "",
        branchId: "",
        authEnter: false,
        error: false,
        rememberme: false,
        logout: false,
        saveBoolean: false,
        current: false,


        //User Roles
        addUser: false,//1
        editUser: false,//2
        getUser: false,//3
        getUserAdmin: false,//4
        deleteUser: false,//5

        addRole: false,//7
        editRole: false,//8
        getRole: false,//9
        deleteRole: false,//10


        addBranch: false,//11
        editBranch: false,//12
        getBranch: false,//13
        deleteBranch: false,//14

        addOutlay: false,//15
        editOutlay: false,//16
        getOutlay: false,//17
        getOutlayAdmin: false,//18
        deleteOutlay: false,//19


        addTrade: false,//20
        editTrade: false,//21
        getTrade: false,//22
        getTradeAdmin: false,//23
        deleteTrade: false,//24

        addPurchase: false,//25
        editPurchase: false,//26
        getPurchase: false,//27
        getPurchaseAdmin: false,//28
        deletePurchase: false,//29

        brandRoles: false,
        categoryRoles: false,
        measurementRoles: false,
        productTypeRoles:false,


        addProduct: false,//42
        editProduct: false,//43
        getProduct: false,//44
        deleteProduct: false,//45
        getProductAdmin: false,//46

        addSupplier: false,//47
        editSupplier: false,//48
        getSupplier: false,//49
        deleteSupplier: false,//50

        addCustomer: false,//51
        editCustomer: false,//52
        getCustomer: false,//53
        deleteCustomer: false,//54
        getCustomerAdmin: false,//55


        editMyBusiness: false,//56
        editInvoice: false,//57

        getInfoAdmin: false,//58
        getInfo: false,//59

        getBalance: false,//60
        getBalanceAdmin: false,//61
        editBalance: false,//62

        addLoss: false,//63
        getLoss: false,//64
        getLossAdmin: false,//65


        isSuperAdmin: false
    },
    reducers: {
        saveusers: (state, action) => {
            console.log(action.payload)
            if (action.payload.success) {
                console.log(action)
                state.authEnter = true

                state.users = action.payload.object
                if (action.payload.object.businessId) {
                    state.businessId = action.payload.object.businessId
                }
                if (action.payload.object?.branches && action.payload.object?.branches?.length >0) {
                    state.branchId = action.payload.object.branches[0].id
                    state.branchesValues = action.payload.object.branches.map(({
                                                                                   name: label,
                                                                                   id: value, ...rest
                                                                               }) => ({label, value, ...rest}))
                    state.branches = action.payload.object.branches
                }
                state.roleID = action.payload.object.role?.id
                state.id = action.payload.object?.id
                if (state.rememberme) {
                    localStorage.setItem('user', JSON.stringify(action.payload.object))
                    if (action.payload.message) {
                        localStorage.setItem('tokenname', action.payload.message)
                    }
                    localStorage.setItem('authLogin', state.authEnter)
                } else {
                    sessionStorage.setItem('user', JSON.stringify(action.payload.object))
                    if (action.payload.message) {
                        sessionStorage.setItem('tokenname', action.payload.message)
                    }
                    sessionStorage.setItem('authLogin', state.authEnter)

                }
                state.logout = false
                state.roles = state.users.permissions
                state.users.permissions?.map(item => {
                    switch (item) {
                        case "SUPER_ADMIN":
                            state.isSuperAdmin = true
                            break;
                        case "ADD_USER":
                            state.addUser = true
                            break;
                        case "EDIT_USER":
                            state.editUser = true
                            break;
                        case "GET_USER":
                            state.getUser = true
                            break;
                        case "GET_USER_ADMIN":
                            state.getUserAdmin = true
                            break;
                        case "DELETE_USER":
                            state.deleteUser = true
                            break;

                        case "ADD_ROLE":
                            state.addRole = true
                            break;
                        case "EDIT_ROLE":
                            state.editRole = true
                            break;
                        case "GET_ROLE":
                            state.getRole = true
                            break;
                        case "DELETE_ROLE":
                            state.deleteRole = true
                            break;
                        case "ADD_BRANCH":
                            state.addBranch = true
                            break;
                        case "EDIT_BRANCH":
                            state.editBranch = true
                            break;
                        case "DELETE_BRANCH":
                            state.deleteBranch = true
                            break;
                        case "GET_BRANCH":
                            state.getBranch = true
                            break;
                        case "ADD_OUTLAY":
                            state.addOutlay = true
                            break;
                        case "EDIT_OUTLAY":
                            state.editOutlay = true
                            break;
                        case "GET_OUTLAY":
                            state.getOutlay = true
                            break;
                        case "DELETE_OUTLAY":
                            state.deleteOutlay = true
                            break;
                        case "GET_OUTLAY_ADMIN":
                            state.getOutlayAdmin = true
                            break;

                        case "ADD_TRADE":
                            state.addTrade = true
                            break;
                        case "EDIT_TRADE":
                            state.editTrade = true
                            break;
                        case "GET_TRADE":
                            state.getTrade = true
                            break;
                        case "DELETE_TRADE":
                            state.deleteTrade = true
                            break;
                        case "GET_TRADE_ADMIN":
                            state.getTradeAdmin = true
                            break;


                        case "ADD_PURCHASE":
                            state.addPurchase = true
                            break;
                        case "EDIT_PURCHASE":
                            state.editPurchase = true
                            break;
                        case "GET_PURCHASE":
                            state.getPurchase = true
                            break;
                        case "DELETE_PURCHASE":
                            state.deletePurchase = true
                            break;
                        case "GET_PURCHASE_ADMIN":
                            state.getPurchaseAdmin = true
                            break;


                        case "ALL_BRAND":
                            state.brandRoles = true
                            break;
                        case "ALL_CATEGORY":
                            state.categoryRoles = true
                            break;
                        case "ALL_MEASUREMENT":
                            state.measurementRoles = true
                            break;
                        case "ALL_TYPE":
                            state.productTypeRoles = true
                            break;


                        case "ADD_PRODUCT":
                            state.addProduct = true
                            break;
                        case "EDIT_PRODUCT":
                            state.editProduct = true
                            break;
                        case "GET_PRODUCT":
                            state.getProduct = true
                            break;
                        case "DELETE_PRODUCT":
                            state.deleteProduct = true
                            break;
                        case "GET_PRODUCT_ADMIN":
                            state.getProductAdmin = true
                            break;


                        case "ADD_CUSTOMER":
                            state.addCustomer = true
                            break;
                        case "EDIT_CUSTOMER":
                            state.editCustomer = true
                            break;
                        case "GET_CUSTOMER":
                            state.getCustomer = true
                            break;
                        case "DELETE_CUSTOMER":
                            state.deleteCustomer = true
                            break;
                        case "GET_CUSTOMER_ADMIN":
                            state.getCustomerAdmin = true
                            break;

                        case "ADD_SUPPLIER":
                            state.addSupplier = true
                            break;
                        case "EDIT_SUPPLIER":
                            state.editSupplier = true
                            break;
                        case "GET_SUPPLIER":
                            state.getSupplier = true
                            break;
                        case "DELETE_SUPPLIER":
                            state.deleteSupplier = true
                            break;
                        case 'EDIT_MY_BUSINESS':
                            state.editMyBusiness = true
                            break;
                        case 'EDIT_INVOICE':
                            state.editInvoice = true
                            break;

                        case "ADD_LOSS":
                            state.addLoss = true
                            break;
                        case "GET_LOSS":
                            state.getLoss = true
                            break;
                        case "GET_LOSS_ADMIN":
                            state.getLossAdmin = true
                            break;

                        case "EDIT_BALANCE":
                            state.editBalance = true
                            break;
                        case "GET_BALANCE":
                            state.getBalance = true
                            break;
                        case "GET_BALANCE_ADMIN":
                            state.getBalanceAdmin = true
                            break;

                        case "GET_INFO":
                            state.getInfo = true
                            break;
                        case "GET_INFO_ADMIN":
                            state.getInfoAdmin = true
                            break;
                    }
                })
            } else {
                if (action.payload.message) {
                    toast.info(action.payload.message)
                } else {
                    state.error = true
                    toast.info('Parol yoki login xato')
                }

            }
            state.saveBoolean = false
        },
        getUserInfo: (state, action) => {
            if (action.payload.success) {
                state.userInfo = action.payload.object
            }

        },
        editForm: (state, action) => {
            if (action.payload.success) {
                let isIt = localStorage.getItem('tokenname')
                if (isIt) {
                    localStorage.setItem('tokenname', action.payload.object)
                } else {
                    sessionStorage.setItem('tokenname', action.payload.object)
                }
                state.saveBoolean = true
                toast.success(action.payload.message)
            } else {
                toast.error(action.payload.message)
            }
            state.current = !state.current
        },
        changeerror: (state) => {
            state.error = false
        },
        savdooynasi: (state) => {
            state.linkheader = !state.linkheader
            state.linksavdooynasi = !state.linksavdooynasi
        },
        changeUserBranch: (state, action) => {
            console.log(action.payload.object)
        },
        rememberMe: (state, action) => {
            state.rememberme = action.payload.checked
        },
        logOutUser: (state) => {
            state.users = []
            state.id = ''
            state.user = {}
            state.branches = []
            state.roles = null
            state.businessId = ""
            state.branchId = ""
            state.authEnter = false
            state.error = false
            state.rememberme = false
            state.logout = true


            //User Roles
            state.isSuperAdmin = false
            state.addUser = false
            state.editUser = false
            state.getUser = false
            state.getUserAdmin = false
            state.deleteUser = false
            state.addRole = false
            state.editRole = false
            state.getRole = false
            state.deleteRole = false
            state.addBranch = false
            state.editBranch = false
            state.getBranch = false
            state.deleteBranch = false
            state.addOutlay = false
            state.editOutlay = false
            state.getOutlay = false
            state.getOutlayAdmin = false
            state.deleteOutlay = false
            state.addTrade = false
            state.editTrade = false
            state.getTrade = false
            state.getTradeAdmin = false
            state.deleteTrade = false
            state.addPurchase = false
            state.editPurchase = false
            state.getPurchase = false
            state.getPurchaseAdmin = false
            state.deletePurchase = false

            state.categoryRoles = false
            state.measurementRoles = false
            state.brandRoles = false
            state.productTypeRoles = false


            state.addProduct = false
            state.editProduct = false
            state.getProduct = false
            state.deleteProduct = false
            state.getProductAdmin = false


            state.addSupplier = false
            state.editSupplier = false
            state.getSupplier = false
            state.deleteSupplier = false

            state.addCustomer = false
            state.editCustomer = false
            state.getCustomer = false
            state.deleteCustomer = false
            state.getCustomerAdmin = false
            state.editMyBusiness = false
            state.editInvoice = false
            state.getInfoAdmin = false
            state.getInfo = false
            state.getBalance = false
            state.getBalanceAdmin = false
            state.editBalance = false
            state.addLoss = false
            state.getLoss = false
            state.getLossAdmin = false
        }
    }
})


export const getSelfInfo = (data) => apiCall({
    url: '/user/' + data,
    method: 'get',
    onSuccess: slice.actions.saveusers.type,
    onFail: slice.actions.saveusers.type
})
export const login = (data) => apiCall({
    url: '/auth/login',
    method: 'post',
    data: data,
    onSuccess: slice.actions.saveusers.type,
    onFail: slice.actions.saveusers.type
})
export const editMyProfile = (data) => apiCall({
    url: '/user',
    method: 'put',
    data,
    onSuccess: slice.actions.editForm.type,
    onFail: slice.actions.editForm.type
})

export const userInfo = (data) => apiCall({
    url: '/user/get-by-patron/' + data,
    method: 'get',
    data,
    onSuccess: slice.actions.getUserInfo.type,
    onFail: slice.actions.getUserInfo.type
})

export const {changeerror, savdooynasi, saveusers, rememberMe, logOutUser, changeUserBranch} = slice.actions
export default slice.reducer
