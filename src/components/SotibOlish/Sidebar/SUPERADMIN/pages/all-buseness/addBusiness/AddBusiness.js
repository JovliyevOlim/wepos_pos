import React, {useEffect, useState} from 'react'
import './addbusiness.css'
import allbusinessreducer, {
    editBusiness,
    getAllBusiness,
    getOneBusiness,
    saveBusiness,checkBusiness,checkUser
} from "../../../reducers/allbusinessreducer";
import {connect} from "react-redux";
import users from "../../../../../../../reducer/users";
import tariffReducer, {getTariffChoose} from "../../../../../../../reducer/tariffReducer";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

function AddBusiness({
                         saveBusiness,
                         allbusinessreducer,
                         getTariffChoose, getOneBusiness,
                         tariffReducer,
                         editBusiness,checkBusiness,checkUser,
                         match
                     }) {

    const {register, setValue, handleSubmit, resetField, formState: {errors}} = useForm()
    const history = useHistory()

    useEffect(() => {
        if (match.params.id) {
            getOneBusiness(match.params.id)
        } else {
            getTariffChoose()
        }
    }, [])

    useEffect(() => {
        if (match.params.id) {
            edit()
        }
    }, [allbusinessreducer.onebusiness])

    function edit() {
        if (allbusinessreducer.onebusiness) {
            const {description, name} = allbusinessreducer.onebusiness
            setValue('description', description)
            setValue('name', name)
        }
    }

    function checkBusinessName(e) {
        checkBusiness({
            checkName: e.target.value
        })
    }
    function checkUserName(e) {
        checkUser({
            checkName: e.target.value
        })
    }
    function onSubmit(data) {
        if (match.params.id) {
            editBusiness({
                id: match.params.id,
                description: data.description,
                name: data.name,
            })
        } else {
            save(data)
        }
    }


    function save(data) {
        if (data.password !== data.confirmPassword || data.confirmPassword === '' && data.password === '') {
            toast.error('Parollarni tekshiring')
        } else {
            saveBusiness({
                name: data.name,
                tariffId: data.tariffId,
                userRegDto: {
                    fio:data.fio,
                    username: data.username,
                    password: data.password,
                    phoneNumber: data.phoneNumber
                }
            })
        }
    }


    useEffect(() => {
        if (allbusinessreducer.addBusinessSuccess) {
            history.push('/main/superadmin/allbusenesses')
        }
    }, [allbusinessreducer.current])

    return (
        <div className='containersSuperAdmin'>
            <div className="header123">
                <h4 className=''>Add new Business </h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6  col-sm-12 mb-4">
                            <h6>Biznes nomi (do'kon nomi):*</h6>
                            <input {...register('name', {required: true,
                                onChange:(e)=> {
                                    checkBusinessName(e)
                                }})}
                                   placeholder={errors.name ? errors.name?.type === "required" && "Biznes nomini kiriting" : 'Biznes nomi'}
                                   type="text"
                                   className='form-control'/>
                            {allbusinessreducer.existBusiness ? <p className={'text-danger p-0 m-0 text-center'}>Bu nom foydalanilgan</p>:''}
                        </div>
                        <div className="col-md-6 col-sm-12 mb-4">
                            <h6>Qisqa eslatma</h6>
                            <input type="text" {...register('description', {required: true})}
                                   placeholder={errors.description ? errors.description?.type === "required" && "Eslatma nomini kiriting" : 'Eslatma nomi'}
                                   className='form-control'/>
                        </div>
                    </div>
                    {
                        !match.params.id ?
                            <>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12  mb-4">
                                        <h6>Login ( username ):</h6>
                                        <input{...register('username', {required: true,
                                            onChange:(e)=> {
                                                checkUserName(e)
                                            }})}
                                              placeholder={errors.username ? errors.username?.type === "required" && "Login kiriting" : 'Login nomi'}
                                              className='form-control'/>
                                        {allbusinessreducer.existUser ? <p className={'text-danger p-0 m-0 text-center'}>Bu nom foydalanilgan</p>:''}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-4">
                                        <h6>F.I.O:</h6>
                                        <input type="text" {...register('fio', {required: true})}
                                               placeholder={errors.fio ? errors.fio?.type === "required" && "F.I.O kiriting" : 'F.I.O'}
                                               className='form-control'/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-4">
                                        <h6>Tariff:</h6>
                                        {
                                            tariffReducer.tariffchoose.length > 0 ?
                                                <select name="" id="" {...register('tariffId', {required: true})}
                                                        className='form-control'>
                                                    <option value="ad">Tanlang</option>
                                                    {
                                                        tariffReducer.tariffchoose.map((item, index) => <option value={item.id}>{item.name}</option>)
                                                    }
                                                </select>: <div>
                                                    <h4 className={'text-center text-danger'}>{tariffReducer.message}</h4>
                                                </div>
                                        }

                                    </div>
                                    <div className="col-md-6 col-sm-12  mb-4">
                                        <h6>Telefon raqam:</h6>
                                        <input type="text" {...register('phoneNumber', {required: true})}
                                               placeholder={errors.lastName ? errors.lastName?.type === "required" && "Telefon raqamni kiriting" : 'Telefon raqam'}
                                               className='form-control'/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6  col-sm-12 mb-4">
                                        <h6>Parol:</h6>
                                        <input type="text" {...register('password', {required: true,minLength:{value:5}})}
                                               placeholder={errors.password ? errors.password?.type === "required" && "Parol kiriting" : 'Parol'}
                                               className='form-control'/>
                                        {
                                            errors.password && errors.password.type === "minLength"
                                                ?  <p className={'text-danger p-0 m-0 text-center'}>Parol kamida 5 belgidan iborat bo'lishi kerak</p>:''
                                        }
                                    </div>
                                    <div className="col-md-6  col-sm-12 mb-4">
                                        <h6>Parolni Tasdiqlash:</h6>
                                        <input type="text" {...register('confirmPassword', {required: true})}
                                               placeholder={errors.confirmPassword ? errors.confirmPassword?.type === "required" && "Parol kiriting" : 'Parolni tasdiqlash'}
                                               className='form-control'/>
                                    </div>
                                </div>
                            </> : ''
                    }

                    <button type={'submit'} className='btn form-control btn-success '>Saqlash</button>

                </div>

            </form>
        </div>
    )
}

export default connect((allbusinessreducer, users, tariffReducer), {
    editBusiness,
    getOneBusiness,
    getAllBusiness,
    saveBusiness,
    getTariffChoose,
    checkBusiness,checkUser
})(AddBusiness)

