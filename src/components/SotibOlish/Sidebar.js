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
} from "../Svg/svg";
import MainHeader from "./header/MainHeader";

const {Header, Content, Footer, Sider} = Layout;


const Sidebar = ({users}) => {

    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false);
    const rootSubmenuKeys = ['/main/dashboard', '/main/superadmin', '/main/balance', 'user', 'customers', 'products', 'purchase', 'trades', 'outlay', 'reports', 'setting'];
    const [openKeys, setOpenKeys] = useState(['/main/dashboard']);


    const [screenWidthTrue,setScreenWidthTrue] = useState(false)
    window.addEventListener("resize", function () {
        const screenWidth = window.innerWidth
        setScreenWidthTrue(screenWidth < 768)
    });


    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const items = [
        {
            label: 'SuperAdmin',
            key: '/main/superadmin',
            icon: <Icon component={SuperAdminIcon}/>,
            check: users.isSuperAdmin
        },
        {
            type: 'divider', check: users.isSuperAdmin,
        },
        {
            label: 'Bosh sahifa',
            key: '/main/dashboard',
            check: users.getInfo || users.getInfoAdmin,
            icon: <Icon component={MainMenu}/>,
        },
        {
            label: 'Hodimlar',
            key: 'grp',
            check: !collapsed,
            disabled: true,
        },
        {
            label: 'Kassa',
            key: '/main/balance',
            icon: <Icon component={Kassa}/>,
            check: users.getBalance || users.getBalanceAdmin,
            children: [
                {label: 'Kassa holati', key: '/main/balanceTable', check: users.getBalance || users.getBalanceAdmin},
                {
                    label: 'Kassadagi o\'zgarishlar',
                    key: '/main/balanceHistory',
                    check: users.getBalance || users.getBalanceAdmin
                },
            ].filter(item => item.check === true)
        },
        {
            label: 'Hodimlar', key: 'user', check: users.addUser || users.getUserAdmin || users.getUser ||
                users.addRole || users.getRole, icon: <Icon component={UsersIcon}/>,
            children: [
                {label: 'Hodimlar', key: '/main/user', check: users.addUser || users.getUserAdmin || users.getUser},
                {label: 'Lavozimlar', key: '/main/role', check: users.addRole || users.getRole},
            ].filter(item => item.check === true)
        },
        {
            label: 'Hamkorlar',
            key: 'customers',
            check: users.addSupplier || users.getSupplier ||
                users.addCustomer || users.getCustomerAdmin || users.getCustomer,
            icon: <Icon component={CustomerIcon}/>,
            children: [
                {label: 'Ta\'minotchilar', key: '/main/supplier', check: users.addSupplier || users.getSupplier},
                {
                    label: 'Mijozlar',
                    key: '/main/customer',
                    check: users.addCustomer || users.getCustomerAdmin || users.getCustomer
                },
            ].filter(item => item.check === true)
        },
        {
            label: 'Xisobotlar',
            key: 'grp2',
            check: !collapsed,
            disabled: true,
        },
        {
            label: 'Mahsulotlar',
            key: 'products',
            check: users.getProductAdmin || users.getProduct || users.addProduct || users.productTypeRoles ||
                users.measurementRoles || users.brandRoles || users.categoryRoles,
            icon: <Icon component={ProductIcon}/>,
            children: [
                {
                    label: 'Mahsulotlar',
                    key: '/main/productList',
                    check: users.getProductAdmin || users.getProduct || users.addProduct
                },
                {label: 'Mahsulot qo\'shish', key: '/main/addProduct', check: users.addProduct},
                {label: 'Mahsulot turi', key: '/main/productType', check: users.productTypeRoles},
                {label: 'Mahsulot import', key: '/main/importProduct', check: users.addProduct},
                {label: 'Bo\'limlar', key: '/main/category', check: users.categoryRoles},
                {label: 'Firmalar', key: '/main/brand', check: users.brandRoles},
                {label: 'O\'lchov birligi', key: '/main/measurements', check: users.measurementRoles},
            ].filter(item => item.check === true)
        },
        {
            label: 'Xarid',
            key: 'purchase',
            check: users.getPurchase || users.getPurchaseAdmin || users.addPurchase,
            icon: <Icon component={PurchaseIcon}/>,
            children: [
                {
                    label: 'Xaridlar',
                    key: '/main/purchaseList',
                    check: users.getPurchase || users.getPurchaseAdmin || users.addPurchase
                },
                {label: 'Xarid qo\'shish', key: '/main/addPurchase', check: users.addPurchase},
            ].filter(item => item.check === true)
        },
        {
            label: 'Savdo',
            key: 'trades',
            check: users.addTrade || users.getTrade || users.getTradeAdmin || users.getLoss || users.getLossAdmin || users.addLoss,
            icon: <Icon component={TradeIcon}/>,
            children: [
                {
                    label: 'Savdolar',
                    key: '/main/tradeList',
                    check: users.addTrade || users.getTradeAdmin || users.getTrade
                },
                {label: 'Savdo oynasi', key: '/shopping', check: users.addTrade || users.getTrade},
                {label: 'Mahsulot yo\'qotish', key: '/main/addLossProducts', check: users.addLoss},
                {
                    label: 'Yo\'qotilgan mahsulotlar',
                    key: '/main/lossProducts',
                    check: users.getTrade || users.getTradeAdmin
                },
            ].filter(item => item.check === true)
        },
        {
            label: 'Xarajatlar',
            key: 'outlay',
            check: users.addOutlay || users.getOutlay || users.getOutlayAdmin,
            icon: <Icon component={OutlayIcon}/>,
            children: [
                {
                    label: 'Xarajatlar',
                    key: '/main/outlayList',
                    check: users.addOutlay || users.getOutlay || users.getOutlayAdmin
                },
                {label: 'Xarajatlar ro\'yhati', key: '/main/addOutlay', check: users.addOutlay},
                {label: 'Xarajat turi', key: '/main/outlayCategoryList', check: users.addOutlay || users.getOutlay},
            ].filter(item => item.check === true)
        },
        {
            label: 'Xisobotlar',
            key: 'reports',
            check: users.getInfo || users.getInfoAdmin,
            icon: <Icon component={ReportIcon}/>,
            children: [
                {label: 'Xaridlar xisoboti', key: '/main/purchasesReport', check: true},
                {label: 'Mijozlar xisoboti', key: '/main/customersReport', check: true},
                {label: 'Ta\'minotchilar xisoboti', key: '/main/suppliersReport', check: true},
                {label: 'Savdolar xisoboti', key: '/main/tradesReport', check: true},
                {label: 'Mahsulotlar xisoboti', key: '/main/productsReport', check: true},
                {label: 'Mahsulotlar qoldig\'i', key: '/main/remainProductReport', check: true},
                {label: 'Xodimlar nazorati', key: '/main/usersReport', check: true},
                {label: 'Yo\'qotilgan mahsulotlar', key: '/main/lostProductsReport', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Sozlamalar',
            key: 'setting',
            check: users.editInvoice || users.editMyBusiness || users.getBranch || users.addBranch,
            icon: <Icon component={SettingIcon}/>,
            children: [
                {label: 'Sozlamalar', key: '/main/shopSetting', check: users.editMyBusiness || users.editInvoice},
                {label: 'Filiallar', key: '/main/branches', check: users.addBranch || users.getBranch},

            ].filter(item => item.check === true)
        },

    ].filter(item => item.check === true);


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider trigger={null} className={`sidebar-scroll ${screenWidthTrue && (collapsed ? 'd-none' : '')}`}
                   collapsible
                   width={screenWidthTrue ? (collapsed ? 0 : '100%') : (collapsed ? 80 : 250)} collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    {
                        !collapsed && <div className={'d-flex gap-1 align-items-center'}>
                            <img src={Logo} width={32} height={29} alt="logo"/>
                            <h4 className={'demo-logo-text'}>Rise</h4>
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
                <Header className={'sidebar-header'}><MainHeader setCollapsed={() => setCollapsed(!collapsed)}/>
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