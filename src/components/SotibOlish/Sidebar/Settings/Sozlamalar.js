import {Switch, Link, Route, NavLink} from 'react-router-dom'
import './sozlamalar.css'
import {useState, useEffect} from 'react'
import {connect} from "react-redux";
import {active} from "../../../../reducer/functionreducer";
import {useTranslation} from "react-i18next";
import users from "../../../../reducer/users";

function Sozlamalar({changeLink, link, sidebaractive2, users}) {

    const {t} = useTranslation()
    const [classs, setClasss] = useState('');
    const [fill, setfill] = useState('');
    const [fontsiza, setfontsize] = useState('');

    useEffect(() => {
        if (link !== 'sozlamalar') {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('setting')
            style.classList.remove('seting')
        }
    }, [link])

    function toggle() {
        changeLink('sozlamalar')
        if (classs === '') {
            setClasss('right2')
            setfill('fill')
            setfontsize('fontsize')
            let style = document.getElementById('setting')
            style.classList.add('seting')
        } else {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('setting')
            style.classList.remove('seting')
        }
    }

    function sidebaractive() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1023.9) {
            sidebaractive2()
        }
    }

    return (
        <div className={'row list'} id={'setting'} onClick={toggle}>
            <div className="imgDiv">
                <div className={'d-flex align-items-center'}>

                    <svg className={`sidebar-img ${fill}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path
                            d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
                            stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>

                    <h4 className={`sidebar-text ${fontsiza}`}>{t('Sidebar.40')}</h4>
                </div>

                <svg className={`sidebar-img  ${classs}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.07999"
                          stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </div>

            <ul style={{width: '80%'}}>
                {
                    users.editMyBusiness || users.editInvoice ?
                        <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                                 to={'/main/shopSetting'}>
                            <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.40')}</li>
                        </NavLink>
                        : ''
                }
                {
                    users.addBranch || users.getBranch ?
                        <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                                 to={'/main/branches'}>
                            <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.41')}</li>
                        </NavLink>
                        : ''
                }
            </ul>

        </div>
    )
}

export default connect((users), {active})(Sozlamalar)
