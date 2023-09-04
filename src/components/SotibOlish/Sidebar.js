import React, {useState} from 'react';
import Icon, {
    HomeOutlined,
} from '@ant-design/icons';
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
    SuperAdmin, SuperAdminIcon,
    TradeIcon,
    UsersIcon
} from "../Svg/svg";
import Hamkorlar from "./Sidebar/Hamkorlar/Hamkorlar";
import MainHeader from "./header/MainHeader";

const {Header, Content, Footer, Sider} = Layout;


const Sidebar = ({users}) => {

    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false);
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
            check: true,
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
                {label: 'Kassa holati', key: '/main/balanceTable', check: true},
                {label: 'Kassadagi o\'zgarishlar', key: '/main/balanceHistory', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Hodimlar', key: 'user', check: true, icon: <Icon component={UsersIcon}/>,
            children: [
                {label: 'Hodimlar', key: '/main/user', check: true},
                {label: 'Lavozimlar', key: '/main/role', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Hamkorlar', key: 'customers', check: true, icon: <Icon component={CustomerIcon}/>,
            children: [
                {label: 'Ta\'minotchilar', key: '/main/supplier', check: true},
                {label: 'Mijozlar', key: '/main/customer', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Xisobotlar',
            key: 'grp',
            check: !collapsed,
            disabled: true,
        },
        {
            label: 'Mahsulotlar', key: 'products', check: true, icon: <Icon component={ProductIcon}/>,
            children: [
                {label: 'Mahsulotlar', key: '/main/productList', check: true},
                {label: 'Mahsulot qo\'shish', key: '/main/addProduct', check: true},
                {label: 'Mahsulot turi', key: '/main/productType', check: true},
                {label: 'Mahsulot import', key: '/main/importProduct', check: true},
                {label: 'Bo\'limlar', key: '/main/category', check: true},
                {label: 'Firmalar', key: '/main/brand', check: true},
                {label: 'O\'lchov birligi', key: '/main/measurements', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Xarid', key: 'purchase', check: true, icon: <Icon component={PurchaseIcon}/>,
            children: [
                {label: 'Xaridlar', key: '/main/purchaseList', check: true},
                {label: 'Xarid qo\'shish', key: '/main/addPurchase', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Savdo', key: 'trades', check: true, icon: <Icon component={TradeIcon}/>,
            children: [
                {label: 'Savdolar', key: '/main/tradeList', check: true},
                {label: 'Savdo oynasi', key: '/shopping', check: true},
                {label: 'Mahsulot yo\'qotish', key: '/main/addLossProducts', check: true},
                {label: 'Yo\'qotilgan mahsulotlar', key: '/main/lossProducts', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Xarajatlar', key: 'outlay', check: true, icon: <Icon component={OutlayIcon}/>,
            children: [
                {label: 'Xarajatlar', key: '/main/outlayList', check: true},
                {label: 'Xarajatlar ro\'yhati', key: '/main/addOutlay', check: true},
                {label: 'Xarajat turi', key: '/main/outlayCategoryList', check: true},
            ].filter(item => item.check === true)
        },
        {
            label: 'Xisobotlar', key: 'reports', check: true, icon: <Icon component={ReportIcon}/>,
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
            label: 'Sozlamalar', key: 'setting', check: true, icon: <Icon component={SettingIcon}/>,
            children: [
                {label: 'Sozlamalar', key: '/main/shopSetting', check: true},
                {label: 'Filiallar', key: '/main/branches', check: true},

            ].filter(item => item.check === true)
        },

    ].filter(item => item.check === true);


    const  screenWidth = window.innerWidth
    console.log(screenWidth)

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider trigger={null} className={'sidebar-scroll'} collapsible
                   width={250} collapsed={collapsed}>
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
                      openKeys={openKeys} defaultSelectedKeys={['/main/dashboard']} onClick={(e) => history.push(e.key)}
                      mode="inline" items={items}/>
            </Sider>
            <Layout style={{
                marginLeft: collapsed ? 80 : 250,
            }} >
                <Header
                    style={{
                        padding: 32,
                        // borderBottom: "2px solid #F1F2F3",
                        background: "#FFF",
                        height: 103
                    }}
                ><MainHeader/>
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
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default connect((users), {})(Sidebar);