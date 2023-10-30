import React, {useState} from 'react';
import Icon from '@ant-design/icons';
import './sidebar.css'
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import {Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ThirdPage/ProtectedRoute";
import Profil from "./header/Profil";
import RecentActivity from "./header/ViewProfile/RecentActivity";
import Third from "./ThirdPage/Third";
import Error409 from "../../dashboard/jsx/pages/Error409";
import {routes} from './headerthird';
import users from "../../reducer/users";
import {connect} from "react-redux";
import Logo from "../../img/g14.svg"
import OpenMenu from "../../img/align-right.svg"
import {
    CustomerIcon,
    Kassa,
    MainMenu,
    OutlayIcon,
    ProductIcon,
    PurchaseIcon, ReportIcon, SettingIcon,
    SuperAdminIcon,
    TradeIcon,
    UsersIcon
} from "../Components/svg";
import MainHeader from "./header/MainHeader";
import {useTranslation} from "react-i18next";
const {Header, Content, Footer, Sider} = Layout;


const Sidebar = ({users}) => {

    const history = useHistory()
    const {t} = useTranslation()
    const [collapsed, setCollapsed] = useState(false);
    const rootSubmenuKeys = ['/main/dashboard', '/main/superadmin', '/main/balance', 'user', 'customers', 'products', 'purchase', 'trades', 'outlay', 'reports', 'setting'];
    const [openKeys, setOpenKeys] = useState(['/main/dashboard']);
    // const [goFull,setGoFull] = useState(false)


    // const screenWidth = window.innerWidth

        // const screenWidthTrue = screenWidth < 768
    const onOpenChange = (keys) => {
        console.log(keys)
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    function changeFullScreen(){
        let e = document.getElementById("fullscreen")
        if(e.screenfull.isEnabled){

        }
    }

    const [screenWidthTrue,setScreenWidthTrue] = useState(false)
    window.addEventListener("resize", function () {
        const screenWidth = window.innerWidth
        setScreenWidthTrue(screenWidth < 768)
    });
    const items = [
        {
            label: t("sidebar.superadmin"),
            key: '/main/superadmin',
            icon: <Icon component={SuperAdminIcon}/>,
            check: users.isSuperAdmin
        },
        {
            type: 'divider', check: users.isSuperAdmin,
        },
        {
            label: t('sidebar.mainPage'),
            key: '/main/dashboard',
            check: users.getInfo || users.getInfoAdmin,
            icon: <Icon component={MainMenu}/>,
        },
        {
            label: t("sidebar.users"),
            key: 'grp',
            check: !collapsed,
            disabled: true,
        },
        {
            label: t("sidebar.balance"),
            key: '/main/balance',
            icon: <Icon component={Kassa}/>,
            check: users.getBalance || users.getBalanceAdmin,
            children: [
                {label: t("sidebar.balanceStatus"), key: '/main/balanceTable', check: users.getBalance || users.getBalanceAdmin},
                {
                    label: t("sidebar.balanceChanges"),
                    key: '/main/balanceHistory',
                    check: users.getBalance || users.getBalanceAdmin
                },
            ].filter(item => item.check === true)
        },
        {
            label: t("sidebar.users"), key: 'user', check: users.addUser || users.getUserAdmin || users.getUser ||
                users.addRole || users.getRole, icon: <Icon component={UsersIcon}/>,
            children: [
                {label: t("sidebar.users"), key: '/main/user', check: users.addUser || users.getUserAdmin || users.getUser},
                {label: t("sidebar.roles"), key: '/main/role', check: users.addRole || users.getRole},
            ].filter(item => item.check === true)
        },
        {
            label: t("sidebar.customers"),
            key: 'customers',
            check: users.addSupplier || users.getSupplier ||
                users.addCustomer || users.getCustomerAdmin || users.getCustomer,
            icon: <Icon component={CustomerIcon}/>,
            children: [
                {label: t("sidebar.supplier"), key: '/main/supplier', check: users.addSupplier || users.getSupplier},
                {
                    label: t("sidebar.customer"),
                    key: '/main/customer',
                    check: users.addCustomer || users.getCustomerAdmin || users.getCustomer
                },
            ].filter(item => item.check === true)
        },
        {
            label:  t("sidebar.report"),
            key: 'grp2',
            check: !collapsed,
            disabled: true,
        },
        {
            label:  t("sidebar.product"),
            key: 'products',
            check: users.getProductAdmin || users.getProduct || users.addProduct || users.productTypeRoles ||
                users.measurementRoles || users.brandRoles || users.categoryRoles,
            icon: <Icon component={ProductIcon}/>,
            children: [
                {
                    label: t("sidebar.product"),
                    key: '/main/productList',
                    check: users.getProductAdmin || users.getProduct || users.addProduct
                },
                {label: t("sidebar.addProduct"), key: '/main/addProduct', check: users.addProduct},
                {label: t("sidebar.addType"), key: '/main/productType', check: users.productTypeRoles},
                {label: t("sidebar.importProduct"), key: '/main/importProduct', check: users.addProduct},
                {label: t("sidebar.category"), key: '/main/category', check: users.categoryRoles},
                {label: t("sidebar.brand"), key: '/main/brand', check: users.brandRoles},
                {label:t("sidebar.measurement"), key: '/main/measurements', check: users.measurementRoles},
            ].filter(item => item.check === true)
        },
        {
            label:  t("sidebar.purchase"),
            key: 'purchase',
            check: users.getPurchase || users.getPurchaseAdmin || users.addPurchase,
            icon: <Icon component={PurchaseIcon}/>,
            children: [
                {
                    label: t("sidebar.purchases"),
                    key: '/main/purchaseList',
                    check: users.getPurchase || users.getPurchaseAdmin || users.addPurchase
                },
                {label: t("sidebar.addPurchases"), key: '/main/addPurchase', check: users.addPurchase},
            ].filter(item => item.check === true)
        },
        {
            label:  t("sidebar.trade"),
            key: 'trades',
            check: users.addTrade || users.getTrade || users.getTradeAdmin || users.getLoss || users.getLossAdmin || users.addLoss,
            icon: <Icon component={TradeIcon}/>,
            children: [
                {
                    label: t("sidebar.trades"),
                    key: '/main/tradeList',
                    check: users.addTrade || users.getTradeAdmin || users.getTrade
                },
                {label: t("sidebar.shopWindow"), key: '/shopping', check: users.addTrade || users.getTrade},
                {label: t("sidebar.lossProduct"), key: '/main/addLossProducts', check: users.addLoss},
                {
                    label: t("sidebar.tableLossProduct"),
                    key: '/main/lossProducts',
                    check: users.getTrade || users.getTradeAdmin
                },
            ].filter(item => item.check === true)
        },
        {
            label:  t("sidebar.outlay"),
            key: 'outlay',
            check: users.addOutlay || users.getOutlay || users.getOutlayAdmin,
            icon: <Icon component={OutlayIcon}/>,
            children: [
                {
                    label: t("sidebar.outlay"),
                    key: '/main/outlayList',
                    check: users.addOutlay || users.getOutlay || users.getOutlayAdmin
                },
                {label: t("sidebar.outlayCategory"), key: '/main/outlayCategoryList', check: users.addOutlay || users.getOutlay},
            ].filter(item => item.check === true)
        },
        {
            label:  t("sidebar.report"),
            key: 'reports',
            check: users.getInfo || users.getInfoAdmin,
            icon: <Icon component={ReportIcon}/>,
            children: [
                {label: t("sidebar.purchaseReport"), key: '/main/purchasesReport', check: true},
                {label:  t("sidebar.customerReport"), key: '/main/customersReport', check: true},
                {label:  t("sidebar.supplierReport"), key: '/main/suppliersReport', check: true},
                {label:  t("sidebar.tradeReport"), key: '/main/tradesReport', check: true},
                {label:  t("sidebar.productReport"), key: '/main/productsReport', check: true},
                {label:  t("sidebar.productRemain"), key: '/main/remainProductReport', check: true},
                {label:  t("sidebar.usersControl"), key: '/main/usersReport', check: true},
                {label:  t("sidebar.tableLossProduct"), key: '/main/lostProductsReport', check: true},
            ].filter(item => item.check === true)
        },
        {
            label:  t("sidebar.setting"),
            key: '/main/shopSetting',
            check: users.editInvoice || users.editMyBusiness || users.getBranch || users.addBranch || users.getProduct,
            icon: <Icon component={SettingIcon}/>,
        },

    ].filter(item => item.check === true);


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
            id="fullscreen"
        >
            <Sider trigger={null} className={`sidebar-scroll ${screenWidthTrue && (collapsed ? 'd-none' : '')}`}
                   collapsible
                   width={screenWidthTrue ? (collapsed ? 0 : '100%') : (collapsed ? 80 : 250)} collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    {
                        !collapsed && <div className={'d-flex gap-1 align-items-center'}>
                            <img src={Logo} width={32} height={29} alt="logo"/>
                            <h4 className={'demo-logo-text'}>Miro</h4>
                        </div>
                    }
                    <Button
                        type="text"
                        icon={<img src={OpenMenu} alt="w"/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                            width: 28,
                            height: 28,
                        }}
                    />
                </div>
                <Menu colorText={'#1AA6E1'} onOpenChange={onOpenChange}
                      openKeys={openKeys} defaultSelectedKeys={['/main/dashboard']} onClick={(e) => {
                    history.push(e.key)
                    if (screenWidthTrue) {
                        setCollapsed(!collapsed)
                    }
                }}
                      mode="inline" items={items}/>
            </Sider>
            <Layout style={{
                marginLeft: screenWidthTrue ? (collapsed ? 0 : '100%') : (collapsed ? 80 : 250),
                overflowX: 'hidden',
            }}>
                <Header className={'sidebar-header'}>
                    <MainHeader changeScreenFull={changeFullScreen} setCollapsed={() => setCollapsed(!collapsed)}/>
                </Header>
                <Content className={'content'}>
                    <Switch>
                        {
                            routes.map(item =>
                                <ProtectedRoute path={"/main/" + item.path} component={item.component}
                                                roles={item.permissions}/>
                            )
                        }
                        {/*<Route path={'/main/shtrixcode'} component={ShtrixCode}/>*/}
                        <Route path={'/main/profil/edit'} component={Profil}/>
                        <Route path={'/main/profil/:id'} component={RecentActivity}/>
                        <Route path={'/main/profil'} component={RecentActivity}/>
                        <Route path={'/main/dashboard'} component={Third}/>
                        <Route path={'*'} component={Error409}/>
                    </Switch>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©2023 Created by Olim Jovliyev
                </Footer>
            </Layout>
        </Layout>
    );
};
export default connect((users), {})(Sidebar);