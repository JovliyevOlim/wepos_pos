import img from '../../img/animation_lma7k2rb.mp4'
import person from '../../img/user.svg'
import password from '../../img/lock 01.svg'
import './home.css'
import React, {useState, useEffect, useContext} from "react";
import Header from "../header/Header";
import {useHistory} from 'react-router-dom'
import {connect} from "react-redux";
import {active} from "../../reducer/functionreducer";
import users, {saveusers, changeerror, rememberMe, login} from "../../reducer/users";
import axios from "axios";
import {BaseUrl} from "../../middleware";
import {useTranslation} from "react-i18next";


function Home({saveusers, users, changeerror, rememberMe}) {


    const [inputlogin, setLogin] = useState('')
    const [inputparol, setparol] = useState('')
    const [disabled, setdisabled] = useState(false)
    const history = useHistory()
    const {t, i18n} = useTranslation();

    function login(event) {
        setLogin(event.target.value)
        changeerror()

    }

    function parol(event) {
        setparol(event.target.value)
        changeerror()
    }

    function changechecked(e) {
        rememberMe({
            checked: e.target.checked
        })
    }

    const [typeinput, Settype] = useState('password')

    function changetypeinput() {
        if (typeinput === 'text') {
            Settype('password')
        } else {
            Settype('text')
        }
    }

    function testusers() {
        axios({
            method: 'post',
            url: `${BaseUrl}/auth/login`,
            data: {
                username: inputlogin,
                password: inputparol
            }
        }).then(function (res) {
            saveusers(res?.data)
        }).catch(function (err) {
            console.log(err)
            saveusers({...err?.response?.data})
        })
    }


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
        let tokenname = localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')
        console.log(user, tokenname)
        if (user && tokenname) {
            saveusers({
                object: user,
                message: tokenname,
                success: true
            })
            history.push('/main/dashboard')
        }
    }, [])


    return (

        <div>
            <div id={'home'}>
                <Header/>
                <div className={'home-body'}>
                    <div className="col-md-12 d-flex justify-content-center justify-content-lg-between align-items-center">
                        <div className="d-none d-lg-flex justify-content-lg-center col-md-6">
                            <video className={'home-video'} loop muted autoPlay={'autoPlay'}>
                                <source src={img} type="video/mp4"/>
                            </video>
                        </div>
                        <div className="col-12  col-md-6 d-flex justify-content-center align-items-center flex-column">
                            <div className="kirish">
                                <div className="kirish-text">
                                    <h5>{t('login.welcome')}</h5>
                                    <p className={'p'}>
                                        {t('login.please')}
                                    </p>
                                </div>
                                <div className="kirish-inputs">
                                    <div className={`kirish-input`}>
                                        <div className={'kirish-label'}>
                                            <label className={'kirish-label-text'}
                                                   htmlFor="login">{t('login.login')} <small>*</small></label>
                                        </div>
                                        <div className={'kirish-input-items'}>
                                            <input onChange={login} id='login' value={inputlogin} type="text"
                                                   placeholder={t('login.login')}/>
                                            <img src={person} alt="person"/>
                                        </div>
                                    </div>
                                    <div className={`kirish-input`}>
                                        <div className={'kirish-label'}>
                                            <label className={'kirish-label-text'} htmlFor="password">{t('login.password')} <small>*</small></label>
                                        </div>
                                        <div className={'kirish-input-items'}>
                                            <input onChange={parol} id={'password'} value={inputparol} type={typeinput}
                                                   placeholder={t('login.password')}/>
                                            <img src={password} onClick={changetypeinput} alt="password"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="kirish-checkbox">
                                    <input onChange={changechecked} checked={users.rememberme} type="checkbox"
                                           id={'check'}/>
                                    <label htmlFor={'check'} className={'check-label'}>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <title>ionicons-v5-l</title>
                                                <path
                                                    d="M400,48H112a64.07,64.07,0,0,0-64,64V400a64.07,64.07,0,0,0,64,64H400a64.07,64.07,0,0,0,64-64V112A64.07,64.07,0,0,0,400,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/>
                                            </svg>
                                    </label>
                                    <div className="kirish-checkbox-text">
                                        <label  htmlFor={'check'}>{t('login.remember')}</label>
                                    </div>
                                </div>
                                <button onClick={testusers} disabled={disabled}
                                        className={'kirish-button'}>{t('login.enter')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className={'mt-5'}>*/}
                {/*    <Bottom/>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default connect((users), {saveusers, active, changeerror, rememberMe, login})(Home)
