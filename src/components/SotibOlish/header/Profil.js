import './profil.css'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import photoreducer, {savephoto, clearPhotoId, deletePhoto} from "../../../reducer/photoreducer";
import users, {editMyProfile, getSelfInfo} from "../../../reducer/users";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {BaseUrl} from "../../../middleware";
import {toast} from "react-toastify";
import people from "../../../img/person-default.png";
import ModalLoading from "../../ModalLoading";
import {useForm} from "react-hook-form";

import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";

function Profil({savephoto, getSelfInfo, users, photoreducer, clearPhotoId, deletePhoto, editMyProfile}) {


    const {register, setValue, handleSubmit, resetField, formState: {errors}} = useForm()
    const [saveModal, setSaveModal] = useState(false)
    const [photoId, setPhotoId] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isCheck, setIsCheck] = useState(false)


    const {t} = useTranslation()

    const history = useHistory()

    function onSelectImage(e) {
        let form = new FormData()
        form.append("file", e.target.files[0])
        if (photoId) {
            deletePhoto(photoId)
        }
        savephoto(form)
    }

    useEffect(() => {
        if (photoreducer.savePhoto) {
            setPhotoId(photoreducer.photo)
            clearPhotoId()
        }
    }, [photoreducer.current])

    useEffect(() => {
        UpdateUser()
    }, [])

    function UpdateUser() {
        let user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
        setValue('fio', user?.fio)
        setValue('username', user?.username)
        setValue('pinCode', user?.pinCode)
        setPhoneNumber(user?.phoneNumber)
        setPhotoId(user?.photoId)
    }


    useEffect(() => {
        if (users.saveBoolean) {
            getSelfInfo(users.id)
            setIsCheck(false)
            history.push('/main/profil')
        }
        setSaveModal(false)
    }, [users.current])


    function onSubmit(data) {
        if (!phoneNumber) {
            setIsCheck(true)
        } else {
            if (data.password === data.confirmPassword) {
                editMyProfile({
                    ...data, photoId,phoneNumber
                })
                setSaveModal(true)
            } else {
                toast.error('Parollar bir xilligini tekshiring')
            }
        }

    }

    return (

        <div className='containerProfil mt-4 mb-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className={'text-center mt-4'}>Profilni taxrirlash</h5>
                <div className="row mt-3">
                    <div className="col-md-4 d-flex flex-column justify-content-center">
                        <img src={photoId ? `${BaseUrl}/attachment/download/${photoId}` : people}
                             style={{width: "70%", margin: "0 auto", borderRadius: "30%"}}/>
                        <div className={'d-flex justify-content-center mt-2'}>
                            <input type="file" id={'file'} value={''} onChange={onSelectImage}
                                   style={{display: 'none'}}/>
                            <label htmlFor={'file'}>
                                <div type={'button'} className={'btn btn-success'}>Rasm tanlash</div>
                            </label>
                        </div>
                    </div>
                    <div className={'col-md-8 d-flex flex-wrap'}>
                        <div className="col-md-6 p-2">
                            <label htmlFor={'fio'}>F.I.O</label>
                            <input type="text" id={'fio'}
                                   {...register('fio', {required: {value: true, message: 'F.I.O kiriting'}})}
                                   placeholder={"F.I.O"}
                                   defaultValue={''}
                                   className={'form-control'}/>
                            {
                                errors.fio &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.fio.message}</p>
                            }
                        </div>
                        <div className="col-md-6 p-2">
                            <label htmlFor={'username'}>{t('Employ.7')}</label>
                            <input type="text" id={'username'}
                                   {...register('username', {required: {value: true, message: 'Loginni kiriting'}})}
                                   placeholder={'Login'}
                                   className={'form-control'}/>
                            {
                                errors.username &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.username.message}</p>
                            }
                        </div>
                        <div className="col-md-6 p-2">
                            <label htmlFor="phoneNumber">Tel raqam:</label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                className={'form-control'}
                                onChange={setPhoneNumber}/>
                            {isCheck && !phoneNumber && <p
                                className={'text-danger text-center p-0 m-0'}>Telefon raqamni
                                kiriting</p>}
                        </div>
                        <div className="col-md-6 p-2">
                            <label htmlFor={'pinCode'}>PinCode</label>
                            <input type="number"
                                   {...register("pinCode",
                                       {
                                           required: {
                                               value: false,
                                               message: 'Pincode kiriting'
                                           },
                                           minLength: {value: 4, message: '4 ta raqam bo\'lishi kerak'},
                                           maxLength: {value: 4, message: '4 ta raqam bo\'lishi kerak'}
                                       })}
                                   placeholder={"PinCode"}
                                   defaultValue={''}
                                   className={'form-control'} id={'pinCode'}/>
                            {
                                errors.pinCode && errors.pinCode.type === "required" &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.pinCode.message}</p>
                            }
                            {
                                errors.pinCode && errors.pinCode.type === "minLength" &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.pinCode.message}</p>
                            }
                            {
                                errors.pinCode && errors.pinCode.type === "maxLength" &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.pinCode.message}</p>
                            }
                        </div>
                        <div className="col-md-6 p-2">
                            <label htmlFor={'password'}>{t('Employ.16')}</label>
                            <input type="text"
                                   {...register("password",
                                       {
                                           required: {
                                               value: false,
                                               message: 'Parolni kiriting'
                                           },
                                           minLength: {value: 5, message: 'Parol kamida 5ta belgi bo\'lishi kerak'}
                                       })}
                                   placeholder={"Parol"}
                                   defaultValue={''}
                                   className={'form-control'} id={'password'}/>
                            {
                                errors.password && errors.password.type === "required" &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.password.message}</p>
                            }
                            {
                                errors.password && errors.password.type === "minLength" &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.password.message}</p>
                            }
                        </div>
                        <div className="col-md-6 p-2">
                            <label htmlFor={'confirmPassword'}>{t('Employ.16')}</label>
                            <input type="text"
                                   {...register("confirmPassword", {
                                       required: {
                                           value: false,
                                           message: 'Parolni kiriting'
                                       }
                                   })}
                                   placeholder={'Parolni tasdiqlash'}
                                   defaultValue={''}
                                   className={'form-control'} id={'confirmPassword'}/>
                            {
                                errors.confirmPassword &&
                                <p className={'text-danger text-center m-0 p-0'}>{errors.confirmPassword.message}</p>
                            }
                        </div>
                    </div>
                </div>
                <button type={"submit"}
                        className={'btn mt-3 form-control btn-primary btnSaqlash'}>{t('Buttons.6')}</button>
            </form>
            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default connect((users, photoreducer), {
    savephoto,
    editMyProfile,
    getSelfInfo,
    clearPhotoId,
    deletePhoto
})(Profil)
