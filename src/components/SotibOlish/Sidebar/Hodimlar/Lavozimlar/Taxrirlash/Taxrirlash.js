import './taxrirlash.css'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import LavozimReducer, {
    saveLavozim,
    deleteLavozim,
    editLavozim,
    getLavozimById
} from '../../reducer/LavozimReducer'
import {useHistory} from 'react-router-dom'
import users from "../../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import ModalLoading from "../../../../../ModalLoading";

function Taxrirlash({
                        editLavozim,
                        saveLavozim,
                        getLavozimById,
                        users,
                        match,
                        LavozimReducer,
                    }) {

    const [input, setInput] = useState(
        {
            // xodimlar
            name: '',
            description: '',


            // USERS
            AllUserRoles: false,
            getUser: null,//1
            getUserChecked: false,
            getUserAdmin: null,//2
            getUserAdminChecked: false,
            addUser: null,//3
            addUserChecked: false,
            editUser: null,//4
            editUserChecked: false,
            deleteUser: null,//5
            deleteUserChecked: false,

            // Roles
            AllRoleRoles: false,
            getRole: null,//6
            getRoleChecked: false,
            addRole: null,//7
            addRoleChecked: false,
            editRole: null,//8
            editRoleChecked: false,
            deleteRole: null,//9
            deleteRoleChecked: false,

            // Purchase
            AllPurchaseRoles: false,
            getPurchase: null,//10
            getPurchaseChecked: false,
            getPurchaseAdmin: null,//11
            getPurchaseAdminChecked: false,
            addPurchase: null,//12
            addPurchaseChecked: false,
            editPurchase: null,//13
            editPurchaseChecked: false,
            deletePurchase: null,//14
            deletePurchaseChecked: false,

            // Branch
            AllBranchRoles: false,
            getBranch: null,//15
            getBranchChecked: false,
            addBranch: null,//16
            addBranchChecked: false,
            editBranch: null,//17
            editBranchChecked: false,
            deleteBranch: null,//18
            deleteBranchChecked: false,


            //Outlay
            AllOutlayRoles: false,
            getOutlay: null,//19
            getOutlayChecked: false,
            getOutlayAdmin: null,//20
            getOutlayAdminChecked: false,
            addOutlay: null,//21
            addOutlayChecked: false,
            editOutlay: null,//22
            editOutlayChecked: false,
            deleteOutlay: null,//23
            deleteOutlayChecked: false,

            //Trade
            AllTradeRoles: false,
            getTrade: null,//24
            getTradeChecked: false,
            getTradeAdmin: null,//25
            getTradeAdminChecked: false,
            addTrade: null,//26
            addTradeChecked: false,
            editTrade: null,//27
            editTradeChecked: false,
            deleteTrade: null,//28
            deleteTradeChecked: false,

            //Supplier
            AllSupplierRoles: false,
            addSupplier: null,//29
            addSupplierChecked: false,
            getSupplier: null,//30
            getSupplierChecked: false,
            editSupplier: null,//31
            editSupplierChecked: false,
            deleteSupplier: null,//32
            deleteSupplierChecked: false,

            //Customer
            AllCustomerRoles: false,
            getCustomer: null,//33
            getCustomerChecked: false,
            getCustomerAdmin: null,//34
            getCustomerAdminChecked: false,
            addCustomer: null,//35
            addCustomerChecked: false,
            editCustomer: null,//36
            editCustomerChecked: false,
            deleteCustomer: null,//37
            deleteCustomerChecked: false,

            //Product
            AllProductRoles: false,
            getProduct: null,//38
            getProductChecked: false,
            getProductAdmin: null,//39
            getProductAdminChecked: false,
            addProduct: null,//40
            addProductChecked: false,
            editProduct: null,//41
            editProductChecked: false,
            deleteProduct: null,//42
            deleteProductChecked: false,

            //ProductType
            productTypeRoles: null, //43
            productTypeRolesChecked: false,
            //Brand
            brandRoles: null,//44
            brandRolesChecked: false,

            //Category
            categoryRoles: null,//45
            categoryRolesChecked: false,
            //Measurement
            measurementRoles: null,//46
            measurementRolesChecked: false,


            //Invoice
            editInvoiceChecked: false,
            editInvoice: null,//47

            //Business
            editMyBusiness: null,//48
            editMyBusinessChecked: false,

            // LOSS
            AllLossRoles: false,
            getLoss: null,//57
            getLossChecked: false,
            getLossAdmin: null,//58
            getLossAdminChecked: false,
            addLoss: null,//59
            addLossChecked: false,


            // Balance
            AllBalanceRoles: false,
            getBalance: null,//60
            getBalanceChecked: false,
            getBalanceAdmin: null,//61
            getBalanceAdminChecked: false,
            editBalance: null,//62
            editBalanceChecked: false,

            // INFO
            AllInfoRoles: false,
            getInfo: null,//63
            getInfoChecked: false,
            getInfoAdmin: null,//64
            getInfoAdminChecked: false,
            deleteInfo: null,//65
            deleteInfoChecked: false,


        }
    )
    const [roles, setRoles] = useState({
            AllUserRoles: ['addUser', 'deleteUser', 'editUser', 'getUser', 'getUserAdmin'],
            AllUserRolesValue: ['ADD_USER', 'DELETE_USER', "EDIT_USER", "GET_USER", "GET_USER_ADMIN"],
            AllRoleRoles: ['addRole', 'deleteRole', 'editRole', 'getRole'],
            AllRoleRolesValue: ['ADD_ROLE', 'DELETE_ROLE', "EDIT_ROLE", "GET_ROLE"],
            AllPurchaseRoles: ['addPurchase', 'deletePurchase', 'editPurchase', 'getPurchase', 'getPurchaseAdmin'],
            AllPurchaseRolesValue: ['ADD_PURCHASE', 'DELETE_PURCHASE', "EDIT_PURCHASE", "GET_PURCHASE", "GET_PURCHASE_ADMIN"],
            AllBranchRoles: ['addBranch', 'deleteBranch', 'editBranch', 'getBranch'],
            AllBranchRolesValue: ['ADD_BRANCH', 'DELETE_BRANCH', "EDIT_BRANCH", "GET_BRANCH"],
            AllOutlayRoles: ['addOutlay', 'deleteOutlay', 'editOutlay', 'getOutlay', 'getOutlayAdmin'],
            AllOutlayRolesValue: ['ADD_OUTLAY', 'DELETE_OUTLAY', "EDIT_OUTLAY", "GET_OUTLAY", "GET_OUTLAY_ADMIN"],
            AllTradeRoles: ['addTrade', 'deleteTrade', 'editTrade', 'getTrade', 'getTradeAdmin'],
            AllTradeRolesValue: ['ADD_TRADE', 'DELETE_TRADE', "EDIT_TRADE", "GET_TRADE", 'GET_TRADE_ADMIN'],
            AllSupplierRoles: ['addSupplier', 'deleteSupplier', 'editSupplier', 'getSupplier'],
            AllSupplierRolesValue: ['ADD_SUPPLIER', 'DELETE_SUPPLIER', "EDIT_SUPPLIER", "GET_SUPPLIER"],
            AllCustomerRoles: ['addCustomer', 'deleteCustomer', 'editCustomer', 'getCustomer', 'getCustomerAdmin'],
            AllCustomerRolesValue: ['ADD_CUSTOMER', 'DELETE_CUSTOMER', "EDIT_CUSTOMER", "GET_CUSTOMER", 'GET_CUSTOMER_ADMIN'],
            AllProductRoles: ['addProduct', 'deleteProduct', 'editProduct', 'getProduct', 'getProductAdmin'],
            AllProductRolesValue: ['ADD_PRODUCT', 'DELETE_PRODUCT', "EDIT_PRODUCT", "GET_PRODUCT", 'GET_PRODUCT_ADMIN'],
            AllLossRoles: ['addLoss', 'getLoss', 'getLossAdmin',],
            AllLossRolesValue: ['ADD_LOSS', 'GET_LOSS', "GET_LOSS_ADMIN"],
            AllBalanceRoles: ['editBalance', 'getBalance', 'getBalanceAdmin',],
            AllBalanceRolesValue: ['EDIT_BALANCE', 'GET_BALANCE', "GET_BALANCE_ADMIN"],
            AllInfoRoles: ['getInfo', 'getInfoAdmin','deleteInfo'],
            AllInfoRolesValue: ['GET_INFO', "GET_INFO_ADMIN",'DELETE_INFO']

        }
    )
    const {t} = useTranslation()
    const [permission, setpermission] = useState([])
    const [saveModal, setSaveModal] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const history = useHistory();

    function changeName(e) {
        input.name = e.target.value
        let a = {...input}
        setInput(a)
        setIsCheck(false)
    }

    function changeDescription(e) {
        input.description = e.target.value
        let a = {...input}
        setInput(a)
    }

    function changeAllUserRoles(e) {
        if (e.target.checked) {
            input[e.target.name] = e.target.checked
            roles[e.target.name].map((item, index) => {
                roles[e.target.name + "Value"].map((value, label) => {
                    if (index === label) {
                        input[item] = value
                        input[item + "Checked"] = e.target.checked
                    }
                })
            })
        } else {
            input[e.target.name] = e.target.checked
            roles[e.target.name].map((item) => {
                input[item] = null
                input[item + "Checked"] = e.target.checked

            })
        }
        console.log(input)
        let a = {...input}
        setInput(a)
    }

    function changeRoles(e) {
        if (e.target.checked) {
            input[e.target.name] = e.target.value
            input[e.target.name + "Checked"] = e.target.checked
        } else {
            input[e.target.name] = null
            input[e.target.name + "Checked"] = e.target.checked
        }
        checkPermission()
    }

    function checkPermission() {
        input.AllUserRoles = input.addUserChecked && input.editUserChecked && input.deleteUserChecked && input.getUserChecked && input.getUserAdminChecked;
        input.AllRoleRoles = input.addRoleChecked && input.editRoleChecked && input.deleteRoleChecked && input.getRoleChecked;
        input.AllPurchaseRoles = input.addPurchaseChecked && input.editPurchaseChecked && input.deletePurchaseChecked && input.getPurchaseChecked && input.getPurchaseAdminChecked;
        input.AllBranchRoles = input.addBranchChecked && input.editBranchChecked && input.deleteBranchChecked && input.getBranchChecked;
        input.AllOutlayRoles = input.addOutlayChecked && input.editOutlayChecked && input.deleteOutlayChecked && input.getOutlayChecked && input.getOutlayAdminChecked;
        input.AllTradeRoles = input.addTradeChecked && input.editTradeChecked && input.deleteTradeChecked && input.getTradeChecked && input.getTradeAdminChecked;
        input.AllSupplierRoles = input.addSupplierChecked && input.editSupplierChecked && input.deleteSupplierChecked && input.getSupplierChecked;
        input.AllCustomerRoles = input.addCustomerChecked && input.editCustomerChecked && input.deleteCustomerChecked && input.getCustomerChecked && input.getCustomerAdminChecked;
        input.AllProductRoles = input.addProductChecked && input.editProductChecked && input.deleteProductChecked && input.getProductChecked && input.getProductAdminChecked;
        input.AllBalanceRoles = input.getBalanceChecked && input.editBalanceChecked && input.getBalanceAdminChecked;
        input.AllInfoRoles = input.getInfoChecked && input.getInfoAdminChecked && input.deleteInfoChecked;
        input.AllLossRoles  = input.getLossChecked && input.getLossAdminChecked && input.addLossChecked;
        let a = {...input}
        setInput(a)
    }

    function editl2() {
        let a = LavozimReducer.oneRole
        input.name = a?.roleGetDto?.name
        input.description = a?.roleGetDto?.description
        a?.permissions?.map(item => {
            switch (item) {
                case "ADD_USER":
                    input.addUserChecked = true
                    input.addUser = "ADD_USER"
                    break;
                case 'GET_USER':
                    input.getUserChecked = true
                    input.getUser = "GET_USER"
                    break;
                case 'GET_USER_ADMIN':
                    input.getUserAdminChecked = true
                    input.getUserAdmin = "GET_USER_ADMIN"
                    break;
                case 'EDIT_USER':
                    input.editUserChecked = true
                    input.editUser = "EDIT_USER"
                    break;
                case 'DELETE_USER':
                    input.deleteUserChecked = true
                    input.deleteUser = "DELETE_USER"
                    break;
                case 'ADD_ROLE':
                    input.addRoleChecked = true
                    input.addRole = "ADD_ROLE"
                    break;
                case 'EDIT_ROLE':
                    input.editRoleChecked = true
                    input.editRole = "EDIT_ROLE"
                    break;
                case 'GET_ROLE':
                    input.getRoleChecked = true
                    input.getRole = "GET_ROLE"
                    break;
                case 'DELETE_ROLE':
                    input.deleteRoleChecked = true
                    input.deleteRole = "DELETE_ROLE"
                    break;
                case 'ADD_SUPPLIER':
                    input.addSupplierChecked = true
                    input.addSupplier = "ADD_SUPPLIER"
                    break;
                case 'EDIT_SUPPLIER':
                    input.editSupplierChecked = true
                    input.editSupplier = "EDIT_SUPPLIER"
                    break;
                case 'DELETE_SUPPLIER':
                    input.deleteSupplierChecked = true
                    input.deleteSupplier = "DELETE_SUPPLIER"
                    break;
                case 'GET_SUPPLIER':
                    input.getSupplierChecked = true
                    input.getSupplier = "GET_SUPPLIER"
                    break;
                case 'ADD_CUSTOMER':
                    input.addCustomerChecked = true
                    input.addCustomer = "ADD_CUSTOMER"
                    break;
                case 'GET_CUSTOMER':
                    input.getCustomerChecked = true
                    input.getCustomer = "GET_CUSTOMER"
                    break;
                case 'GET_CUSTOMER_ADMIN':
                    input.getCustomerAdminChecked = true
                    input.getCustomerAdmin = "GET_CUSTOMER_ADMIN"
                    break;
                case 'EDIT_CUSTOMER':
                    input.editCustomerChecked = true
                    input.editCustomer = "EDIT_CUSTOMER"
                    break;
                case 'DELETE_CUSTOMER':
                    input.deleteCustomerChecked = true
                    input.deleteCustomer = "DELETE_CUSTOMER"
                    break;
                case 'GET_PURCHASE':
                    input.getPurchaseChecked = true
                    input.getPurchase = "GET_PURCHASE"
                    break;
                case 'GET_PURCHASE_ADMIN':
                    input.getPurchaseAdminChecked = true
                    input.getPurchaseAdmin = "GET_PURCHASE_ADMIN"
                    break;
                case 'ADD_PURCHASE':
                    input.addPurchaseChecked = true
                    input.addPurchase = "ADD_PURCHASE"
                    break;
                case 'EDIT_PURCHASE':
                    input.editPurchaseChecked = true
                    input.editPurchase = "EDIT_PURCHASE"
                    break;
                case 'DELETE_PURCHASE':
                    input.deletePurchaseChecked = true
                    input.deletePurchase = "DELETE_PURCHASE"
                    break;
                case 'GET_BRANCH':
                    input.getBranchChecked = true
                    input.getBranch = "GET_BRANCH"
                    break;
                case 'ADD_BRANCH':
                    input.addBranchChecked = true
                    input.addBranch = "ADD_BRANCH"
                    break;
                case 'EDIT_BRANCH':
                    input.editBranchChecked = true
                    input.editBranch = "EDIT_BRANCH"
                    break;
                case 'DELETE_BRANCH':
                    input.deleteBranchChecked = true
                    input.deleteBranch = "DELETE_BRANCH"
                    break;
                case 'GET_OUTLAY':
                    input.getOutlayChecked = true
                    input.getOutlay = "GET_OUTLAY"
                    break;
                case 'GET_OUTLAY_ADMIN':
                    input.getOutlayAdminChecked = true
                    input.getOutlayAdmin = "GET_OUTLAY_ADMIN"
                    break;
                case 'ADD_OUTLAY':
                    input.addOutlayChecked = true
                    input.addOutlay = "ADD_OUTLAY"
                    break;
                case 'EDIT_OUTLAY':
                    input.editOutlayChecked = true
                    input.editOutlay = "EDIT_OUTLAY"
                    break;
                case 'DELETE_OUTLAY':
                    input.deleteOutlayChecked = true
                    input.deleteOutlay = "DELETE_OUTLAY"
                    break;
                case 'GET_TRADE':
                    input.getTradeChecked = true
                    input.getTrade = "GET_TRADE"
                    break;
                case 'GET_TRADE_ADMIN':
                    input.getTradeAdminChecked = true
                    input.getTradeAdmin = "GET_TRADE_ADMIN"
                    break;
                case 'ADD_TRADE':
                    input.addTradeChecked = true
                    input.addTrade = "ADD_TRADE"
                    break;
                case 'EDIT_TRADE':
                    input.editTradeChecked = true
                    input.editTrade = "EDIT_TRADE"
                    break;
                case 'DELETE_TRADE':
                    input.deleteTradeChecked = true
                    input.deleteTrade = "DELETE_TRADE"
                    break;
                case 'ADD_PRODUCT':
                    input.addProductChecked = true
                    input.addProduct = "ADD_PRODUCT"
                    break;
                case 'GET_PRODUCT_ADMIN':
                    input.getProductAdminChecked = true
                    input.getProductAdmin = "GET_PRODUCT_ADMIN"
                    break;
                case 'GET_PRODUCT':
                    input.getProductChecked = true
                    input.getProduct = "GET_PRODUCT"
                    break;
                case 'EDIT_PRODUCT':
                    input.editProductChecked = true
                    input.editProduct = "EDIT_PRODUCT"
                    break;
                case 'DELETE_PRODUCT':
                    input.deleteProductChecked = true
                    input.deleteProduct = "DELETE_PRODUCT"
                    break;
                case 'ALL_TYPE':
                    input.productTypeRolesChecked = true
                    input.productTypeRoles = "ALL_TYPE"
                    break;
                case 'ALL_CATEGORY':
                    input.categoryRolesChecked = true
                    input.categoryRoles = "ALL_CATEGORY"
                    break;
                case 'ALL_BRAND':
                    input.brandRolesChecked = true
                    input.brandRoles = "ALL_BRAND"
                    break;
                case 'ALL_MEASUREMENT':
                    input.measurementRolesChecked = true
                    input.measurementRoles = "ALL_MEASUREMENT"
                    break;
                case 'EDIT_INVOICE':
                    input.editInvoiceChecked = true
                    input.editInvoice = "EDIT_INVOICE"
                    break;
                case 'EDIT_MY_BUSINESS':
                    input.editMyBusinessChecked = true
                    input.editMyBusiness = 'EDIT_MY_BUSINESS'
                    break;
                case 'ADD_LOSS':
                    input.addLossChecked = true
                    input.addLoss = 'ADD_LOSS'
                    break;
                case 'GET_LOSS':
                    input.getLossChecked = true
                    input.getLoss = 'GET_LOSS'
                    break;
                case 'GET_LOSS_ADMIN':
                    input.getLossAdminChecked = true
                    input.getLossAdmin = 'GET_LOSS_ADMIN'
                    break;
                case 'EDIT_BALANCE':
                    input.editBalanceChecked = true
                    input.editBalance = 'EDIT_BALANCE'
                    break;
                case 'GET_BALANCE':
                    input.getBalanceChecked = true
                    input.getBalance = 'GET_BALANCE'
                    break;
                case 'GET_BALANCE_ADMIN':
                    input.getBalanceAdminChecked = true
                    input.getBalanceAdmin = 'GET_BALANCE_ADMIN'
                    break;
                case 'GET_INFO':
                    input.getInfoChecked = true
                    input.getInfo = 'GET_INFO'
                    break;
                case 'GET_INFO_ADMIN':
                    input.getInfoAdminChecked = true
                    input.getInfoAdmin = 'GET_INFO_ADMIN'
                    break;
                case 'DELETE_INFO':
                    input.deleteInfoChecked = true
                    input.deleteInfo = 'DELETE_INFO'
                    break;
            }

        })
        checkPermission()
    }

    function saqla() {
        if (input.name === "") {
            setIsCheck(true)
        } else {
            permission.push(
                input.getUser, input.getUserAdmin, input.addUser, input.editUser, input.deleteUser,
                input.getRole, input.addRole, input.editRole, input.deleteRole,
                input.editSupplier, input.deleteSupplier, input.getSupplier, input.addSupplier,
                input.editCustomer, input.addCustomer, input.deleteCustomer, input.getCustomer, input.getCustomerAdmin,
                input.getPurchase, input.getPurchaseAdmin, input.addPurchase, input.editPurchase, input.deletePurchase,
                input.getBranch, input.addBranch, input.editBranch, input.deleteBranch,
                input.getOutlay, input.addOutlay, input.editOutlay, input.deleteOutlay, input.getOutlayAdmin,
                input.getTrade, input.addTrade, input.editTrade, input.deleteTrade, input.getTradeAdmin,
                input.getProduct, input.addProduct, input.deleteProduct, input.editProduct, input.getProductAdmin,
                input.productTypeRoles,input.categoryRoles,input.measurementRoles,input.brandRoles,
                input.editMyBusiness, input.editInvoice,
                input.addLoss, input.getLoss,input.getLossAdmin,
                input.editBalance, input.getBalance,input.getBalanceAdmin,
                input.getInfo,input.getInfoAdmin,input.deleteInfo
            )
            let a = [...permission]
            setpermission(a)
            if (match.params.id === undefined) {
                saveLavozim(
                    {
                        name: input.name,
                        permissions: permission,
                        description: input.description,
                        businessId: users.businessId
                    }
                )
            } else {
                editLavozim(
                    {
                        name: input.name,
                        description: input.description,
                        permissions: permission,
                        id: match.params.id,
                        businessId: users.businessId
                    }
                )
            }
            setSaveModal(true)
        }
    }

    useEffect(() => {
        if (match.params.id) {
            editl2()
        }
    }, [LavozimReducer.getBoolean])
    useEffect(() => {
        if (match.params.id) {
            getLavozimById(match.params.id)
        }
    }, [])
    useEffect(() => {
        if (LavozimReducer.saveRoleBool) {
            history.push('/main/role')
        }
        setSaveModal(false)
    }, [LavozimReducer.current])
    return (
        <div className={'row mt-5'}>
            <h4 className={'text-center'}>{t('Roles.4')}</h4>
            <div className="col-md-12">
                <div className="row justify-content-center ">
                    <div className="l1 p-4 mt-5 col-sm-10 col-md-10 d-flex col-10 border">
                        <div className="col-md-6"><label htmlFor={'name'}>{t('Roles.5')}</label>
                            <input type="text" className={'form-control mt-2'} id={'name'} value={input.name}
                                   onChange={changeName}
                                   placeholder={"Lavozim nomi"}/>
                            {
                                isCheck && input.name === "" &&
                                <div>
                                    <p className={'text-danger text-center m-0 p-0'}>Lavozim nomi kiriting</p>
                                </div>
                            }
                        </div>
                        <div className="col-md-6">
                            <label htmlFor={'description'}>Tasnifi</label>
                            <input type="text" className={'form-control mt-2'} id={'description'}
                                   value={input.description}
                                   onChange={changeDescription}
                                   placeholder={'Lavozim tasnifi'}/>
                        </div>

                    </div>
                    <div className="l1 p-4 mt-5 col-sm-10 col-md-4 col-5 border">
                        <label htmlFor={'l'}>Xodimlar</label>
                        <div className="ruxsat mt-4">
                            <label htmlFor={'ch'}>{t('Roles.7')}</label>
                            <input type="checkbox" checked={input.AllUserRoles}
                                   name={'AllUserRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'ch'}/>
                            <div className={'mt-4'}>
                                <input type="checkbox" name={'getUserAdmin'} checked={input.getUserAdminChecked}
                                       value={'GET_USER_ADMIN'} onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'getUserAdmin'}/>
                                <label htmlFor={'getUserAdmin'}>Hammasini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" name={'getUser'} checked={input.getUserChecked}
                                       value={'GET_USER'} onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'getUser'}/>
                                <label htmlFor={'getUser'}>O'zini filialidagini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'addUser'} checked={input.addUserChecked}
                                       name={'addUser'}
                                       value={'ADD_USER'}
                                       onChange={changeRoles}
                                       style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'addUser'}>{t('Roles.9')}</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.editUserChecked}
                                       name={'editUser'} value={'EDIT_USER'} id={'editUser'} onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'editUser'}>Xodimlarni taxrirlash</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.deleteUserChecked} onChange={changeRoles}
                                       name={'deleteUser'} value={'DELETE_USER'}
                                       id={'deleteUser'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'deleteUser'}>{t('Roles.10')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 col-sm-10 col-5 col-md-4 p-4 border">
                        <label htmlFor={'l'}>{t('Roles.1')}</label>
                        <div className="ruxsat mt-4">
                            <label htmlFor={'chch'}>{t('Roles.7')}</label>
                            <input type="checkbox"
                                   checked={input.AllRoleRoles}
                                   name={'AllRoleRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'chch'}/>

                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.getRole} onChange={changeRoles} name={'getRole'}
                                       value={'GET_ROLE'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'korr'}/>
                                <label htmlFor={'korr'}>{t('Roles.11')}</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.addRole} onChange={changeRoles} name={'addRole'}
                                       value={'ADD_ROLE'}
                                       id={'qoshLavozim'} style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'qoshLavozim'}>{t('Roles.12')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'taxLavozim'} checked={input.editRole}
                                       onChange={changeRoles} name={'editRole'} value={'EDIT_ROLE'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'taxLavozim'}>{t('Roles.13')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'ochLavozim'} checked={input.deleteRole}
                                       onChange={changeRoles} name={'deleteRole'} value={'DELETE_ROLE'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'ochLavozim'}>{t('Roles.14')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 col-sm-10 col-5 col-md-4 p-4 border">
                        <label htmlFor={'l'}>{t('Roles.15')}</label>
                        <div className="ruxsat mt-4">
                            <label htmlFor={'xabb'}>{t('Roles.7')}</label>
                            <input type="checkbox" checked={input.AllPurchaseRoles}
                                   name={'AllPurchaseRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'xabb'}/>
                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.getPurchaseAdminChecked} name={'getPurchaseAdmin'}
                                       value={'GET_PURCHASE_ADMIN'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}}
                                       id={'xaridkorIdAdmin'}/>
                                <label htmlFor={'xaridkorIdAdmin'}>Hamma Xaridlarni ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.getPurchaseChecked} name={'getPurchase'}
                                       value={'GET_PURCHASE'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'xaridkorId'}/>
                                <label htmlFor={'xaridkorId'}>O'zini filialidagini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.addPurchaseChecked} onChange={changeRoles}
                                       name={'addPurchase'} value={'ADD_PURCHASE'}
                                       id={'xaridQoshishL'} style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'xaridQoshishL'}>{t('Roles.17')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'xaridTaxrirI'} checked={input.editPurchaseChecked}
                                       onChange={changeRoles} name={'editPurchase'} value={'EDIT_PURCHASE'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'xaridTaxrirI'}>{t('Roles.18')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'xaridOchirishId'} checked={input.deletePurchaseChecked}
                                       onChange={changeRoles} name={'deletePurchase'} value={'DELETE_PURCHASE'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'xaridOchirishId'}>{t('Roles.19')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 col-sm-10 col-5 col-md-4 p-4 border">
                        <label htmlFor={'l'}>{t('Roles.20')}</label>
                        <div className="ruxsat mt-4">
                            <label htmlFor={'barchasiBazaId'}>{t('Roles.7')}</label>
                            <input type="checkbox" checked={input.AllBranchRoles}
                                   name={'AllBranchRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'barchasiBazaId'}/>

                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.getBranchChecked} name={'getBranch'}
                                       value={'GET_BRANCH'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'bazakorId'}/>
                                <label htmlFor={'bazakorId'}>{t('Roles.21')}</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.addBranchChecked} name={'addBranch'}
                                       value={'ADD_BRANCH'}
                                       onChange={changeRoles}
                                       id={'bazaQoshishId'} style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'bazaQoshishId'}>{t('Roles.22')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'bazaTaxId'} checked={input.editBranchChecked}
                                       name={'editBranch'} value={'EDIT_BRANCH'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'bazaTaxId'}>{t('Roles.23')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'bazaOchirId'} checked={input.deleteBranchChecked}
                                       name={'deleteBranch'} value={'DELETE_BRANCH'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'bazaOchirId'}>{t('Roles.24')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 col-sm-10 col-5 col-md-4 p-4 border">
                        <label htmlFor={'l'}>{t('Roles.25')}</label>
                        <div className="ruxsat mt-4">
                            <label htmlFor={'xarjatBarchId'}>{t('Roles.7')}</label>
                            <input type="checkbox" checked={input.AllOutlayRoles}
                                   name={'AllOutlayRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'xarjatBarchId'}/>

                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.getOutlayAdminChecked} onChange={changeRoles}
                                       name={'getOutlayAdmin'} value={'GET_OUTLAY_ADMIN'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}}
                                       id={'xarajatKorishId'}/>
                                <label htmlFor={'xarajatKorishId'}>Hammasini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.getOutlayChecked} onChange={changeRoles}
                                       name={'getOutlay'} value={'GET_OUTLAY'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}}
                                       id={'xarajatKorishId'}/>
                                <label htmlFor={'xarajatKorishId'}>O'zini filialidagini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.addOutlayChecked} onChange={changeRoles}
                                       name={'addOutlay'} value={'ADD_OUTLAY'}
                                       id={'xarajatQoshId'} style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'xarajatQoshId'}>{t('Roles.27')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'xarajatTaxId'} checked={input.editOutlayChecked}
                                       onChange={changeRoles} name={'editOutlay'} value={'EDIT_OUTLAY'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'xarajatTaxId'}>{t('Roles.28')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'xarajatOcirId'} checked={input.deleteOutlayChecked}
                                       onChange={changeRoles} name={'deleteOutlay'} value={'DELETE_OUTLAY'}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'xarajatOcirId'}>{t('Roles.29')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 col-sm-10 col-5 col-md-4 p-4 border">
                        <label htmlFor={'l'}>{t('Roles.30')}</label>
                        <div className="ruxsat mt-4">
                            <label htmlFor={'savdoBarId'}>{t('Roles.7')}</label>
                            <input type="checkbox" checked={input.AllTradeRoles}
                                   name={'AllTradeRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'savdoBarId'}/>
                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.getTradeAdminChecked} onChange={changeRoles}
                                       name={'getTradeAdmin'} value={'GET_TRADE_ADMIN'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'savdoKorId'}/>
                                <label htmlFor={'savdoKorId'}>Hammasini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.getTradeChecked} onChange={changeRoles}
                                       name={'getTrade'} value={'GET_TRADE'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'savdoKorId'}/>
                                <label htmlFor={'savdoKorId'}>O'zini filialidagini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.addTradeChecked} onChange={changeRoles}
                                       name={'addTrade'} value={'ADD_TRADE'}
                                       id={'savdoQoshId'} style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'savdoQoshId'}>{t('Roles.32')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'savdoTaxId'} checked={input.editTradeChecked}
                                       name={'editTrade'} value={'EDIT_TRADE'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'savdoTaxId'}>{t('Roles.33')}</label>
                            </div>
                            <div>
                                <input type="checkbox" id={'savdoOchirId'} checked={input.deleteTradeChecked}
                                       name={'deleteTrade'} value={'DELETE_TRADE'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label htmlFor={'savdoOchirId'}>{t('Roles.34')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <div>
                            <label htmlFor={'l'}>{t('Roles.35')}</label>

                            <div className="ruxsat mt-4">

                                <label htmlFor={'chDiller'}>{t('Roles.7')}</label>
                                <input type="checkbox" checked={input.AllSupplierRoles}
                                       name={'AllSupplierRoles'}
                                       onChange={changeAllUserRoles}
                                       style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'chDiller'}/>

                                <div className={'mt-4'}>
                                    <input type="checkbox" checked={input.getSupplierChecked}
                                           name={'getSupplier'} value={'GET_SUPPLIER'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '4px'}} id={'korDiller'}/>
                                    <label htmlFor={'korDiller'}>{t('Roles.36')}</label>
                                </div>

                                <div>
                                    <input type="checkbox" checked={input.addSupplierChecked} onChange={changeRoles}
                                           name={'addSupplier'} value={'ADD_SUPPLIER'}
                                           id={'taxDiller'} style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label htmlFor={'taxDiller'}>{t('Roles.37')}</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.editSupplierChecked}
                                           name={'editSupplier'} value={'EDIT_SUPPLIER'}
                                           onChange={changeRoles} id={'ochDiller'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label htmlFor={'ochDiller'}>{t('Roles.38')}</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.deleteSupplierChecked}
                                           name={'deleteSupplier'} value={'DELETE_SUPPLIER'}
                                           onChange={changeRoles} id={'och3'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label htmlFor={'och3'}>{t('Roles.39')}</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <label htmlFor={'l'}>{t('Roles.40')}</label>

                        <div className="ruxsat mt-4">
                            <label htmlFor={'ch1'}>{t('Roles.7')}</label>
                            <input type="checkbox" checked={input.AllCustomerRoles}
                                   name={'AllCustomerRoles'}
                                   onChange={changeAllUserRoles}
                                   style={{marginLeft: '10px', width: '15px', height: '15px'}} id={'ch1'}/>
                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.getCustomerAdminChecked} onChange={changeRoles}
                                       name={'getCustomerAdmin'} value={'GET_CUSTOMER_ADMIN'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'kor2'}/>
                                <label htmlFor={'kor2'}>Hammasini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.getCustomerChecked} onChange={changeRoles}
                                       name={'getCustomer'} value={'get_CUSTOMER'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'kor2'}/>
                                <label htmlFor={'kor2'}>O'zini filialidagini ko'rish</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.addCustomerChecked} onChange={changeRoles}
                                       name={'addCustomer'} value={'ADD_CUSTOMER'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}} id={'kor1'}/>
                                <label htmlFor={'kor1'}> {t('Roles.41')}</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.editCustomerChecked} onChange={changeRoles}
                                       name={'editCustomer'} value={'EDIT_CUSTOMER'}
                                       id={'qosh3'} style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'qosh3'}>{t('Roles.42')}</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.deleteCustomerChecked}
                                       name={'deleteCustomer'} value={'DELETE_CUSTOMER'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label>{t('Roles.43')}</label>
                            </div>
                        </div>

                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <div>
                            <label htmlFor={'l'}>Mahsulotlar</label>

                            <div className="ruxsat mt-4">

                                <label>{t('Roles.7')}</label>
                                <input type="checkbox" checked={input.AllProductRoles}
                                       name={'AllProductRoles'}
                                       onChange={changeAllUserRoles}
                                       style={{marginLeft: '10px', width: '15px', height: '15px'}}/>
                                <div className={'mt-4'}>
                                    <input type="checkbox" checked={input.getProductAdminChecked}
                                           name={'getProductAdmin'} value={'GET_PRODUCT_ADMIN'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '4px'}}/>
                                    <label>Hammasini korish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.getProductChecked}
                                           name={'getProduct'} value={'GET_PRODUCT'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '4px'}}/>
                                    <label>O'zini filialidagini korish</label>
                                </div>

                                <div>
                                    <input type="checkbox" checked={input.addProductChecked} onChange={changeRoles}
                                           name={'addProduct'} value={'ADD_PRODUCT'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Mahsulot qo'shish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.editProductChecked}
                                           name={'editProduct'} value={'EDIT_PRODUCT'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Mahsulotni taxrirlash</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.deleteProductChecked}
                                           name={'deleteProduct'} value={'DELETE_PRODUCT'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Mahsulotni o'chirish</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">

                        <div className="ruxsat mt-4">
                            <div className={'mt-4'}>
                                <input type="checkbox" checked={input.measurementRolesChecked} onChange={changeRoles}
                                       name={'measurementRoles'} value={'ALL_MEASUREMENT'}
                                       style={{width: '15px', height: '15px', marginTop: '4px'}}/>
                                <label htmlFor={'kor1'}>O'lchov birligi</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.brandRolesChecked} onChange={changeRoles}
                                       name={'brandRoles'} value={'ALL_BRAND'}
                                       style={{width: '15px', marginTop: '10px', height: '15px'}}/>
                                <label htmlFor={'qosh3'}>Firmalar</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.categoryRolesChecked}
                                       name={'categoryRoles'} value={'ALL_CATEGORY'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label>Bo'limlar</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={input.productTypeRolesChecked}
                                       name={'productTypeRoles'} value={'ALL_TYPE'}
                                       onChange={changeRoles}
                                       style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                <label>Mahsulot turi</label>
                            </div>
                        </div>

                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <div>
                            <label htmlFor={'l'}>Yo'qotilgan maxsulot </label>

                            <div className="ruxsat mt-4">
                                <label>{t('Roles.7')}</label>
                                <input type="checkbox" checked={input.AllLossRoles}
                                       name={'AllLossRoles'}
                                       onChange={changeAllUserRoles}
                                       style={{marginLeft: '10px', width: '15px', height: '15px'}}/>
                                <div className={'mt-4'}>
                                    <input type="checkbox" checked={input.addLossChecked} onChange={changeRoles}
                                           name={'addLoss'} value={'ADD_LOSS'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Qo'shish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.getLossAdmin}
                                           name={'getLossAdmin'} value={'GET_LOSS_ADMIN'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Hammasini ko'rish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.getLoss}
                                           name={'getLoss'} value={'GET_LOSS'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>O'zini filialidagini ko'rish</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <div>
                            <label htmlFor={'l'}>Balance </label>

                            <div className="ruxsat mt-4">
                                <label>{t('Roles.7')}</label>
                                <input type="checkbox" checked={input.AllBalanceRoles}
                                       name={'AllBalanceRoles'}
                                       onChange={changeAllUserRoles}
                                       style={{marginLeft: '10px', width: '15px', height: '15px'}}/>
                                <div className={'mt-4'}>
                                    <input type="checkbox" checked={input.editBalanceChecked} onChange={changeRoles}
                                           name={'editBalance'} value={'EDIT_BALANCE'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Taxrirlash</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.getBalanceAdmin}
                                           name={'getBalanceAdmin'} value={'GET_BALANCE_ADMIN'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Hammasini ko'rish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.getBalance}
                                           name={'getBalance'} value={'GET_BALANCE'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>O'zini filialidagini ko'rish</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <div>
                            <label htmlFor={'l'}>Ma'lumotlarni ko'rish </label>

                            <div className="ruxsat mt-4">
                                <label>{t('Roles.7')}</label>
                                <input type="checkbox" checked={input.AllInfoRoles}
                                       name={'AllInfoRoles'}
                                       onChange={changeAllUserRoles}
                                       style={{marginLeft: '10px', width: '15px', height: '15px'}}/>
                                <div>
                                    <input type="checkbox" checked={input.getInfoAdmin}
                                           name={'getInfoAdmin'} value={'GET_INFO_ADMIN'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Hammasini ko'rish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.getInfo}
                                           name={'getInfo'} value={'GET_INFO'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>O'zini filialidagini ko'rish</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={input.deleteInfo}
                                           name={'deleteInfo'} value={'DELETE_INFO'}
                                           onChange={changeRoles}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Xisobotlarni o'chirish(Xodimlar,Mahsulotlar,Balance)</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="l1 mt-5 p-4 col-sm-10 col-md-4 col-5 border">
                        <div>
                            <div className="ruxsat mt-4">
                                <div>
                                    <input type="checkbox" checked={input.editInvoiceChecked} onChange={changeRoles}
                                           name={'editInvoice'} value={'EDIT_INVOICE'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>Chekni taxrirlash</label>
                                </div>
                            </div>
                            <div className="ruxsat mt-4">
                                <div>
                                    <input type="checkbox" checked={input.editMyBusinessChecked} onChange={changeRoles}
                                           name={'editMyBusiness'} value={'EDIT_MY_BUSINESS'}
                                           style={{width: '15px', height: '15px', marginTop: '10px'}}/>
                                    <label>O'zini biznesini taxrirlash</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    input.name === "" ?
                        <div style={{padding: '5px'}}>
                            <button style={{width: '91%', marginLeft: '5%',}}
                                    className={'btn btn-primary form-control mt-4 ml-4'} onClick={saqla}>Saqlash
                            </button>

                        </div>
                        :
                        <button className={'btn btn-primary mt-4 ml-4'} style={{width: '91%', marginLeft: '5%',}}
                                onClick={saqla}>{t('Buttons.6')}</button>
                }
            </div>
            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default connect((LavozimReducer, users), {
    saveLavozim,
    editLavozim,
    deleteLavozim,
    getLavozimById
})(Taxrirlash)
