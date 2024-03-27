import './taxrir.css'
import {useForm} from 'react-hook-form'
import {useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import LavozimReducer, {getLavozim} from "../../reducer/LavozimReducer";
import XodimReducer, {saveXodim, getXodim, editXodim, getXodimID} from "../../reducer/XodimReducer";
import users from "../../../../../../reducer/users";
import branchreducer, {getbranch} from "../../../../../../reducer/branchreducer";
import photoreducer, {savephoto, clearPhotoId, deletePhoto} from "../../../../../../reducer/photoreducer";
import Select from "react-select";
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import {useTranslation} from "react-i18next";
import ModalLoading from "../../../../../ModalLoading";
import people from '../../../../../../img/person.png'
import {BaseUrl} from "../../../../../../middleware";
import {toast} from "react-toastify";
import CardBody from "../../../../../Components/CardBody";

function Taxrirlash({
                        getLavozim,
                        saveXodim,
                        LavozimReducer,
                        getXodimID,
                        XodimReducer,
                        users,
                        match,
                        editXodim,
                        getbranch,
                        branchreducer,
                        savephoto,
                        photoreducer,
                        clearPhotoId,
                        deletePhoto
                    }) {

    useEffect(() => {
        getLavozim(users.businessId)
        getbranch(users.businessId)
        if (match.params.id) {
            getXodimID(match.params.id)
        }
    }, [])

    const {t} = useTranslation()
    const [input, setInput] = useState(
        {
            branchid: [],
            selectvalue: [],
        }
    );
    const history = useHistory()
    const [photoId, setPhotoId] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const {register, setValue, handleSubmit, resetField, formState: {errors}} = useForm()


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

    function editx() {
        setValue('username', XodimReducer.oneXodim?.username);
        setValue('fio', XodimReducer.oneXodim?.fio);
        setValue('roleId', XodimReducer.oneXodim?.roleId);
        setPhoneNumber(XodimReducer.oneXodim?.phoneNumber)
        setPhotoId(XodimReducer.oneXodim?.photoId)
        input.selectvalue = XodimReducer.oneXodim.branches?.map(({
                                                                     name: label,
                                                                     id: value, ...rest
                                                                 }) => ({label, value, ...rest}));

        let ids = []
        XodimReducer.oneXodim?.branches?.map(item => {
            ids.push(item.id,)
        })
        input.branchid = ids
        let a = {...input}
        setInput(a)
    }

    function saqla(data) {
        saveXodim(
            {
                ...data,
                branches: input.branchid,
                businessId: users.businessId,
                photoId: photoId,
                phoneNumber: phoneNumber,

            }
        )
    }
    function saveEdit(data) {
        editXodim({
            ...data,
            branches: input.branchid,
            phoneNumber: phoneNumber,
            id: match.params.id,
            businessId: users.businessId,
            photoId: photoId,
        })
    }
    function changeselect(e) {
        input.selectvalue = e
        input.branchid = []
        e.map(item => {
            let b = input.branchid
            b.push(item.value)
        })
        let a = {...input}
        setInput(a)
        setIsCheck(false)
    }

    useEffect(() => {
        if (match.params.id) {
            editx()
        }
    }, [XodimReducer.oneXodim])


    const [saveModal, setSaveModal] = useState(false)

    useEffect(() => {
        if (XodimReducer.saveUserBool) {
            history.push('/main/user')
        }
        setSaveModal(false)
    }, [XodimReducer.current])

    function onSubmit(data) {
        console.log(phoneNumber, input.branchid?.length)
        if (!phoneNumber || input.branchid?.length === 0) {
            setIsCheck(true)
        } else {
            if (data.password === data.confirmPassword) {
                if (match.params.id) {
                    saveEdit(data)
                } else {
                    saqla(data)
                }
                setSaveModal(false)
            }
           else{
               toast.error(t('ol.61'))
            }
        }
    }


    return (
        <div>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={'text-center mt-4'}>{t('Employ.13')}</h5>
                    <div className="row">
                        <div className="col-md-8 col-lg-4 mx-auto d-flex flex-column justify-content-center">
                            <img src={photoId ? `${BaseUrl}/attachment/download/${photoId}` : people}
                                 style={{width: "70%", margin: "0 auto", borderRadius: "30%"}}/>
                            <div className={'d-flex justify-content-center mt-2'}>
                                <input type="file" id={'file'} value={''} onChange={onSelectImage}
                                       style={{display: 'none'}}/>
                                <label htmlFor={'file'}>
                                    <button type={'button'} className={'btn btn-success'}>{t('ol.62')}</button>
                                </label>
                            </div>
                        </div>
                        <div className="col-12 row mx-auto">
                            <div className="col-md-6 p-2">
                                <label className="mb-1" htmlFor={'fio'}>F.I.O</label>
                                <input type="text" id={'fio'}
                                       {...register('fio', {required: {value: true, message: (t('ol.63'))}})}
                                       placeholder={'F.I.O'}
                                       defaultValue={''}
                                       className={'form-control'}/>
                                {
                                  errors.fio &&
                                  <p className={'text-danger text-center m-0 p-0'}>{errors.fio.message}</p>
                                }
                            </div>
                            <div className="col-md-6 p-2">
                                <label className="mb-1" htmlFor={'username'}>{t('Employ.7')}</label>
                                <input type="text" id={'username'}
                                       {...register('username', {required: {value: true, message: (t('ol.64'))}})}
                                       placeholder={t('ol.65')}
                                       className={'form-control'}/>
                                {
                                  errors.username &&
                                  <p className={'text-danger text-center m-0 p-0'}>{errors.username.message}</p>
                                }
                            </div>
                            <div className="col-md-6 p-2">
                                <label className="mb-1" htmlFor="phoneNumber">{t('ol.66')}</label>
                                <Input
                                  placeholder={t('ol.59')}
                                  value={phoneNumber}
                                  className={'form-control'}
                                  onChange={setPhoneNumber}/>
                                {isCheck && !phoneNumber && <p
                                  className={'text-danger text-center p-0 m-0'}>{t('ol.58')}</p>}
                            </div>
                            <div className="col-md-6 p-2">
                                <label className="mb-1" htmlFor={'roleId'}>{t('Employ.18')}</label>
                                <select id={'roleId'}
                                        {...register('roleId', {required: {value: false, message: (t('ol.67'))}})}
                                        defaultValue={''}
                                        className={'form-control'}>
                                    {
                                        LavozimReducer.roles.length > 0 ?
                                          LavozimReducer.roles.map((item, index) =>
                                            <option value={item.id}>{item.name}</option>) : ''
                                    }
                                </select>
                                {
                                  errors.roleId &&
                                  <p className={'text-danger text-center m-0 p-0'}>{errors.roleId.message}</p>
                                }
                            </div>
                            <div className="col-md-6 p-2">
                                <label className="mb-1">{t('Employ.19')}</label>
                                <Select options={branchreducer.branches} isMulti={true}
                                        value={input.selectvalue}
                                        {...register('branches', {required: {value: false, message: (t('ol.67'))}})}
                                        class={'form-control'} onChange={changeselect}/>
                                {isCheck && input.branchid?.length === 0 && <p
                                  className={'text-danger text-center p-0 m-0'}>{t('ol.68')}</p>}
                            </div>
                            <div className="col-md-6 p-2 ">
                                <label className="mb-1" htmlFor={'password'}>{t('Employ.16')}</label>
                                <input type="text"
                                       {...register("password",
                                         {
                                             required: {
                                                 value: !match.params.id,
                                                 message: (t('ol.69'))
                                             },
                                             minLength: {value: 5, message: (t('ol.70'))}
                                         })}
                                       placeholder={t('ol.71')}
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
                            <div className="col-md-6 p-2 ">
                                <label className="mb-1" htmlFor={'confirmPassword'}>{t('Employ.16')}</label>
                                <input type="text"
                                       {...register("confirmPassword", {
                                           required: {
                                               value: !match.params.id,
                                               message: (t('ol.69'))
                                           }
                                       })}
                                       placeholder={t('ol.72')}
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
            </CardBody>
            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default connect((LavozimReducer, XodimReducer, users, branchreducer, photoreducer), {
    getLavozim,
    saveXodim,
    getXodim,
    editXodim,
    getbranch,
    getXodimID,
    savephoto,
    clearPhotoId,
    deletePhoto
})(Taxrirlash)
