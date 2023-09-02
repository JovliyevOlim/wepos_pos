import './sidebar.css'
import {connect} from "react-redux";
import React, {useState} from "react";
import Hodimlar from "./Hodimlar/Hodimlar";
import Hamkorlar from "./Hamkorlar/Hamkorlar";
import Maxsulotlar from "./Maxsulotlar/Maxsulotlar";
import Haridlar from "./Haridlar/Haridlar";
import Xarajatlar from "./Xarajatlar/Xarajatlar";
import Xirsobotlar from "./Xisobotlar/Xirsobotlar";
import Sozlamalar from "./Settings/Sozlamalar";
import Savdo from "./Savdo/Savdo";
import logo from '../../../img/Artboard 3@2x (1).png'
import {Link} from "react-router-dom";
import users from "../../../reducer/users";
import {useTranslation} from "react-i18next";
import Balance from "./Balance/Balance";

function Sidebar({sidebaractive2, users}) {

    function sidebaractive() {
        changeLink('')
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1023.9) {
            sidebaractive2()
        }
    }

    const [link, setLink] = useState('')

    function changeLink(item) {
        setLink(item)
    }

    const {t} = useTranslation()

    return (
        <div className={`sidebar`}>
            <div className="sidehead d-flex justify-content-center align-items-center">
                <img src={logo} alt="logo"/>
                <h3 className={'ms-2 p-0 m-0 fw-bold'}>OPTIMIT</h3>
            </div>
            <div className={'gap ms-2 sidebar-active'}>
                <div className={'navigation'}>
                    <div className="nav pt-5">

                        <div className={"row"}>
                            {
                                users.isSuperAdmin ? <Link onClick={sidebaractive} to={'/main/superadmin'}>
                                    <div className={'d-flex align-items-center'}>
                                        <img className={'im3'} src={''} alt=""/>
                                        <h5 className={'mr sidebar-text'}>Super Admin</h5>
                                    </div>
                                </Link> : ''
                            }


                            {
                                users.isSuperAdmin ?
                                    <hr/> : ''
                            }

                            {
                                users.getInfo || users.getInfoAdmin ?
                                    <div className="imgDiv">
                                        <div className={'d-flex align-items-center'}>
                                            <Link onClick={sidebaractive} className={'d-flex align-items-center'}
                                                  to={'/main/dashboard'}>
                                                <svg className={'sidebar-img'} width="24" height="24" viewBox="0 0 24 24"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
                                                        stroke="#0044FF" strokeWidth="1.5" strokeMiterlimit="10"
                                                        strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path
                                                        d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                                                        stroke="#0044FF" strokeWidth="1.5" strokeMiterlimit="10"
                                                        strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path
                                                        d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
                                                        stroke="#0044FF" strokeWidth="1.5" strokeMiterlimit="10"
                                                        strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path
                                                        d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                                                        stroke="#0044FF" strokeWidth="1.5" strokeMiterlimit="10"
                                                        strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <h4 className={'sidebar-text'}>{t('Sidebar.1')}</h4>
                                            </Link>
                                        </div>
                                    </div>:''
                            }


                        </div>
                        {
                            users.getBalance || users.getBalanceAdmin ?
                                <Balance link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/> : ''
                        }
                        {
                            users.addUser || users.getUserAdmin || users.getUser ||
                            users.addRole || users.getRole ?
                                <Hodimlar link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/> : ''
                        }
                        {
                            users.addSupplier || users.getSupplier ||
                            users.addCustomer || users.getCustomerAdmin || users.getCustomer ?
                                <Hamkorlar link={link} changeLink={changeLink} sidebaractiveopen={sidebaractive2}/> : ''
                        }
                        {
                            users.getProductAdmin || users.getProduct || users.addProduct || users.productTypeRoles ||
                            users.measurementRoles || users.brandRoles || users.categoryRoles ?
                                <Maxsulotlar link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/>:' '
                        }

                        {
                            users.getPurchase || users.getPurchaseAdmin || users.addPurchase ?
                                <Haridlar link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/> : ''
                        }

                        {
                            users.addTrade || users.getTrade || users.getTradeAdmin || users.getLoss || users.getLossAdmin || users.addLoss ?
                                <Savdo link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/>
                                : ''
                        }

                        {
                            users.addOutlay || users.getOutlay || users.getOutlayAdmin ?
                                <Xarajatlar link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/>:''
                        }


                        {
                            users.getInfo || users.getInfoAdmin ?
                                <Xirsobotlar link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/>
                                : ''
                        }
                        {
                            users.editInvoice || users.editMyBusiness || users.getBranch || users.addBranch ?
                                <Sozlamalar link={link} changeLink={changeLink} sidebaractive2={sidebaractive2}/> : ''
                        }
                    </div>
                </div>

            </div>
        </div>

    )
}

export default connect((users), {})(Sidebar)
