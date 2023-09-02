import React, {lazy, useState} from 'react';
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import './headerthird.css'
import RecentActivity from "./header/ViewProfile/RecentActivity";
import Third from "./ThirdPage/Third";
import Header from "./header/MainHeader";
import HodimlarRoyhati from "./Sidebar/Hodimlar/hodimlarRoyxati/HodimlarRoyhati";
import Lavozimlar from "./Sidebar/Hodimlar/Lavozimlar/Lavozimlar";
import Taxrirlash from "./Sidebar/Hodimlar/hodimlarRoyxati/Taxrirlash/Taxrirlash";
import Taminotchilar from "./Sidebar/Hamkorlar/taminotchilar/Taminotchilar";
import Customers from "./Sidebar/Hamkorlar/Customers/Customers";
import MahsulotImport from "./Sidebar/Maxsulotlar/MahsulotlarImporti/MahsulotImport";
import MaxsulotlarRoyxati from "./Sidebar/Maxsulotlar/MahsulotlarRuyxati/MaxsulotlarRoyxati";
import MahsulotTurlari from "./Sidebar/Maxsulotlar/MahsulotTurlari/MahsulotTurlari";
import Bolimlar from "./Sidebar/Maxsulotlar/bolimlar/Bolimlar";
import Firmalar from "./Sidebar/Maxsulotlar/firmalar/Firmalar";
import Xarid from "./Sidebar/Haridlar/Xarid qilish/Xarid";
import HaridlarRoyxati from "./Sidebar/Haridlar/haridlarRoyxati/HaridlarRoyxati";
import BarchaSavdolar from "./Sidebar/Savdo/BarcaSavdolar/BarchaSavdolar";
import SavdoQoshish from "./Sidebar/Savdo/AddLossProducts/addLossProducts";
import XarajatlarRoyxati from "./Sidebar/Xarajatlar/xarajatlarRoyxati/XarajatlarRoyxati";
import XarajatQoshish from "./Sidebar/Xarajatlar/Qoshish/XarajatQoshish";
import XarajatTurlari from "./Sidebar/Xarajatlar/xarajatTurlari/XarajatTurlari";
import XaridlarXisoboti from "./Sidebar/Xisobotlar/XaridlarXisoboti/XaridlarXisoboti";
import MijozlarXisoboti from "./Sidebar/Xisobotlar/MijozlarXisoboti/MijozlarXisoboti";
import MaxsulotXisoboti from "./Sidebar/Xisobotlar/MaxsulotlarXisoboti/MaxsulotXisoboti";
import SavdodaTulov from "./Sidebar/Xisobotlar/SavdodaQilinganTulov/SavdodaTulov";
import QoldiqlarXisoboti from "./Sidebar/Xisobotlar/qoldiqlarXisoboti/QoldiqlarXisoboti";
import Dukon from "./Sidebar/Settings/DukonSozlamalari/Dukon";
import Bazalar from "./Sidebar/Settings/bazalar/Bazalar";
import Profil from "./header/Profil";
import SuperAdmin from "./Sidebar/SUPERADMIN/SuperAdmin";
import MaxsulotMiqdoriQoldigi from "./Sidebar/Xisobotlar/MahsulotMiqdoriQoldigi/MaxsulotMiqdoriQoldigi";
import LossProducts from "./Sidebar/Savdo/Yoqotilgan Mahsulotlar/LossProducts";
import Measurement from "./Sidebar/Maxsulotlar/Measurements/Measurement";
import BalanceTableAt from "./Sidebar/Balance/BalanceTableAt/BalanceTableAt";
import BalanceHistory from "./Sidebar/Balance/BalanceHistory/BalanceHistory";
import SupplierReport from "./Sidebar/Xisobotlar/SupplierReport/SupplierReport";
import users from "../../reducer/users";
import ProtectedRoute from "./ThirdPage/ProtectedRoute";
import Error409 from "../../dashboard/jsx/pages/Error409";

const Taxrirlash2 = lazy(() => import('./Sidebar/Hodimlar/Lavozimlar/Taxrirlash/Taxrirlash'))

const Taxrirlash3 = lazy(() => import('./Sidebar/Maxsulotlar/MahsulotlarRuyxati/Taxrirlash/Taxrirlash'))
const Sidebar = lazy(() => import("./Sidebar/Sidebar"))

const ShtrixCode = lazy(() => import("./Sidebar/Maxsulotlar/ShtrixCode/ShrtixCode"))
const XodimlarNazorati = lazy(() => import("./Sidebar/Xisobotlar/XodimlarNazorati/XodimlarNazorati"))

export const routes = [
    {path: "superadmin",component:SuperAdmin,permissions:['SUPER_ADMIN']},
    {path: "addUser/:id?",component:Taxrirlash,permissions:['ADD_USER','GET_USER','GET_USER_ADMIN']},
    {path: "addUser",component:Taxrirlash,permissions:['ADD_USER']},
    {path: "user",component:HodimlarRoyhati,permissions:['ADD_USER','GET_USER','GET_USER_ADMIN']},
    {path: "addRole/:id?",component:Taxrirlash2,permissions:['ADD_ROLE','GET_ROLE']},
    {path: "addRole",component:Taxrirlash2,permissions:['ADD_ROLE']},
    {path: "role",component:Lavozimlar,permissions:['ADD_ROLE','GET_ROLE']},
    {path: "balanceTable",component:BalanceTableAt,permissions:['EDIT_BALANCE', 'GET_BALANCE','GET_BALANCE_ADMIN',]},
    {path: "balanceHistory",component:BalanceHistory,permissions:['GET_BALANCE','GET_BALANCE_ADMIN',]},
    {path: "supplier",component:Taminotchilar,permissions:['ADD_SUPPLIER','GET_SUPPLIER']},
    {path: "customer",component:Customers,permissions:['ADD_CUSTOMER','GET_CUSTOMER','GET_CUSTOMER_ADMIN']},
    {path: "addProduct/:id",component:Taxrirlash3,permissions:['ADD_PRODUCT','GET_PRODUCT','GET_PRODUCT_ADMIN']},
    {path: "addProduct",component:Taxrirlash3,permissions:['ADD_PRODUCT']},
    {path: "importProduct",component:MahsulotImport,permissions:['ADD_PRODUCT']},
    {path: "productList",component:MaxsulotlarRoyxati,permissions:['ADD_PRODUCT','GET_PRODUCT','GET_PRODUCT_ADMIN']},
    {path: "productType",component:MahsulotTurlari,permissions:['ALL_TYPE']},
    {path: "category",component:Bolimlar,permissions:['ALL_CATEGORY']},
    {path: "measurements",component:Measurement,permissions:['ALL_MEASUREMENT']},
    {path: "brand",component:Firmalar,permissions:['ALL_BRAND']},
    {path: "addPurchase/:id?",component:Xarid,permissions:['ADD_PURCHASE','GET_PURCHASE','GET_PURCHASE_ADMIN']},
    {path: "addPurchase",component:Xarid,permissions:['ADD_PURCHASE']},
    {path: "purchaseList",component:HaridlarRoyxati,permissions:['ADD_PURCHASE','GET_PURCHASE','GET_PURCHASE_ADMIN']},
    {path: "tradeList",component:BarchaSavdolar,permissions:['ADD_TRADE','GET_TRADE','GET_TRADE_ADMIN']},
    {path: "addLossProducts/:id?",component:SavdoQoshish,permissions:['ADD_LOSS','GET_LOSS','GET_LOSS_ADMIN']},
    {path: "addLossProducts",component:SavdoQoshish,permissions:['ADD_LOSS','GET_LOSS','GET_LOSS_ADMIN']},
    {path: "lossProducts",component:LossProducts,permissions:['GET_LOSS','GET_LOSS_ADMIN']},
    {path: "lossProducts",component:LossProducts,permissions:['GET_LOSS','GET_LOSS_ADMIN']},
    {path: "outlayList",component:XarajatlarRoyxati,permissions:['ADD_OUTLAY','GET_OUTLAY','GET_OUTLAY_ADMIN']},
    {path: "addOutlay/:id?",component:XarajatQoshish,permissions:['ADD_OUTLAY','GET_OUTLAY','GET_OUTLAY_ADMIN']},
    {path: "addOutlay",component:XarajatQoshish,permissions:['ADD_OUTLAY']},
    {path: "outlayCategoryList",component:XarajatTurlari,permissions:['ADD_OUTLAY','GET_OUTLAY']},
    {path: "productsReport",component:MaxsulotXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "lostProductsReport",component:MaxsulotMiqdoriQoldigi,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "tradesReport",component:SavdodaTulov,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "purchasesReport",component:XaridlarXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "customersReport",component:MijozlarXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "usersReport",component:XodimlarNazorati,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "suppliersReport",component:SupplierReport,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "remainProductReport",component:QoldiqlarXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "shopSetting",component:Dukon,permissions:['EDIT_INVOICE','EDIT_MY_BUSINESS']},
    {path: "branches",component:Bazalar,permissions:['ADD_BRANCH','GET_BRANCH']},
]

function Headerthird({users}) {
    const [classheader, setClassheader] = useState('headerthird-active')
    const [classSidebar, setClassSidebar] = useState('home-sidebar-active')

    function sidebarheader() {
        if (classheader === 'headerthird-active') {
            setClassheader('headerthird')
            setClassSidebar('home-sidebar')
        } else {
            setClassheader('headerthird-active')
            setClassSidebar('home-sidebar-active')
        }
    }



    return (
        <div className={'home-header'}>
            <div className={classSidebar}>
                <Sidebar sidebaractive2={sidebarheader}/>
            </div>
            <div className={`${classheader}`}>
                <div className={'headerthird-item'}>
                    <div>
                        <Header sidebarfunc={sidebarheader}/>
                    </div>
                    <Switch>
                        {/*{*/}
                        {/*    users.isSuperAdmin && <Route path={'/superadmin'} component={SuperAdmin}/>*/}
                        {/*}*/}
                        {
                            routes.map(item=>
                                <ProtectedRoute path={"/main/"+item.path} component={item.component} roles={item.permissions}/>
                            )
                        }
                        {/*<Route path={'/addUser/:id?'} component={Taxrirlash}/>*/}
                        {/*<Route path={'/addUser'} component={Taxrirlash}/>*/}
                        {/*<Route path={'/user'} component={HodimlarRoyhati}/>*/}
                        {/*<Route path={'/addRole/:id?'} component={Taxrirlash2}/>*/}
                        {/*<Route path={'/addRole'} component={Taxrirlash2}/>*/}
                        {/*<Route path={'/role'} component={Lavozimlar}/>*/}
                        {/*<Route path={'/hodimulush/taxrirlash'} component={Taxrirlash}/>*/}

                        {/*<Route path={'/balanceTable'} component={BalanceTableAt}/>*/}
                        {/*<Route path={'/balanceHistory'} component={BalanceHistory}/>*/}


                        {/*<Route path={'/supplier'} component={Taminotchilar}/>*/}
                        {/*<Route path={'/customer'} component={Customers}/>*/}

                        {/*<Route path={'/addProduct/:id?'} component={Taxrirlash3}/>*/}
                        {/*<Route path={'/addProduct'} component={Taxrirlash3}/>*/}
                        {/*<Route path={'/importProduct'} component={MahsulotImport}/>*/}
                        {/*<Route path={'/productList'} component={MaxsulotlarRoyxati}/>*/}
                        {/*<Route path={'/productType'} component={MahsulotTurlari}/>*/}
                        {/*<Route path={'/category'} component={Bolimlar}/>*/}
                        {/*<Route path={'/measurements'} component={Measurement}/>*/}
                        {/*<Route path={'/brand'} component={Firmalar}/>*/}

                        {/*<Route path={'/addPurchase/:id?'} component={Xarid}/>*/}
                        {/*<Route path={'/addPurchase'} component={Xarid}/>*/}
                        {/*<Route path={'/purchaseList'} component={HaridlarRoyxati}/>*/}

                        {/*<Route path={'/tradeList'} component={BarchaSavdolar}/>*/}
                        {/*<Route path={'/addLossProducts/:id?'} component={SavdoQoshish}/>*/}
                        {/*<Route path={'/addLossProducts'} component={SavdoQoshish}/>*/}
                        {/*<Route path={'/lossProducts'} component={LossProducts}/>*/}


                        {/*<Route path={'/outlayList'} component={XarajatlarRoyxati}/>*/}
                        {/*<Route path={'/addOutlay/:id?'} component={XarajatQoshish}/>*/}
                        {/*<Route path={'/addOutlay'} component={XarajatQoshish}/>*/}
                        {/*<Route path={'/outlayCategoryList'} component={XarajatTurlari}/>*/}


                        {/*<Route path={'/lostProductsReport'} component={MaxsulotMiqdoriQoldigi}/>*/}
                        {/*<Route path={'/tradesReport'} component={SavdodaTulov}/>*/}
                        {/*<Route path={'/productsReport'} component={MaxsulotXisoboti}/>*/}
                        {/*<Route path={'/purchasesReport'} component={XaridlarXisoboti}/>*/}
                        {/*<Route path={'/customersReport'} component={MijozlarXisoboti}/>*/}
                        {/*<Route path={'/usersReport'} component={XodimlarNazorati}/>*/}
                        {/*<Route path={'/suppliersReport'} component={SupplierReport}/>*/}
                        {/*<Route path={'/remainProductReport'} component={QoldiqlarXisoboti}/>*/}


                        {/*{*/}
                        {/*    users.editMyBusiness || users.editInvoice ?*/}
                        {/*        <Route path={'/shopSetting'} component={Dukon}/> : ''*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    users.addBranch || users.getBranch ?*/}
                        {/*        <Route path={'/branches'} component={Bazalar}/> : ''*/}
                        {/*}*/}


                        <Route path={'/main/shtrixcode'} component={ShtrixCode}/>
                        <Route path={'/main/profil/edit'} component={Profil}/>
                        <Route path={'/main/profil/:id'} component={RecentActivity}/>
                        <Route path={'/main/profil'} component={RecentActivity}/>
                        <Route path={'/main/dashboard'} component={Third}/>
                        <Route path={'*'} component={Error409}/>
                    </Switch>
                </div>

            </div>
        </div>

    );
}

export default connect((users), {})(Headerthird);
