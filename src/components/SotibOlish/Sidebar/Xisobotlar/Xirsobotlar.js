import './xisobotlar.css'
import {useState, useEffect} from 'react'
import {Switch, Link, Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {active} from "../../../../reducer/functionreducer";
import {useTranslation} from "react-i18next";

function Xirsobotlar({sidebaractive2, changeLink, link}) {

    const {t} = useTranslation()
    const [classs, setClasss] = useState('');
    const [fill, setfill] = useState('');
    const [fontsiza, setfontsize] = useState('');

    useEffect(() => {
        if (link !== 'xisobot') {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('xisobot')
            style.classList.remove('xisbot')
        }
    }, [link])

    function toggle() {
        changeLink('xisobot')
        if (classs === '') {
            setClasss('right2')
            setfill('fill')
            setfontsize('fontsize')
            let style = document.getElementById('xisobot')
            style.classList.add('xisbot')
        } else {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('xisobot')
            style.classList.remove('xisbot')
        }
    }

    function sidebaractive() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1023.9) {
            sidebaractive2()
        }
    }

    return (
        <div className={'row list'} id={"xisobot"}>
            <div className=" imgDiv" onClick={toggle}>
                <div className={'d-flex align-items-center'}>

                    <svg className={`sidebar-img ${fill}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.88086 18.15V16.08" stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 18.15V14.01" stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17.1191 18.15V11.93" stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17.1209 5.85001L16.6609 6.39001C14.1109 9.37001 10.6909 11.48 6.88086 12.43"
                              stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M14.1895 5.85001H17.1195V8.77001" stroke="#3A3C40" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                              stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4 className={`sidebar-text ${fontsiza}`}>{t('Sidebar.29')}</h4>
                </div>

                <svg className={`sidebar-img  ${classs}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.07999"
                          stroke="#3A3C40" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </div>

            <ul>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/purchasesReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.31')}</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/customersReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.32')}</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/suppliersReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>Ta'minotchilar xisoboti</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/tradesReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.34')}</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/productsReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.35')}</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/remainProductReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>{t('Sidebar.38')}</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/usersReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>Xodimlar Nazorati</li>
                </NavLink>
                <NavLink className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}
                         to={'/main/lostProductsReport'}>
                    <li className={'li-text'} onClick={sidebaractive}>Yo'qotilgan maxsulotlar</li>
                </NavLink>
            </ul>

        </div>
    )
}

export default connect(({functionreducer: {func}}) => ({func}), {active})(Xirsobotlar)
