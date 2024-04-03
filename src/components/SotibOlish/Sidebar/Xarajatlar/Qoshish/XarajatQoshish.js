import {useEffect, useState} from "react";
import {connect} from "react-redux";
import XarajatlarReducer, {
    editXarajatlar,
    getOutlayOne,
    saveXarajatlar
} from "../reducer/XarajatlarReducer";
import {useHistory} from 'react-router-dom'
import './xarajatQoshish.css'
import users from "../../../../../reducer/users";
import XarajatTurlariReducer, {
    getXarajatlarTurlari,
} from "../reducer/XarajatTurlariReducer";
import {useTranslation} from "react-i18next";
import {formatDateMinus} from "../../../../../util";
import ModalLoading from "../../../../ModalLoading";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import {useForm} from "react-hook-form";

function XarajatQoshish({
                            editXarajatlar,
                            users,
                            getOutlayOne,
                            saveXarajatlar,
                            match, getPay, PayReducer,
                            XarajatlarReducer,
                            getXarajatlarTurlari,
                            XarajatTurlariReducer
                        }) {


    const {t} = useTranslation()
    const history = useHistory()
    const {register, setValue, handleSubmit, formState: {errors}} = useForm()

    const [editUserId, setEditUserId] = useState('')
    const [saveModal, setSaveModal] = useState(false)

    function saqla(data) {

        if (match.params.id) {
            editXarajatlar(
                {
                    ...data,
                    userId: editUserId,
                    id: match.params.id
                },
            )
        } else {
            saveXarajatlar(
                {
                    ...data,
                    userId: users.id
                },
            )
        }
        setSaveModal(true)
    }


    function editX() {
        let a = XarajatlarReducer.getOne
        if (a) {
            if (a.id === match.params.id) {
                setValue('branchId', a.branchId)
                setValue('date', formatDateMinus(a.date))
                setValue('outlayCategoryId', a.outlayCategoryId)
                setValue('paymentMethodId', a.paymentMethodId)
                setValue('description', a.description)
                setValue('sum', a.sum)
                setEditUserId(a.userId)
            }
        }
    }


    useEffect(() => {
        if (XarajatlarReducer.saveOutlaysBool) {
            setSaveModal(false)
            history.push('/main/outlayList')
            setEditUserId('')
        }
    }, [XarajatlarReducer.current])

    useEffect(() => {
        if (match.params.id) {
            editX()
        }
    }, [XarajatlarReducer.getOne])


    useEffect(() => {
        getPay(users.businessId)
        getXarajatlarTurlari(users.businessId)
        if (match.params.id) {
            getOutlayOne(match.params.id)
        }
    }, [])

    return (
        <div className="contenerX">
            <div className={'row  mt-4'}>
                <div className="col-12 d-flex justify-content-center">
                    <h5> {
                        match.params.id ? "Xarajat taxrirlash" : t('Expenses.9')
                    } </h5>
                </div>

                <div className="col-12  mt-4">
                    <form onSubmit={handleSubmit(saqla)}>
                        <div className="row">
                            <div className="col-md-6 col-lg-4 col-sm-12 p-2">
                                <label className="mb-1" htmlFor="branchId">{t('ProductList.8')}</label>
                                <select className={'form-control'} id='branchId'
                                        {...register('branchId', {
                                            required: {
                                                value: true,
                                                message: 'Filial tanlang'
                                            }
                                        })}
                                        disabled={match.params.id}
                                >
                                    <option value={''}>Tanlang</option>
                                    {
                                        users.branches.map(item =>
                                          <option value={item.id}>{item.name}</option>)
                                    }
                                </select>
                                {
                                  errors.branchId &&
                                  <p className="text-danger text-center m-0 p-0">{errors.branchId.message}</p>
                                }
                            </div>
                            <div className="col-md-6 col-lg-4 col-sm-12 p-2">
                                <label className="mb-1" htmlFor={'date'}>{t('Trade.4')}</label>
                                <input type="date" id={'date'} defaultValue={formatDateMinus(new Date())}
                                       className={'form-control'}   {...register('date', {required: true})}/>

                            </div>
                            <div className="col-md-6 col-lg-4 col-sm-12 p-2">
                                <label className="mb-1" htmlFor={'outlayCategoryId'}>{t('Trade.24')}</label>
                                <select
                                  id="outlayCategoryId"   {...register('outlayCategoryId', {
                                    required: {
                                        value: true,
                                        message: 'Xarajat turi tanlang'
                                    }
                                })}
                                  className={'form-control'}>
                                    <option value={''}>Tanlang</option>
                                    {
                                        XarajatTurlariReducer.xarajatturlari ?
                                          XarajatTurlariReducer.xarajatturlari.map((item, index) =>
                                            <option key={index} value={item.id}>{item.name}</option>) : ''
                                    }
                                </select>
                                {
                                  errors.outlayCategoryId &&
                                  <p className="text-danger text-center m-0 p-0">{errors.outlayCategoryId.message}</p>
                                }
                            </div>
                            <div className="col-md-6 col-lg-4 col-sm-12 p-2">
                                <label className="mb-1" htmlFor={'paymentMethodId'}>To'lov turi</label>
                                <select className={'form-control'}
                                        id='paymentMethodId'  {...register('paymentMethodId', {
                                    required: {
                                        value: true,
                                        message: 'To\'lov turini tanlang'
                                    }
                                })}
                                        disabled={match.params.id}
                                >
                                    <option value="">Tanlang</option>
                                    {
                                        PayReducer.paymethod ?
                                          PayReducer.paymethod.map(item => <option
                                            value={item.id}>{item.name}</option>) : ''
                                    }
                                </select>
                                {
                                  errors.paymentMethodId &&
                                  <p className="text-danger text-center m-0 p-0">{errors.paymentMethodId.message}</p>
                                }
                            </div>
                            <div className="col-md-6 col-lg-4 col-sm-12 p-2">
                                <label className="mb-1"
                              htmlFor={'description'}>{t('Buttons.17')}</label>
                                <input type="text" className={'form-control'}
                                       id='description'   {...register('description', {
                                    required: {
                                        value: true,
                                        message: 'Eslatmani kiriting'
                                    }
                                })}
                                       placeholder={'Eslatma'}/>
                                {
                                  errors.description &&
                                  <p className="text-danger text-center m-0 p-0">{errors.description.message}</p>
                                }
                            </div>
                            <div className="col-md-6 col-lg-4 col-sm-12 p-2">
                                <label className="mb-1" htmlFor={'sum'}>{t('Expenses.6')}</label>
                                <input type="number" className={'form-control'}
                                       {...register('sum', {
                                           required: {
                                               value: true,
                                               message: 'Miqdorni kiriting'
                                           }
                                       })}
                                       placeholder={'Miqdor'}
                                       id={'sum'}/>
                                {
                                  errors.sum &&
                                  <p className="text-danger text-center m-0 p-0">{errors.sum.message}</p>
                                }
                            </div>
                            <div className="col-md-12 mt-3 w-100">
                                <button className={'btn btn-success w-100'} type={'submit'}>{t('Buttons.2')}</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default connect((
  XarajatTurlariReducer, PayReducer, users, XarajatlarReducer), {
    editXarajatlar,
    getPay,
    getXarajatlarTurlari,
    saveXarajatlar,
    getOutlayOne
})(XarajatQoshish)

