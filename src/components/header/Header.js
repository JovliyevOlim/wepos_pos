import React, {useEffect} from "react";
import './header.css'
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import arrowDown from "../../img/direction-down 01.svg";
import uzLanguage from "../../img/uzbek.svg";
import rusLanguage from "../../img/russian.svg";
import Logo from "../../img/g14.svg";

function Header({id}) {

    const {t, i18n} = useTranslation();
    const location = useLocation();
    const [langShown, setlangShown] = useState(false)
    const [selectedImg, setselectedImg] = useState(uzLanguage)
    const [selectedLang, setselectedLang] = useState('Uzbek')
    const [selectedLangShort, setselectedLangShort] = useState('Uz')


    const [languagesList, setLanguagesList] = useState([
        {id: 'uz', nameShort: 'Uz', name: 'Uzbek', img: uzLanguage, active: true},
        {id: 'ki', nameShort: 'Кр', name: 'Крилл', img: uzLanguage, active: false},
        {id: 'ru', nameShort: 'Ру', name: 'Русский', img: rusLanguage, active: false},
    ])

    function toggle() {

    }

    function ChangeLanguage(list) {
        languagesList.map((item, val) => {
            if (list.id === item.id) {
                setselectedImg(item.img)
                setselectedLang(item.name)
                setselectedLangShort(item.nameShort)
                i18n.changeLanguage(item.id)
                localStorage.setItem("i18nextLng", item.id)
                item.active = true
            } else {
                item.active = false
            }
        })
        setLanguagesList(languagesList)
        setlangShown(false)
    }



    useEffect(() => {
        const storageLanguage = localStorage.getItem("i18nextLng")
    }, [])

    return (
        <div className={'header__ '}>
            <div className="homebody d-flex col-md-12 align-items-center">
                <div className="col-5">
                    <div className={'d-flex gap-1 align-items-center'}>
                        <img src={Logo} width={50} height={50} alt="logo"/>
                        <h4 style={{fontSize:'32px',margin:0,fontWeight:'600'}}>Miro</h4>
                    </div>
                </div>
                <div className="col-7 d-flex gap-2 gap-lg-4 align-items-stretch justify-content-end">
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
                    {
                        location.pathname === `/shopDetails/${id}` || location.pathname === "/tariffs" ?
                            <Link to={'/login'}>
                                <button className={'header-btn'} onClick={toggle}>{t('Welcome.7')}</button>
                            </Link>
                            : <Link to={'/tariffs'}>
                                <button className={'header-btn'} onClick={toggle}>{t('login.tariffs')}</button>
                            </Link>


                    }
                </div>
            </div>
        </div>

    )
}

export default Header
