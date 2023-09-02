import React, {useEffect} from "react";
import Logo from '../../img/Artboard 3@2x.png'
import './header.css'
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";

function Header({id}) {

    const {t, i18n} = useTranslation();
    const location = useLocation();

    function toggle() {

    }

    function ChangeLanguage(e) {
        setLang(e.target.value)
        i18n.changeLanguage(e.target.value)
    }

    const [lang, setLang] = useState()


    useEffect(() => {
        const storageLanguage = localStorage.getItem("i18nextLng")
        setLang(storageLanguage)
    }, [])

    return (
        <div className={'header__ '}>
            <div className="homebody">
                <div className="image__ ">
                    <img src={Logo} alt=""/>
                </div>
                <div className="header-narx">
                    {
                         location.pathname === `/shopDetails/${id}` || location.pathname === "/tariffs" ?'':
                        <Link to={'/tariffs'}>{t('Welcome.15')}</Link>

                    }
                    {
                        location.pathname === `/shopDetails/${id}` ||  location.pathname === "/tariffs" ?
                            <Link to={'/login'}>
                                <button className={'header-btn'} onClick={toggle}>{t('Welcome.7')}</button>
                            </Link>
                            : <Link to={'/tariffs'}>
                                <button className={'header-btn'} onClick={toggle}>{t('Welcome.16')}</button>
                            </Link>


                    }
                </div>

            </div>
        </div>

    )
}

export default Header
