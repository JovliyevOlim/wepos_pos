import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button, Select} from "antd";
import Icon, {DeleteOutlined, TableOutlined} from "@ant-design/icons";
import {MdOutlineFiberNew} from "react-icons/md"
import {BsCheckAll} from 'react-icons/bs'
import moment from "moment";
import 'moment/locale/uz-latn'

import {active} from "../../../reducer/functionreducer";
import users, {logOutUser} from "../../../reducer/users";
import notificationReducer, {
    getNotification,
    getNotificationAll,
    deleteNotification,
    deleteAllNotification,
    isReadNotification,
} from "../../../reducer/notificationReducer";
import {BaseUrl} from "../../../middleware";
import useWindowWidth from "../../Components/useWindowWidth";
import {BurgerIcon, EditIcon, LogOutIcon, PersonIcon} from "../../Components/svg";
import avatar from "../../../img/defaul-user-profile.svg"
import notificationActive from '../../../img/notification-active.svg'
import notification from '../../../img/notification.svg'
import uzLanguage from '../../../img/uz.svg'
import rusLanguage from '../../../img/ru.svg'

import './mainHeader.css'

function MainHeader({
                        deleteNotification,
                        logOutUser,
                        getNotificationAll,
                        notificationReducer,
                        users,
                        getNotification,
                        isReadNotification,
                        deleteAllNotification,
                        setCollapsed
                    }) {
    const widthWidth = useWindowWidth()
    const {t, i18n} = useTranslation()
    const location = useLocation()
    const history = useHistory()
    const appLang = localStorage.getItem("miroLang") || "uz"
    const [lang, setLang] = useState(appLang)
    const [activeN, setactiveN] = useState(false)
    const [exit, setExit] = useState(false)

    useEffect(() => {
        getNotification()
        if (notificationReducer.saveBoolean) {
            getNotificationAll()
        }
    }, [notificationReducer.current, location.pathname])

    function out() {
        setExit(!exit)
    }

    function toggle2() {
        setactiveN(!activeN)
    }

    function ChangeLanguage(e) {
        setLang(e)
        localStorage.setItem("appLang", e)
        i18n.changeLanguage(e)
    }


    function isRead(id) {
        isReadNotification(id)
    }

    function openNotification() {
        setactiveN(true)
        getNotificationAll()
    }

    function logOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("tokenname");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("tokenname");
        logOutUser()
        out()
    }

    return (
        <div className={'main-header'}>
            <div className={'main-header-left'}>
                <div className="main-header-icon">
                    <Button
                        type="text"
                        icon={<Icon component={BurgerIcon}/>}
                        onClick={setCollapsed}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    />
                </div>
                <button title={t("sidebar.shopWindow")} onClick={() => history.push('/shopping')}
                        className="savdoOynasiBtn">
                    {
                        widthWidth >= 768 ? <span>{t("sidebar.shopWindow")}</span> : null
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M7 18.5C7 17.3954 7.89543 16.5 9 16.5C10.1046 16.5 11 17.3954 11 18.5V22.5H7V18.5Z"
                              stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path
                            d="M22 8.75V6.5C22 4.29086 20.2091 2.5 18 2.5H6C3.79086 2.5 2 4.29086 2 6.5V8.75C2 10.8211 3.49238 12.5 5.33333 12.5C7.17428 12.5 8.66667 10.8211 8.66667 8.75C8.66667 10.8211 10.1591 12.5 12 12.5C13.841 12.5 15.3333 10.8211 15.3333 8.75C15.3333 10.8211 16.8257 12.5 18.6667 12.5C20.5076 12.5 22 10.8211 22 8.75Z"
                            stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path
                            d="M14 15.5C14 14.9477 14.4477 14.5 15 14.5H17C17.5523 14.5 18 14.9477 18 15.5V16.5C18 17.0523 17.5523 17.5 17 17.5H15C14.4477 17.5 14 17.0523 14 16.5V15.5Z"
                            stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M21 11.5V18.5C21 20.7091 19.2091 22.5 17 22.5H7C4.79086 22.5 3 20.7091 3 18.5V11.5"
                              stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className={'main-header-right'}>
                <div>
                    <Select
                        style={{width: widthWidth >= 768 ? 150 : 70}}
                        size={"large"}
                        onChange={ChangeLanguage}
                        value={lang}
                        options={[
                            {
                                value: 'uz',
                                label: <div className="d-flex align-items-center gap-2">
                                    {
                                        widthWidth >= 768 ? <>
                                            <img src={uzLanguage} alt="uz"/>
                                            <span>O'zbekcha</span>
                                        </> : <span>O'z</span>
                                    }
                                </div>,
                            },
                            {
                                value: 'ki',
                                label: <div className="d-flex align-items-center gap-2">
                                    {
                                        widthWidth >= 768 ? <>
                                            <img src={uzLanguage} alt="kr"/>
                                            <span>Ўзбекча</span>
                                        </> : <span>Ўз</span>
                                    }

                                </div>,
                            },
                            {
                                value: 'ru',
                                label: <div className="d-flex align-items-center gap-2">
                                    {
                                        widthWidth >= 768 ? <>
                                            <img src={rusLanguage} alt="ru"/>
                                            <span>Русский</span>
                                        </> : <span>Ру</span>
                                    }
                                </div>,
                            },
                        ]}
                    />
                </div>
                <div>
                    <div className={'main-notification-img'} onClick={openNotification}>
                        <img className={'img-fluid'}
                             src={notificationReducer.notificationCount ? notificationActive : notification}
                             alt="notification"/>
                    </div>
                </div>
                <div className={'d-flex align-items-center'} style={{columnGap: '12px'}}>
                    <div className={'main-header-img'} onClick={out}>
                        <img className={'img-fluid'}
                             src={users.users?.photoId ? `${BaseUrl}/attachment/download/${users.users?.photoId}` : avatar}
                             alt="avatar"/>
                    </div>
                    <div className={'main-header-text'}>
                        <h6 className={'main-header-text-fio'}>{widthWidth >= 768 ? users.users?.fio : users.users?.fio?.split(" ")[0]}</h6>
                        <p className={'main-header-text-login'}>{users.users?.username}</p>
                    </div>
                </div>
            </div>
            <div className="main-header-profile">
                {
                    exit ?
                        <div className={'profile-menu'}>
                            <Link to={`/main/profil`}>
                                <div onClick={out} className={'profile-items'}>
                                    <Icon component={PersonIcon}/>
                                    <p className={'profile-items-text'}>Mening Profilim</p>
                                </div>
                            </Link>
                            <Link to={`/main/profil/edit`}>
                                <div onClick={out} className={'profile-items'}>
                                    <Icon component={EditIcon}/>
                                    <p className={'profile-items-text'}>Profilni tahrirlash</p>
                                </div>
                            </Link>
                            <hr/>
                            <Link to={'/login'}>
                                <div onClick={logOut} className={'profile-items'}>
                                    <Icon component={LogOutIcon}/>
                                    <p className={'profile-items-text'}>Chiqish</p>
                                </div>
                            </Link>
                        </div> : null
                }
            </div>

            <Modal toggle={toggle2} isOpen={activeN} size={'md'}>
                <ModalHeader>
                    <h2>XABARNOMA</h2>
                </ModalHeader>
                <ModalBody style={{maxHeight: '400px', minHeight: '400px', overflowY: 'scroll'}}>
                    {
                        notificationReducer.notifications.length > 0 ?
                            notificationReducer.notifications.map(item =>
                                <div style={{width: '100%'}}
                                     className={'notification-btn mb-2 '}>
                                    <div>
                                        <p className={'p-0 m-0 notification-text'}>{item.description}</p>
                                    </div>
                                    <div className={'d-flex justify-content-between align-items-center'}>
                                        <p className={'p-0 m-0 notification-date'}>{moment(new Date(item?.createdAt)).format('LLLL')}</p>
                                        <div className={'d-flex gap-2 justify-content-end align-items-center'}>
                                            {
                                                item?.productLifetimes.length > 0 &&
                                                <TableOutlined className={'notification-icon-table'}/>
                                            }
                                            {
                                                !item.read ?
                                                    <MdOutlineFiberNew onClick={() => isRead(item.id)}
                                                                       className={'notification-icon'}/> :
                                                    <BsCheckAll className={'notification-icon2'}/>
                                            }
                                            <DeleteOutlined onClick={() => deleteNotification(item.id)}
                                                            className={'notification-icon3'}/>
                                        </div>
                                    </div>
                                </div>
                            ) : <div className={'text-center'}>
                                <h4>{notificationReducer.message}</h4>
                            </div>

                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={deleteAllNotification}>Tozalash</button>
                    <button className={'btn btn-success'} onClick={toggle2}>Chiqish</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default connect((users, notificationReducer), {
    logOutUser,
    deleteNotification,
    active,
    getNotification,
    getNotificationAll,
    deleteAllNotification,
    isReadNotification
})(MainHeader)
