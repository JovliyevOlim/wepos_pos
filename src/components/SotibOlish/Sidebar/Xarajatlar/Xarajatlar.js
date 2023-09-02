import {Switch, Link, Route, NavLink} from 'react-router-dom'
import './xarajatlar.css'
import {useState, useEffect} from 'react'
import {connect} from "react-redux";
import {active} from "../../../../reducer/functionreducer";
import {useTranslation} from "react-i18next";
import users from "../../../../reducer/users";

function Xarajatlar({changeLink, link, sidebaractive2, users}) {

    const {t} = useTranslation()
    const [classs, setClasss] = useState('');
    const [fill, setfill] = useState('');
    const [fontsiza, setfontsize] = useState('');


    useEffect(() => {
        if (link !== 'xarajatlar') {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('xarajat')
            style.classList.remove('xarajat')
        }
    }, [link])

    function toggle() {
        changeLink('xarajatlar')
        if (classs === '') {
            setClasss('right2')
            setfill('fill')
            setfontsize('fontsize')
            let style = document.getElementById('xarajat')
            style.classList.add('xarajat')
        } else {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('xarajat')
            style.classList.remove('xarajat')
        }
    }

    function sidebaractive() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1023.9) {
            sidebaractive2()
        }
    }

    return (
        <div className={'row list'} id={'xarajat'}>
            <div className="imgDiv" onClick={toggle}>
                <div className={'d-flex align-items-center'}>

                    <svg className={`sidebar-img ${fill}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8.5H14.5" stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 16.5H8" stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 16.5H14.5" stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
                            stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 9.5V3.5L22 5.5" stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M20 3.5L18 5.5" stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <h4 className={`sidebar-text ${fontsiza}`}>{t('Sidebar.25')}</h4>
                </div>
                <svg className={`sidebar-img  ${classs}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.07999"
                          stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </div>

            <ul>
                {
                    users.addOutlay || users.getOutlay || users.getOutlayAdmin ?
                        <li onClick={sidebaractive}><NavLink
                            className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                            to={'/main/outlayList'}>{t('Sidebar.26')}</NavLink></li>
                        : ''
                }
                {
                    users.addOutlay ?
                        <li onClick={sidebaractive}><NavLink
                            className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                            to={'/main/addOutlay'}>{t('Sidebar.27')}</NavLink></li>
                        : ''
                }
                {
                    users.addOutlay || users.getOutlay ?
                        <li onClick={sidebaractive}><NavLink
                            className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                            to={'/main/outlayCategoryList'}>{t('Sidebar.28')}</NavLink></li>:''
                }



            </ul>

        </div>
    )
}

export default connect((users), {active})(Xarajatlar)
