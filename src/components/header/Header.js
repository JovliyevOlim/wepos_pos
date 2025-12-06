import './header.css'
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import uzLanguage from "../../img/uz.svg";
import rusLanguage from "../../img/ru.svg";
import Logo from "../../img/wepos_logo.png";
import {Select} from "antd";
import useWindowWidth from "../Components/useWindowWidth";

function Header({id}) {
    const widthWidth = useWindowWidth()
    const appLang =  localStorage.getItem("miroLang") || "uz"
    const [lang, setLang] = useState(appLang)
    const {i18n} = useTranslation();

    function ChangeLanguage(e) {
        setLang(e)
        localStorage.setItem("appLang", e)
        i18n.changeLanguage(e)
    }

    return (
        <div className={'header__ '}>
            <div className="homebody d-flex col-md-12 align-items-center">
                <div className="col-5">
                    <div className={'d-flex gap-1 align-items-center'}>
                        <img src={Logo} width={150} height={60} alt="logo"/>
                    </div>
                </div>
                <div className="col-7 d-flex gap-2 gap-lg-4 align-items-center justify-content-end">
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
                                      widthWidth >= 768 ?  <>
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
                    {/*{*/}
                    {/*    location.pathname === `/shopDetails/${id}` || location.pathname === "/tariffs" ?*/}
                    {/*        <Link to={'/login'}>*/}
                    {/*            <button className={'header-btn'} onClick={toggle}>{t('Welcome.7')}</button>*/}
                    {/*        </Link>*/}
                    {/*        : <Link to={'/tariffs'}>*/}
                    {/*            <button className={'header-btn'} onClick={toggle}>{t('login.tariffs')}</button>*/}
                    {/*        </Link>*/}


                    {/*}*/}
                </div>
            </div>
        </div>

    )
}

export default Header
