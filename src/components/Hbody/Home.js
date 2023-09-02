import img from '../../img/cuate.png'
import eye from '../../img/eye-slash.png'
import './home.css'
import React, {useState, useEffect, useContext} from "react";
import Header from "../header/Header";
import Bottom from "../Bottom/Bottom";
import {useHistory} from 'react-router-dom'
import {connect} from "react-redux";
import {active} from "../../reducer/functionreducer";
import users, {saveusers, changeerror,rememberMe,login} from "../../reducer/users";
import axios from "axios";
import {BaseUrl} from "../../middleware";
import {useTranslation} from "react-i18next";



function Home({saveusers, users, changeerror,rememberMe}) {


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
            checked:e.target.checked
        })
    }

    const [typeinput, Settype] = useState('password')
    const [placeholderp, Setplaceholderp] = useState('password')
    const [placeholderl, Setplaceholderl] = useState('login')

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
            saveusers(res.data)
        }).catch(function (err) {
            console.log(err)
            saveusers({...err.response.data})
        })
    }



    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
        let tokenname = localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')
        console.log(user,tokenname)
        if (user && tokenname){
            saveusers({
                object:user,
                message: tokenname,
                success: true
            })
            history.push('/main/dashboard')
        }
    }, [])





    return (

        <div>
            <div id={'home'}>
                <div>

                    <Header/>

                </div>
                <div className={'home-body'}>
                    <div className="homeContainer">
                        <div className={"home-img"}>
                            <div className="imgContainer">
                                <img src={img} alt="img"/>
                            </div>
                            {/*<div className="home-text">*/}
                            {/*    <h4 className={'welcome'}>*/}
                            {/*        {t('Welcome.1')}*/}
                            {/*    </h4>*/}
                            {/*    <p className={'p'}>*/}
                            {/*        {t('Welcome.2')}*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                        <div className="home-enter">
                            <div className="kirish-text">
                                <h5>{t('Welcome.3')}</h5>
                                <p className={'p'}>
                                    {t('Welcome.4')}
                                </p>




                            </div>
                            <div className={`kirish-input`}>
                                <input onChange={login} value={inputlogin} type="text" className={'form-control login'}
                                       placeholder={placeholderl}/>
                                <div className={'input'}>
                                    <input onChange={parol} value={inputparol} type={typeinput}
                                           className={'form-control pasword'}
                                           placeholder={placeholderp}/>
                                    <img onClick={changetypeinput} src={eye} alt=""/>
                                </div>
                                {
                                    users.error ? <span className={'error'}>{t('Welcome.5')} !</span> : ''
                                }
                                <div className="kirish-checkbox">
                                    <input onChange={changechecked} checked={users.rememberme} type="checkbox" id={'check'}/>
                                    <label htmlFor={'check'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <title>ionicons-v5-l</title>
                                            <path
                                                d="M400,48H112a64.07,64.07,0,0,0-64,64V400a64.07,64.07,0,0,0,64,64H400a64.07,64.07,0,0,0,64-64V112A64.07,64.07,0,0,0,400,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/>
                                        </svg>
                                    </label>
                                    <div className="login">
                                        <label style={{cursor: 'pointer', color: 'gray'}} htmlFor={'check'}>Meni eslab
                                            qol</label>
                                        <a href="">{t('Welcome.6')}</a>
                                    </div>

                                </div>
                                <button onClick={testusers} disabled={disabled}
                                        className={'btn mb-2 btn-primary form-control kirish'}>{t('Welcome.7')}
                                </button>
                                {/*<Link to={'/register'} className={'registrBtn'} >{t('Welcome.8')}</Link>*/}
                            </div>

                        </div>
                    </div>
                </div>
                <div className={'mt-5'}>
                    <Bottom/>
                </div>
            </div>
        </div>
    )
}

export default connect((users), {saveusers, active, changeerror,rememberMe,login})(Home)
