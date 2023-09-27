import React, {lazy, useEffect, useState} from "react";
import {Route, Switch, Redirect, useLocation, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import users, {saveusers} from "./reducer/users"
import './App.css'
import Sidebar from "./components/SotibOlish/Sidebar";

const Home = lazy(() => import("./components/Hbody/Home"))
const SavdoOynasi = lazy(() => import("./components/SotibOlish/Sidebar/Savdo/SavdoOynasi/SavdoOynasi"))
const SecondPage = lazy(() => import("./components/Pricing/SecondPage/SecondPage"))
const ShopInfo = lazy(() => import("./components/Pricing/ShopInfo/ShopInfo"))
const Error500 = lazy(() => import("./dashboard/jsx/pages/Error500"))
const Error409 = lazy(() => import("./dashboard/jsx/pages/Error409"))

function App({users, saveusers}) {
    const [auth, setAuth] = useState(false)
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const history = useHistory()
    const location = useLocation();

    useEffect(() => {
        setAuth(users.authEnter)
        let navLink = localStorage.getItem('navLik') || sessionStorage.getItem('navLik')
        if (location.pathname === '/main/dashboard' || location.pathname === '/login' || location.pathname === '/') {
            if (location.pathname === '/login') {
                history.push('/main/dashboard')
            } else {
                if (users.rememberme) {
                    localStorage.setItem("navLik", '')
                } else {
                    sessionStorage.setItem('navLik', '')
                }
            }
        } else {
            if (!users.logout) {
                if (users.rememberme) {
                    localStorage.setItem("navLik", location.pathname)
                } else {
                    sessionStorage.setItem('navLik', location.pathname)
                }
            } else {
                if (users.rememberme) {
                    localStorage.setItem("navLik", "/main/dashboard")
                } else {
                    sessionStorage.setItem('navLik', "/main/dashboard")
                }
            }

        }
        (users.getInfoAdmin || users.getInfo) ? navLink && history.push(navLink) : navLink === "/main/dashboard" ? history.push("/profil") : navLink && history.push(navLink)
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
            toast.info(navigator.onLine ? 'Become Online' : 'Become Offline')
        };
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [users.authEnter, isOnline])


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
        let tokenname = localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')
        if (user && tokenname) {
            saveusers({
                object: user,
                message: tokenname,
                success: true
            })
            history.push('/main/dashboard')
        }
    }, [])
    return (
        <div>
            <div>
                <Switch>
                    <Route path={'/login'} component={Home}/>
                    <Route path={'/shopDetails/:tariffId'} component={ShopInfo}/>
                    <Route path={'/success'} component={Error500}/>
                    <Route path={'/tariffs'} component={SecondPage}/>
                    {
                        auth ? <Route path={'/'}>
                            <Route path={'/main'} component={Sidebar}/>
                            {
                                users.getTrade || users.editTrade ?
                                    <Route path={'/shopping/:id'} exact  component={SavdoOynasi}/> : ''
                            }
                            {
                                users.addTrade || users.getTrade ?
                                    <Route path={'/shopping'}exact    component={SavdoOynasi}/> : ''
                            }
                            {
                                users.addTrade || users.getTrade ?
                                    <Route path={'/repeatProducts/:id/:remainId'} component={SavdoOynasi}/> : ''
                            }

                        </Route> : <Redirect to={'/login'}/>
                    }
                    <Route path={'*'} component={Error409}/>
                </Switch>
            </div>
        </div>

    );
}

export default connect((users), {saveusers})(App);
