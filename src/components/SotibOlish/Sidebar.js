import {lazy, useState} from 'react';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {Button, Layout, Menu} from 'antd';
import Icon from '@ant-design/icons';

import MainHeader from "./header/MainHeader";
import useWindowWidth from "../Components/useWindowWidth";
import ProtectedRoute from "./ThirdPage/ProtectedRoute";
import {routes} from './Routes';
import users from "../../reducer/users";
import Logo from "../../img/g14.svg"
import OpenMenu from "../../img/align-right.svg"
import {
    CustomerIcon,
    Kassa,
    MainMenu,
    OutlayIcon,
    ProductIcon,
    PurchaseIcon,
    ReportIcon,
    SettingIcon,
    SuperAdminIcon,
    TradeIcon,
    UsersIcon
} from "../Components/svg";

import './sidebar.css'

const Third = lazy(() => import("./ThirdPage/Third"))
const Profil = lazy(() => import("./header/Profil"))
const RecentActivity = lazy(() => import("./header/ViewProfile/UserProfile"))
const Error409 = lazy(() => import("../../dashboard/jsx/pages/Error409"))

const {Header, Content, Footer, Sider} = Layout;


const Sidebar = ({users}) => {
    const location = useLocation()
    const widthWidth = useWindowWidth()
    const history = useHistory()
    const {t} = useTranslation()
    const [collapsed, setCollapsed] = useState(widthWidth <= 1024);
    const rootSubmenuKeys = ['/main/dashboard', '/main/superadmin', '/main/balance', 'user', 'customers', 'products', 'purchase', 'trades', 'outlay', 'reports', 'setting'];
    const [openKeys, setOpenKeys] = useState(['/main/dashboard']);

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
                {
                    label: t("sidebar.balanceStatus"),
                    key: '/main/balanceTable',
                    check: users.getBalance || users.getBalanceAdmin
                },
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
                {
                    label: t("sidebar.users"),
                    key: '/main/user',
                    check: users.addUser || users.getUserAdmin || users.getUser
                },
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
            label: t("sidebar.report"),
            key: 'grp2',
            check: !collapsed,
            disabled: true,
        },
        {
            label: t("sidebar.product"),
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
                {label: t("sidebar.measurement"), key: '/main/measurements', check: users.measurementRoles},
            ].filter(item => item.check === true)
        },
        {
            label: t("sidebar.trade") + " / " + t("sidebar.purchase"),
            key: 'trades',
            check: users.addTrade || users.getTrade || users.getTradeAdmin || users.getLoss || users.getLossAdmin || users.addLoss,
            icon: <Icon component={TradeIcon}/>,
            children: [
                {label: t("sidebar.shopWindow"), key: '/shopping', check: users.addTrade || users.getTrade},
                {label: t("sidebar.addPurchases"), key: '/main/addPurchase', check: users.addPurchase},
                {label: t("sidebar.lossProduct"), key: '/main/addLossProducts', check: users.addLoss},
                {
                    label: t("sidebar.tableLossProduct"),
                    key: '/main/lossProducts',
                    check: users.getTrade || users.getTradeAdmin
                },
            ].filter(item => item.check === true)
        },
        {
            label: t("sidebar.outlay"),
            key: 'outlay',
            check: users.addOutlay || users.getOutlay || users.getOutlayAdmin,
            icon: <Icon component={OutlayIcon}/>,
            children: [
                {
                    label: t("sidebar.outlay"),
                    key: '/main/outlayList',
                    check: users.addOutlay || users.getOutlay || users.getOutlayAdmin
                },
                {
                    label: t("sidebar.outlayCategory"),
                    key: '/main/outlayCategoryList',
                    check: users.addOutlay || users.getOutlay
                },
            ].filter(item => item.check === true)
        },
        {
            label: t("sidebar.report"),
            key: 'reports',
            check: users.getInfo || users.getInfoAdmin,
            icon: <Icon component={ReportIcon}/>,
            children: [
                {label: t("sidebar.purchaseReport"), key: '/main/purchasesReport', check: true},
                {label: t("sidebar.customerReport"), key: '/main/customersReport', check: true},
                {label: t("sidebar.tradeReport"), key: '/main/tradesReport', check: true},
                {label: t("sidebar.productReport"), key: '/main/productsReport', check: true},
                {label: t("sidebar.productRemain"), key: '/main/remainProductReport', check: true},
                {label: t("sidebar.usersControl"), key: '/main/usersReport', check: true},
                {label: t("sidebar.tableLossProduct"), key: '/main/lostProductsReport', check: true},
                {label: 'Mahsulotlar muddati', key: '/main/productLifeTime', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: t("sidebar.setting"),
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
            <Sider
                trigger={null}
                className={`sidebar-scroll ${widthWidth <= 1024 && (collapsed ? 'd-none' : '')}`}
                collapsible
                collapsedWidth={widthWidth >= 1024 ? 100 : 0}
                width={widthWidth <= 1024 ? (collapsed ? 0 : '100%') : (collapsed ? 100 : 250)}
                collapsed={collapsed}
            >
                <div className="demo-logo-vertical">
                    {
                        !collapsed && <div className={'d-flex gap-1 align-items-center'}>
                            <img src={Logo} width={32} height={29} alt="logo"/>
                            <h4 className={'demo-logo-text'}>Miro</h4>
                        </div>
                    }
                    <Button
                        type="text"
                        icon={<img src={OpenMenu} alt="burger menu icon"/>}
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
                <Menu
                    colorText={'#1AA6E1'}
                    onOpenChange={onOpenChange}
                    defaultOpenKeys={openKeys}
                    defaultSelectedKeys={[location.pathname]}
                    onClick={(e) => {
                        history.push(e.key)
                        if (widthWidth <= 1024) {
                            setCollapsed(!collapsed)
                        }
                    }}
                    mode="inline"
                    items={items}/>
            </Sider>
            <Layout style={{
                marginLeft: widthWidth <= 1024 ? (collapsed ? 0 : '100%') : (collapsed ? 100 : 250),
                overflowX: 'hidden'
            }}>
                <Header className={'sidebar-header'}>
                    <MainHeader setCollapsed={() => setCollapsed(!collapsed)}/>
                </Header>
                <Content className={'content'}>
                    <Switch>
                        {
                            routes.map(item =>
                                <ProtectedRoute path={"/main/" + item.path} component={item.component}
                                                roles={item.permissions}/>
                            )
                        }
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
                    © {new Date().getFullYear()} created by Jovliyev Olim. All rights reserved
                </Footer>
            </Layout>
        </Layout>
    );
};
export default connect((users), {})(Sidebar);
