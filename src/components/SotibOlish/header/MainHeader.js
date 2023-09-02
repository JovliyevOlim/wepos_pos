import './mainHeader.css'
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {active} from "../../../reducer/functionreducer";
import users, {logOutUser} from "../../../reducer/users";
import {Link,useLocation} from "react-router-dom";
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import avatar from "../../../img/Ellipse 48.svg"
import Icon from "@ant-design/icons";
import {EditIcon, LogOutIcon, PersonIcon} from "../../Svg/svg";
function MainHeader({
                    deleteNotification,
                    logOutUser,
                    getNotificationAll,
                    active,
                    sidebarfunc,
                    notificationReducer,
                    users,
                    getNotification,
                    isReadNotification,
                    deleteAllNotification
                }) {
    const location = useLocation()

    useEffect(() => {
        getNotification()
        if (notificationReducer.saveBoolean){
            getNotificationAll()
        }
    }, [notificationReducer.current,location.pathname])

    const [activeN, setactiveN] = useState(false)
    const [activeN2, setactiveN2] = useState(false)
    const [exit, setExit] = useState(false)



    function out() {
        setExit(!exit)
    }

    function toggle2() {
        setactiveN(!activeN)
    }

    function toggle3() {
        setactiveN2(!activeN2)
    }

    function sidebar() {
        active(false)
        sidebarfunc()
    }


    const {t, i18n} = useTranslation()

    function ChangeLanguage(e) {
        setLang(e.target.value)
        i18n.changeLanguage(e.target.value)
    }

    const [lang, setLang] = useState()

    function isRead(id) {
        isReadNotification(id)
    }

    function deleteNotificationById(id) {
        deleteNotification(id)
    }

    useEffect(() => {
        const storageLanguage = localStorage.getItem("i18nextLng")
        setLang(storageLanguage)
    }, [])


    function openNotification(){
        setactiveN(true)
        getNotificationAll()
    }

    function DeleteAll() {
        deleteNotification()
    }

    function closeModal() {
        toggle3()
        toggle2()
    }

    function logOut() {
        localStorage.clear();
        sessionStorage.clear();
        logOutUser()
        // window.location.reload();
        // history.push('/login')
        out()
    }


    const [saveModal, setSaveModal] = useState(false)


    return (
        <div className={'main-header'}>
            <div className={'main-header-left'}>
                <div className={'main-header-img'} onClick={out}>
                    <img className={'img-fluid'} src={users.users?.photoId ? `${BaseUrl}/attachment/download/${users.users?.photoId}`: avatar} alt="avatar"/>
                </div>
                <div className={'main-header-text'}>
                    <p className={'main-header-text-login'}>{users.users?.username}</p>
                     <h6 className={'main-header-text-fio'}>{users.users?.fio}</h6>
                </div>
            </div>
            <div className={'main-header-right'}>
                <div></div>
                {/*<div onClick={openNotification} className="notificBox">*/}
                {/*    <img src={imgNot} className={'im3'} alt=""/>*/}

                {/*    {*/}
                {/*        notificationReducer.notificationCount > 0 &&*/}
                {/*        <div className="notificatNum">*/}
                {/*            <p>{notificationReducer.notificationCount}</p>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
            <div className="main-header-profile">
                {
                    exit ?
                        <div className={'profile-menu'}>
                            <Link to={`/main/profil`}>
                                <div onClick={out} className={'profile-items'}>
                                    <Icon component={PersonIcon} />
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
                                <div  style={{width: '100%'}}
                                        className={'notification-btn mb-2 '}>
                                    <div>
                                        <p className={'p-0 m-0 notification-text'}>{item.description}</p>
                                    </div>
                                    <div className={'d-flex justify-content-between align-items-center'}>
                                        <p className={'p-0 m-0 notification-date'}>{moment(new Date(item?.createdAt)).format('LLLL')}</p>
                                        <div className={'d-flex gap-2 justify-content-between align-items-center'}>
                                            {
                                                !item.read ?
                                                    <MdOutlineFiberNew onClick={()=>isRead(item.id)} className={'notification-icon'}/> :
                                                    <BsCheckAll className={'notification-icon2'}/>
                                            }
                                            <DeleteForeverIcon onClick={()=>deleteNotification(item.id)} className={'notification-icon3'}/>
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

export default connect((users, notificationReducer), {
    logOutUser,
    deleteNotification,
    active,
    getNotification,
    getNotificationAll,
    deleteAllNotification,
    isReadNotification
})(MainHeader)
