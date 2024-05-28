import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useHistory} from 'react-router-dom'
import {toast} from "react-toastify";
import users from "../../../../../reducer/users";
import ModalLoading from "../../../../ModalLoading";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import XarajatTurlariReducer, {getXarajatlarTurlari} from "../../Xarajatlar/reducer/XarajatTurlariReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import exchangeReducer, {saveExchange} from "../../../../../reducer/exchangeReducer";
import {DeleteOutlined} from "@ant-design/icons";
import {InputNumber} from "antd";


function Xarid({
                   users,
                   getBarcodeAndName,exchangeReducer,
                   MaxsulotlarRoyxariReducer, XarajatTurlariReducer, saveExchange,
                   getbranch, branchreducer, getXarajatlarTurlari, getPay, PayReducer
               }) {

    const {t} = useTranslation()
    const history = useHistory()
    const [activeSupplier, setActiveSupplier] = useState(false);
    const [mainBranchId, setMainBranchId] = useState(null)
    const [isView, setIsView] = useState(false)
    const [search, setSearch] = useState('')
    const [saveModal, setSaveModal] = useState(false)
    const {register, reset, handleSubmit, resetField, getValues, setValue, formState: {errors}} = useForm()

    const [XaridArrayPost, setXaridArrayPost] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const inputRef = useRef()

    function XaridSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        setTimeout(() => {
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    search: e.target.value,
                    isPurchase: false,
                }
            })
        }, 100)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            return false;
        }
    };

    function CalcTotalSum(array) {
        console.log(array)
        let totalQuantity = 0
        array.map(item => {
                totalQuantity += parseFloat(item.quantity)
            }
        )
        setTotalQuantity(totalQuantity)
    }

    function ComboChangeAmount(e, index) {
        let b = XaridArrayPost
        b[index]['quantity'] = e
        let a = [...XaridArrayPost]
        setXaridArrayPost(a)
        CalcTotalSum(a)
    }


    function AddXaridArray(item) {
        setIsView(false)
        setSearch('')
        let a = XaridArrayPost
        let find = XaridArrayPost.some(val => val.productId === item.id)
        if (find) {
            toast.warning(t('ol.45'))
        } else {
            a.push({
                productId: item.id,
                quantity: 0,
                amount: item.amount,
                name: item.name,
                measurement: item.measurementName,
            })
        }

        setXaridArrayPost(a)
    }

    function DeleteXaridArrayPost(indx, purchasesId) {

        XaridArrayPost?.map((item, index) => {
            if (indx === index) {
                XaridArrayPost.splice(index, 1)
            }
        })

        let a = [...XaridArrayPost]
        setXaridArrayPost(a)
        let sendArray = a.filter(item => item.delete === false)
        CalcTotalSum(sendArray)
    }


    useEffect(() => {
        if (MaxsulotlarRoyxariReducer.productSearch) {
            let findProduct = MaxsulotlarRoyxariReducer.productSearch
                .find(val => val.barcode === search || val.name.toLowerCase() === search.toLowerCase())
            console.log(findProduct)
            if (findProduct) {
                AddXaridArray(findProduct)
                inputRef.current.focus()
                setSearch('')
            }
            // else {
            //     inputRef.current.focus()
            // }
        }
        if (MaxsulotlarRoyxariReducer.isClearInput) {
            setSearch('')
        }
    }, [MaxsulotlarRoyxariReducer.getBoolean])


    function saqla(data) {
        const map1 = new Map();
        XaridArrayPost.map(item => {
            map1[item.quantity] = item.productId
        })

        if (data.firstBranchId === data.secondBranchId) {
            toast.warning('Bir xil filial tanlandi !')
        } else if (XaridArrayPost.length === 0) {
            toast.warning("Kamida bitta mahsulot tanlang!")
        } else {
            saveExchange({
                ...data,
                userId: users.id,
                outlayDto: {
                    branchId: mainBranchId ? mainBranchId : users.branchId,
                    userId: users.id,
                    outlayCategoryId: data.outlayCategoryId,
                    paymentMethodId: data.paymentMethodId,
                    sum: data.sum,
                    date: new Date(),
                    description: `Bazadan Bazaga mahsulot o'tkazish uchun`
                },
                valueProductIds: map1
            })
        }

    }


    useEffect(() => {
        if (exchangeReducer.saveBoolean) {
            history.push('/main/dashboard')
        }
        setSaveModal(false)
    }, [exchangeReducer.current])

    useEffect(() => {
        getbranch(users.businessId)
        getXarajatlarTurlari(users.businessId)
        getPay(users.businessId)
    }, []);


    return (
        <CardBody>
            <div className="col-md-12 text-center">
                <MainHeaderText text={t('sidebar.exchange')}/>
            </div>
            <form onSubmit={handleSubmit(saqla)}>
                <div
                    className="col-md-12 p-2 px-lg-5 mt-4 gap-3 d-flex flex-wrap justify-content-between align-items-top">
                    <div className='flex-grow-1'>
                        <label htmlFor={'firstBranchId'}>Yuboruvchi filial</label>
                        <div className={'d-flex gap-2 align-items-center'}>
                            {
                                <select  {...register('firstBranchId', {
                                    required: {
                                        value: true,
                                        message: (t('ol.49'))
                                    }, onChange: (e) => {
                                        setMainBranchId(e.target.value);
                                        setXaridArrayPost([])
                                        setIsView(false)
                                        setSearch('')
                                        setTotalQuantity(0)
                                    }
                                })}
                                         id={'firstBranchId'}
                                         className={'form-control'}>
                                    <option value={''}>Tanlang</option>
                                    {

                                        users.branches?.map(item =>
                                            <option value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            }
                        </div>
                        {
                            errors.firstBranchId &&
                            <div>
                                <p className={'text-danger text-center p-0 m-0'}>{errors.firstBranchId.message}</p>
                            </div>
                        }
                    </div>
                    <div className="flex-grow-1">
                        <label htmlFor={'description'}>{t('Buttons.17')}</label>
                        <input type="text"
                               className={'form-control'} {...register('description', {required: false})}
                               placeholder={t('ol.48')}
                               id={'description'}/></div>
                    <div className="flex-grow-1">
                        <label htmlFor={'secondBranchId'}>Qabul qiluvchi filial</label>
                        <select name="" id={'secondBranchId'}
                                {...register('secondBranchId', {
                                    required: {value: true, message: (t('ol.49'))}
                                })}
                                className={'form-control'}>
                            <option value={''}>Tanlang</option>
                            {
                                branchreducer.branch?.map(item =>
                                    <option value={item.id}>{item.name}</option>)
                            }
                        </select>
                        {
                            errors.secondBranchId &&
                            <div>
                                <p className={'text-danger text-center m-0 p-0'}>{errors.secondBranchId.message}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={'col-md-12 mt-4 p-2 px-lg-5'}>
                    <div className="row">
                        <div className="col-md-12 position-relative m-0 p-0">
                            <input type="text"
                                   disabled={!mainBranchId}
                                   autoFocus
                                   onKeyPress={handleKeyPress}
                                   ref={inputRef}
                                   value={search}
                                   onChange={XaridSearch}
                                   className={'form-control'}
                                   placeholder={t('ol.50')}/>
                            {
                                isView && MaxsulotlarRoyxariReducer.productSearch?.length > 0 ?
                                    <div className={'Combo-array scroll'}>
                                        {
                                            MaxsulotlarRoyxariReducer.productSearch?.map(item =>
                                                <p className={'d-flex justify-content-start gap-4  m-0'}
                                                   onClick={() => {
                                                       if (item.amount > 0) {
                                                           AddXaridArray(item)
                                                       } else (
                                                           toast.warning('Mahsulot miqdori 0 teng !')
                                                       )
                                                   }}>
                                                    {item.name} ({item.barcode})
                                                    {
                                                        item.amount > 0 ?


                                                            <strong
                                                                className={'text-success m-0'}>Mahsulot
                                                                miqdori {item.amount} {item.measurementName} teng
                                                                !</strong>

                                                            :
                                                            <strong className={'text-danger m-0'}>Mahsulot miqdori
                                                                0 {item.measurementName} teng</strong>
                                                    }
                                                </p>
                                            )
                                        }
                                    </div>
                                    : ''
                            }
                            <div className="table-responsive">
                                <table className={'table mt-3 border'}>
                                    <thead>
                                    <tr>
                                        <th>{t('ProductEdit.2')}</th>
                                        <th>{t('Trade.12')}</th>
                                        <th>x</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        XaridArrayPost.map((item, index) =>
                                            !item.delete &&
                                            <tr className={'text-start'}>
                                                <td>
                                                    <div style={{width: '200px'}}>
                                                        <h5>{item.name}</h5>
                                                        <p>{item.amount} {item.measurement}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        className={'d-flex justify-content-start gap-2 align-items-center'}>
                                                        <InputNumber
                                                            value={item?.quantity}
                                                            min={0}
                                                            name={'quantity'}
                                                            step={'number'}
                                                            max={item.amount}
                                                            onChange={(e) => {
                                                                ComboChangeAmount(e, index)
                                                            }}
                                                            className={'shop-change-number'}
                                                        />
                                                        <input
                                                            className={'form-control'}
                                                            style={{width: '90px'}}
                                                            type="text"
                                                            disabled={true}
                                                            value={item.measurement}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <DeleteOutlined style={{fontSize: '24px', color: "red"}}
                                                                    onClick={() => DeleteXaridArrayPost(index)}/>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <h6>{t('Purchase.23')}: {totalQuantity}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 p-2 px-lg-5 gap-3 d-flex align-items-top">
                    <div className="flex-grow-1">
                        <label htmlFor={'outlayCategoryId'}>Xarajat turi</label>
                        <select id={'outlayCategoryId'} className={'form-control'}
                                {...register('outlayCategoryId', {
                                    required: {
                                        value: true,
                                        message: "Xarajat turini tanlang"
                                    }
                                })}
                        >
                            <option value={''}>Tanlang</option>
                            {
                                XarajatTurlariReducer.xarajatturlari?.map(item =>
                                    <option value={item.id}>{item.name}</option>)
                            }
                        </select>
                        {
                            errors.outlayCategoryId &&
                            <div>
                                <p className={'text-danger text-center p-0 m-0'}>{errors.outlayCategoryId.message}</p>
                            </div>
                        }
                    </div>
                    <div className="flex-grow-1">
                        <label htmlFor={'sum'}>Summa</label>
                        <input type="number" min={0} className={'form-control'}
                               inputMode="numeric" pattern="[0-9]*"
                               {...register('sum', {
                                   required: {
                                       value: true,
                                       message: (t('ol.53'))
                                   }
                               })}
                               id={'sum'}/>
                        {
                            errors.sum &&
                            <div>
                                <p className={'text-danger text-center p-0 m-0'}>{errors.sum.message}</p>
                            </div>
                        }
                    </div>
                    <div className="flex-grow-1">
                        <label htmlFor={'paymentMethodId'}>{t('Purchase.26')}</label>
                        <select id={'paymentMethodId'} className={'form-control'}
                                {...register('paymentMethodId', {
                                    required: {
                                        value: true,
                                        message: (t('ol.54'))
                                    }
                                })}
                        >
                            <option value={''}>Tanlang</option>
                            {
                                PayReducer.paymethod?.map(item =>
                                    <option value={item.id}>{item.name}</option>)
                            }
                        </select>
                        {
                            errors.paymentMethodId &&
                            <div>
                                <p className={'text-danger text-center p-0 m-0'}>{errors.paymentMethodId.message}</p>
                            </div>
                        }
                    </div>


                </div>
                <div className="col-md-12 p-2 px-lg-5 d-flex justify-content-end">
                    <button type={'submit'} className={'btn btn-success'}>{t('Buttons.6')} </button>
                </div>
            </form>
            <ModalLoading isOpen={saveModal}/>
        </CardBody>
    )
}

export default connect((users, MaxsulotlarRoyxariReducer, branchreducer, XarajatTurlariReducer, PayReducer, exchangeReducer), {
    getBarcodeAndName, getbranch, getXarajatlarTurlari, getPay, saveExchange
})(Xarid)
