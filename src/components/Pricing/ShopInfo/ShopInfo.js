import React, {useEffect, useState} from 'react';
import './shopinfo.css'
import Header from "../../header/Header";
import Main from "../mainPAge/Main";
import {Link, useHistory} from 'react-router-dom'
import Bottom from "../../Bottom/Bottom";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import allbusinessreducer, {
    checkBusiness, checkUser,
    saveBusiness
} from "../../SotibOlish/Sidebar/SUPERADMIN/reducers/allbusinessreducer";
import {toast} from "react-toastify";

function ShopInfo({
                      allbusinessreducer,
                      checkBusiness,
                      checkUser,
                      saveBusiness,
                      match
                  }) {


    const {register, setValue, handleSubmit, resetField, formState: {errors}} = useForm()


    const [number, setNumber] = useState(1)

    function changeNumberPlus() {
        setNumber(prevState => prevState + 1)
    }

    function changeNumberMinus() {
        setNumber(prevState => prevState - 1)
    }

    function checkBusinessName(e) {
        if (e.target.value){
            checkBusiness({
                checkName: e.target.value
            })
        }
    }

    function checkUserName(e) {
        if (e.target.value){
            checkUser({
                checkName: e.target.value
            })
        }
    }

    const history = useHistory();

    useEffect(() => {
        if (allbusinessreducer.addBusinessSuccess) {
            history.push('/login')
        }
    }, [allbusinessreducer.current])

    function onSubmit(data) {
        if (data.password !== data.confirmPassword || data.confirmPassword === '' && data.password === '') {
            toast.error('Parollarni tekshiring')
        } else {
            saveBusiness({
                name: data.name,
                description: data.description,
                tariffId: match.params.tariffId,
                userRegDto: {
                    fio: data.fio,
                    username: data.username,
                    password: data.password,
                    phoneNumber: data.phoneNumber
                }
            })
        }
    }

    return (
        <>
            <Header id={match.params.tariffId}/>
            <Main number={number} setNumber={setNumber}/>
            <div className={'container mt-5 mb-5'}>
                <form onSubmit={handleSubmit(onSubmit)} className={'shopinfo-form'}>
                    <div className="col-sm-12 col-md-6">
                        <input {...register('name', {
                            required: true, onChange: (e) => {
                                checkBusinessName(e)
                            }
                        })}
                               className={`shopinfo-input`}
                               placeholder={errors.name ? errors.name?.type === "required" && "Biznes nomini kiriting" : 'Biznes nomi'}
                        />
                        {allbusinessreducer.existBusiness ?
                            <p className={'text-danger p-0 m-0 text-center'}>Bu nom foydalanilgan</p> : ''}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input {...register('fio', {required: true})}
                               className={`shopinfo-input`}
                               placeholder={errors.fio ? errors.fio?.type === "required" && "F.I.O kiriting" : 'F.I.O'}
                        />

                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input {...register('username', {
                            required: true, onChange: (e) => {
                                checkUserName(e)
                            }
                        })}
                               className={`shopinfo-input`}
                               placeholder={errors.username ? errors.username?.type === "required" && "Login kiriting" : 'Login'}
                        />
                        {allbusinessreducer.existUser ?
                            <p className={'text-danger p-0 m-0 text-center'}>Bu nom foydalanilgan</p> : ''}
                    </div>
                    <div className={'col-sm-12 col-md-6'}>
                        <input type={'number'} {...register('phoneNumber', {required: true})}
                               className={`shopinfo-input`}
                               placeholder={errors.phoneNumber ? errors.phoneNumber?.type === "required" && "Telefon raqamni kiritiing" : 'Telefon raqam'}
                        />
                    </div>
                    <div className={'col-sm-12 col-md-6'}>
                        <input  {...register('password', {required: true, minLength: {value: 5}})}
                                className={`shopinfo-input`}
                                placeholder={errors.password ? errors.password?.type === "required" && "Parolni kiriting" : 'Parol'}
                        />
                        {
                            errors.password && errors.password.type === "minLength"
                                ?
                                <p className={'text-danger p-0 m-0 text-center'}>Parol kamida 5 belgidan iborat bo'lishi
                                    kerak</p> : ''
                        }
                    </div>
                    <div className={'col-sm-12 col-md-6'}>
                        <input  {...register('confirmPassword', {required: true})}
                                className={`shopinfo-input`}
                                placeholder={errors.confirmPassword ? errors.confirmPassword?.type === "required" && "Tasdiqlash paroli kiritiing" : 'Parolni tasdiqlash'}
                        />
                    </div>


                    <div className={'col-md-12 col-sm-12 d-flex justify-content-end'}>

                        <Link to={'/tariffs'}>
                            <button className={'btn-logo-add m-1 btn-logo-back'}>
                                Ortga
                            </button>
                        </Link>
                        <button type={'submit'} className={'btn-logo-add btn-logo-continue m-1'}>
                            Davom etish
                        </button>


                    </div>
                </form>
            </div>
            <Bottom/>
        </>
    );
}

export default connect((allbusinessreducer), {
    checkBusiness,
    saveBusiness,
    checkUser
})(ShopInfo);
