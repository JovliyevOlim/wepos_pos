import {connect} from "react-redux";
import './mahsulotlar.css'
import {useEffect, useState} from 'react'
import {active} from "../../../../reducer/functionreducer";
import {NavLink} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import users from "../../../../reducer/users";

function Maxsulotlar({changeLink, link, sidebaractive2, users}) {
    const [classs, setClasss] = useState('');
    const [fill, setfill] = useState('');
    const [fontsiza, setfontsize] = useState('');
    const {t} = useTranslation()

    useEffect(() => {
        if (link !== 'maxsulotlar') {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('mahsulot')
            style.classList.remove('mahsulot2')
        }
    }, [link])

    function toggle() {
        changeLink('maxsulotlar')
        if (classs === '') {
            setClasss('right2')
            setfill('fill')
            setfontsize('fontsize')
            let style = document.getElementById('mahsulot')
            style.classList.add('mahsulot2')
        } else {
            setClasss('')
            setfill('')
            setfontsize('')
            let style = document.getElementById('mahsulot')
            style.classList.remove('mahsulot2')
        }
    }


    function sidebaractive() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1023.9) {
            sidebaractive2()
        }
    }


    return (
        <div className={'row list'} id={'mahsulot'}>
            <div className="imgDiv" onClick={toggle}>
                <div className={'d-flex align-items-center'}>
                    <svg className={`sidebar-img ${fill}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.16992 7.44L11.9999 12.55L20.7699 7.46997" stroke="#3A3C40" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 21.61V12.54" stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path
                            d="M9.9306 2.48L4.59061 5.45003C3.38061 6.12003 2.39062 7.80001 2.39062 9.18001V14.83C2.39062 16.21 3.38061 17.89 4.59061 18.56L9.9306 21.53C11.0706 22.16 12.9406 22.16 14.0806 21.53L19.4206 18.56C20.6306 17.89 21.6206 16.21 21.6206 14.83V9.18001C21.6206 7.80001 20.6306 6.12003 19.4206 5.45003L14.0806 2.48C12.9306 1.84 11.0706 1.84 9.9306 2.48Z"
                            stroke="#3A3C40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.9998 13.24V9.58002L7.50977 4.09998" stroke="#3A3C40" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4 className={`sidebar-text ${fontsiza}`}>{t('Sidebar.9')}</h4>
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
                    users.getProductAdmin || users.getProduct || users.addProduct ?
                        <li onClick={sidebaractive}><NavLink to={'/main/productList'}
                                                             className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar.10')}</NavLink>
                        </li> : ''
                }
                {
                    users.addProduct ? <li onClick={sidebaractive}><NavLink to={'/main/addProduct'}
                                                                            className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar.11')}</NavLink>
                    </li> : ''
                }

                {
                    users.productTypeRoles && <li onClick={sidebaractive}><NavLink to={'/main/productType'}
                                                                                   className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar1.mahsulotturi')}</NavLink>
                    </li>
                }


                {
                    users.addProduct && <li onClick={sidebaractive}><NavLink to={'/main/importProduct'}
                                                                             className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar.12')}</NavLink>
                    </li>
                }


                {
                    users.categoryRoles &&
                    <li onClick={sidebaractive}><NavLink to={'/main/category'}
                                                         className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar.13')}</NavLink>
                    </li>
                }

                {
                    users.brandRoles &&
                    <li onClick={sidebaractive}><NavLink to={'/main/brand'}
                                                         className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar.14')}</NavLink>
                    </li>
                }
                {
                    users.measurementRoles &&
                    <li onClick={sidebaractive}><NavLink to={'/main/measurements'}
                                                         className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>O'lchov
                        birliklari</NavLink>
                    </li>
                }


                {/*{*/}
                {/*    <li onClick={sidebaractive}><NavLink to={'/main/shtrixcode'}*/}
                {/*                                         className={isActive => isActive ? 'active-enter-link li-text' : 'li-text'}>{t('Sidebar1.shtrixcode')}</NavLink>*/}
                {/*    </li>*/}
                {/*}*/}
            </ul>
        </div>
    )
}

export default connect((users), {active})(Maxsulotlar)
