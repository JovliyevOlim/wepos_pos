import React, {useEffect} from "react";
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
                    <h2>CORONA</h2>
                </div>
                <div className="header-narx">
                    {
                        location.pathname === `/shopDetails/${id}` ||  location.pathname === "/tariffs" ?
                            <Link to={'/login'}>
                                <button className={'header-btn'} onClick={toggle}>{t('Welcome.7')}</button>
                            </Link>
                            : <Link to={'/tariffs'}>
                                <button className={'header-btn'} onClick={toggle}>Tarifflar</button>
                            </Link>


                    }
                </div>

            </div>
        </div>

    )
}

export default Header
