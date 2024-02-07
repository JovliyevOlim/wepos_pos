import './mainHeader.css'
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {active} from "../../../reducer/functionreducer";
import users, {logOutUser} from "../../../reducer/users";
import {Link, useHistory, useLocation} from "react-router-dom";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import {BaseUrl} from "../../../middleware";
import notificationReducer, {
    getNotification,
    getNotificationAll,
    deleteNotification,
    deleteAllNotification,
    isReadNotification,
} from "../../../reducer/notificationReducer";
import {MdOutlineFiberNew} from "react-icons/md"
import {BsCheckAll} from 'react-icons/bs'
import ModalLoading from "../../ModalLoading";
import moment from "moment";
import 'moment/locale/uz-latn'
import avatar from "../../../img/defaul-user-profile.svg"
import notificationActive from '../../../img/notification-active.svg'
import notification from '../../../img/notification.svg'
import uzLanguage from '../../../img/uz.svg'
import rusLanguage from '../../../img/ru.svg'
import arrowDown from "../../../img/direction-down 01.svg";
import fullScreen from "../../../img/pixel grid-rectangle.svg"
import Icon, {DeleteOutlined} from "@ant-design/icons";
import {BurgerIcon, EditIcon, LogOutIcon, PersonIcon} from "../../Components/svg";
import {changeLanguage} from "i18next";
import {formatDayDashboard} from "../../../util";
import {Button} from "antd";

function MainHeader({
                        deleteNotification,
                        logOutUser,
                        getNotificationAll,
                        notificationReducer,
                        users,
                        getNotification,
                        isReadNotification,
                        deleteAllNotification,
                        setCollapsed,
                        changeScreenFull
                    }) {
    const location = useLocation()
    const history = useHistory()
    const appLang =  localStorage.getItem("miroLang") || "uz"

    useEffect(() => {
        getNotification()
        if (notificationReducer.saveBoolean) {
            getNotificationAll()
        }
    }, [notificationReducer.current, location.pathname])

    const [activeN, setactiveN] = useState(false)
    const [exit, setExit] = useState(false)
    const [langShown, setlangShown] = useState(false)
    const [selectedImg, setselectedImg] = useState( appLang === "ru" ? rusLanguage : uzLanguage)
    const [selectedLang, setselectedLang] = useState(appLang === "ru" ? 'Русский' : appLang === "ki" ? 'Крилл' : 'Uzbek')
    const [selectedLangShort, setselectedLangShort] = useState(appLang === "ru" ? 'Ру' : appLang === "ki" ? 'Кр' : 'Uz')
    const [languagesList, setLanguagesList] = useState([
        {id: 'uz', nameShort: 'Uz', name: 'Uzbek', img: uzLanguage, active: appLang === 'uz'},
        {id: 'ki', nameShort: 'Кр', name: 'Крилл', img: uzLanguage, active: appLang === 'ki'},
        {id: 'ru', nameShort: 'Ру', name: 'Русский', img: rusLanguage, active: appLang === 'ru'},
    ])

    function out() {
        setExit(!exit)
    }

    function toggle2() {
        setactiveN(!activeN)
    }


    const {t, i18n} = useTranslation()


    // window.addEventListener('mouseleave',()=>{
    //     setlangShown(false)
    //     setExit(false)
    // })

    function ChangeLanguage(list) {
        languagesList.map((item, val) => {
            if (list.id === item.id) {
                setselectedImg(item.img)
                setselectedLang(item.name)
                setselectedLangShort(item.nameShort)
                i18n.changeLanguage(item.id)
                localStorage.setItem("i18nextLng", item.id)
                localStorage.setItem("miroLang", item.id)
                item.active = true
            } else {
                item.active = false
            }
        })
        setLanguagesList(languagesList)
        setlangShown(false)
    }


    function isRead(id) {
        isReadNotification(id)
    }


    useEffect(() => {
      const storageLanguage = localStorage.getItem("miroLang")
        i18n.changeLanguage(storageLanguage)
    }, [])


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
        // window.location.reload();
        // history.push('/login')
        out()
    }


    const [saveModal, setSaveModal] = useState(false)


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
                          width: 22,
                          height: 22,
                      }}
                    />
                </div>
              <button onClick={() => history.push('/shopping')} className="savdoOynasiBtn">
                <span>{t("sidebar.shopWindow")}</span>
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
              {/*<div className={'main-header-body'}>*/}
              {/*    <h4 className={'main-header-text'}>Asosiy</h4>*/}
              {/*    <p className={'main-header-this-day'}>Bugun {formatDayDashboard()}</p>*/}
              {/*</div>*/}
            </div>
          <div className={'main-header-right'}>
            <div>
              <div className="drop-down">
                <div className={'wrapper-con'} onClick={() => setlangShown(prevState => !prevState)}>
                  <div className="wrapper">
                    <img className={'lang-logo'} src={selectedImg} alt="country"/>
                    <div className={'selected-lang-text'}>{selectedLang}</div>
                    <div className={'selected-langShort-text'}>{selectedLangShort}</div>
                  </div>
                  <img src={arrowDown} alt="arrow"/>
                </div>
                {
                langShown && <div className="lang-list">
                                {
                                    languagesList.filter(item => item.active === false).map((lang) =>
                                        <div className={'lang-list-items'}>
                                            <div className="lang-list-item" onClick={() => ChangeLanguage(lang)}>
                                                <img className={'lang-logo'} src={lang.img} alt="rus"/>
                                                <div className={'selected-lang-text'}>{lang.name}</div>
                                                <div className={'selected-langShort-text'}>{lang.nameShort}</div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        }

                    </div>
                </div>
                {/*<div>*/}
                {/*    <div className={'main-notification-img'} onClick={changeScreenFull}>*/}
                {/*        <img className={'img-fluid'}*/}
                {/*             src={fullScreen}*/}
                {/*             alt="notification"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
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
                        <h6 className={'main-header-text-fio'}>{users.users?.fio}</h6>
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
                        </div> : ''
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
                                        <div className={'d-flex gap-2 justify-content-between align-items-center'}>
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
            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default  connect((users, notificationReducer), {
    logOutUser,
    deleteNotification,
    active,
    getNotification,
    getNotificationAll,
    deleteAllNotification,
    isReadNotification
})(MainHeader)
