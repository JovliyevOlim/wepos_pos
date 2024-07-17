import {useEffect, useState, useRef} from "react";
import {ModalBody, ModalHeader, ModalFooter, Modal} from "reactstrap";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {ImCancelCircle} from "react-icons/im";
import {useForm} from "react-hook-form";
import PhoneInput from 'react-phone-number-input'
import {useHistory} from 'react-router-dom'
import {toast} from "react-toastify";
import { Switch } from 'antd';
import users from "../../../../../reducer/users";
import XaridReducer, {
    getPurchaseById,
    saveXarid,
    editXarid
} from '../reducer/XaridReducer'
import TaminotReducer, {
    saveTaminot,
    getAllSupplier
} from "../../Hamkorlar/reducer/TaminotReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import ModalLoading from "../../../../ModalLoading";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";

import './xarid.css'
import 'react-phone-number-input/style.css'
import {AddButton} from "../../../../Components/Buttons";
import Loading from "../../../../Loading";
import {SearchAnt} from "../../../../Components/SelectAnt";


function Xarid({
                   getPurchaseById,
                   PayReducer,
                   saveXarid,
                   saveTaminot,
                   editXarid,
                   XaridReducer,
                   users,
                   match,
                   getPay,
                   TaminotReducer,
                   getAllSupplier,
                   getBarcodeAndName,
                   MaxsulotlarRoyxariReducer
               }) {

    const {t} = useTranslation()
    const history = useHistory()
    const [isMainBase,setIsMainBase] = useState(false)
    const [activeSupplier, setActiveSupplier] = useState(false);
    const [searchProductLoading,setSearchProductLoading] = useState(false)
    const [supplierName, setSupplierName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const [mainBranchId, setMainBranchId] = useState(null)
    const [isView, setIsView] = useState(false)
    const [search, setSearch] = useState('')
    const [paidSum, setPaidSum] = useState(0)
    const [saveModal, setSaveModal] = useState(false)
    const [userId, setUserId] = useState('')
    const {register, reset, handleSubmit, resetField, getValues, setValue, formState: {errors}} = useForm()

    const [XaridArrayPost, setXaridArrayPost] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalSumPurchase, setTotalSumPurchase] = useState(0)
    const [totalLastSumPurchase, setLastTotalSumPurchase] = useState(0)
    const inputRef = useRef()

    function toggleSupplier() {
        setActiveSupplier(!activeSupplier)
        setSupplierName('')
        setPhoneNumber('')
        setIsCheck(false)
    }

    const [IsSearchProductList, setIsSearchProduct] = useState([])

    function XaridSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
    }


    useEffect(() => {
        if (search) {
            setSearchProductLoading(true)
            if (6 < search?.length) {
                const searchPro = setTimeout(() => {
                    getBarcodeAndName({
                        branchId: mainBranchId ? mainBranchId : users.branchId,
                        params: {
                            search,
                            isPurchase: isMainBase,
                        }
                    })
                }, 10)
                return () => clearTimeout(searchPro)
            } else {
                const searchPro = setTimeout(() => {
                    getBarcodeAndName({
                        branchId: mainBranchId ? mainBranchId : users.branchId,
                        params: {
                            search,
                            isPurchase: isMainBase,
                        }
                    })
                }, 500)
                return () => clearTimeout(searchPro)
            }
        } else {
            setIsSearchProduct([])
        }
    }, [search])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            return false;
        }
    };

    function CalcTotalSum(array) {
        console.log(array)
        let totalSum = 0
        let totalQuantity = 0
        array.map(item => {
                totalQuantity += parseFloat(item.quantity)
                totalSum += parseFloat(item.quantity * item.buyPrice)
            }
        )
        setTotalSumPurchase(totalSum)
        setTotalQuantity(totalQuantity)
        setValue('paidSum', totalSum)
        setPaidSum(totalSum)
    }

    function ComboChangeAmount(e, index) {
        let b = XaridArrayPost
        b[index][e.target.name] = e.target.value
        b[index].totalSum = parseFloat(b[index].quantity * b[index].buyPrice)
        let a = [...XaridArrayPost]
        setXaridArrayPost(a)
        CalcTotalSum(a)
    }


    function AddXaridArray(item) {
        setIsView(false)
        setSearch('')
        let a = XaridArrayPost
        let find = XaridArrayPost.some(val => val.productId === item.id)
        let isNew = item?.branchIds?.some(ids => ids === (mainBranchId ? mainBranchId : users.branchId))
        if (find) {
            toast.warning(t('ol.45'))
        } else {
            a.push({
                buyPrice: item.buyPrice,
                salePrice: item.salePrice,
                productId: item.id,
                quantity: 0,
                delete: false,
                totalSum: 0,
                amount: item.amount,
                name: item.name,
                measurement: item.measurementName,
                isNew
            })
        }

        setXaridArrayPost(a)
    }

    function DeleteXaridArrayPost(indx, purchasesId) {
        if (purchasesId) {
            XaridArrayPost?.map((item, index) => {
                if (index === indx) {
                    item.delete = true
                }
            })
        } else {
            XaridArrayPost?.map((item, index) => {
                if (indx === index) {
                    XaridArrayPost.splice(index, 1)
                }
            })
        }
        let a = [...XaridArrayPost]
        setXaridArrayPost(a)
        let sendArray = a.filter(item => item.delete === false)
        CalcTotalSum(sendArray)
    }


    useEffect(() => {
        setSearchProductLoading(false)
        if (MaxsulotlarRoyxariReducer?.productSearch && search) {
            setIsSearchProduct(MaxsulotlarRoyxariReducer.productSearch)
            let findProduct = MaxsulotlarRoyxariReducer.productSearch.length == 1
            if (findProduct) AddXaridArray(MaxsulotlarRoyxariReducer.productSearch[0])
        }
        if (MaxsulotlarRoyxariReducer.isClearInput) {
            setIsSearchProduct([])
            setSearch('')
            inputRef.current.focus()
        }
    }, [MaxsulotlarRoyxariReducer.productSearch])


    useEffect(() => {
        getPay(users.businessId)
        if (match.params.id) {
            getPurchaseById(match.params.id)
        }
    }, [])

    useEffect(() => {
        if (match.params.id) {
            editX()
        }
    }, [XaridReducer.purchaseOne])


    function editX() {

        if (XaridReducer.purchaseOne?.length > 0) {
            XaridReducer.purchaseOne.map(item => {
                setValue('branchId', item?.branchId)
                setMainBranchId(item?.branchId)
                setValue('paidSum', item?.paidSum)
                setValue('paymentStatus', item?.paymentStatus)
                setValue('supplierId', item?.supplierId)
                setValue('paymentMethodId', item?.paymentMethodId)
                setValue('description', item?.description)
                setTotalSumPurchase(item?.totalSum)
                setLastTotalSumPurchase(item?.totalSum)
                setPaidSum(item?.paidSum)
                setUserId(item?.userId)
                let a = []
                item?.purchaseProductDtoList?.map(item => {
                    a.push({
                        buyPrice: item?.buyPrice,
                        productId: item?.productId,
                        quantity: item.quantity,
                        salePrice: item.salePrice,
                        delete: item.delete,
                        totalSum: item.totalSum,
                        name: item?.productName,
                        measurement: item.measurementName,
                        amount: item.amount,
                        id: item?.id
                    })
                })
                console.log(a)
                setXaridArrayPost(a)
                CalcTotalSum(a)
            })

        }

    }

    function saqla(data) {
        if (paidSum > totalSumPurchase) {
            toast.warning(t('ol.46'))
        } else {
            let paymentStatus = ''
            if (totalSumPurchase === paidSum) {
                paymentStatus = 'TOLANGAN'
            } else if (paidSum === 0) {
                paymentStatus = 'TOLANMAGAN'
            } else {
                paymentStatus = 'QISMAN_TOLANGAN'
            }
            let newProductDtoList = XaridArrayPost.filter(item => item.isNew === false)
            let purchaseProductDtoList = XaridArrayPost.filter(item => item.isNew === true)
            if (match.params.id) {
                editXarid(
                    {
                        ...data,
                        paymentStatus: paymentStatus,
                        userId: userId,
                        debtSum: totalSumPurchase - paidSum,
                        totalSum: totalSumPurchase,
                        purchaseProductDtoList,
                        newProductDtoList,
                        id: match.params.id
                    })
            } else {
                saveXarid(
                    {
                        ...data,
                        paymentStatus: paymentStatus,
                        userId: users.id,
                        debtSum: totalSumPurchase - paidSum,
                        totalSum: totalSumPurchase,
                        purchaseProductDtoList,
                        newProductDtoList,
                    })
            }
        }


    }


    function onSubmitSupplier() {
        if (!phoneNumber || !supplierName) {
            setIsCheck(true)
        } else {
            saveTaminot(
                {
                    businessId: users.businessId,
                    name: supplierName,
                    phoneNumber
                }
            )
            setSaveModal(true)
        }
    }


    useEffect(() => {
        if (XaridReducer.saveBoolean) {
            history.push('/main/purchasesReport')
            console.log('wdwd')
            setUserId('')
        }
        setSaveModal(false)
    }, [XaridReducer.current])


    useEffect(() => {
        if (TaminotReducer.saveBoolean) {
            setActiveSupplier(false)
            setPhoneNumber('')
            setSupplierName('')
            setIsCheck(false)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 500)
        getAllSupplier(users.businessId)
    }, [TaminotReducer.current])

    return (
        <div className='xaridQilishBox'>
            <form onSubmit={handleSubmit(saqla)}>
                <div className={'row  mt-5 p-3 '}>
                    <h5 className={'text-center mt-3'}>{t('Purchase.10')}</h5>
                    <div
                        className="col-md-12 p-2 px-lg-5 mt-4 gap-3 d-flex flex-wrap justify-content-between align-items-center">
                        <div className='flex-grow-1'>
                            <label htmlFor={'supplierId'}>{t('Purchase.2')}</label>
                            <div className={'d-flex gap-2 align-items-center'}>
                                {
                                    <select name="" {...register('supplierId', {
                                        required: {
                                            value: true,
                                            message: (t('ol.47'))
                                        }
                                    })}
                                            id={'supplierId'}
                                            disabled={match.params.id}
                                            className={'form-control'}>
                                        <option value={''}>Tanlang</option>
                                        {

                                            TaminotReducer.AllSupplier?.map(item =>
                                                <option value={item.id}>{item.name}</option>)
                                        }
                                    </select>
                                }
                                {
                                    !match.params.id &&
                                    <AddButton onClick={toggleSupplier}/>
                                }

                            </div>
                            {
                                errors.supplierId &&
                                <div>
                                    <p className={'text-danger text-center p-0 m-0'}>{errors.supplierId.message}</p>
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
                            <label htmlFor={'branchId'}>{t('ProductList.8')}</label>
                            <select name="" id={'branchId'} disabled={match.params.id ? true : false}
                                    {...register('branchId', {
                                        required: {value: true, message: (t('ol.49'))}, onChange: (e) => {
                                            setMainBranchId(e.target.value);
                                            setXaridArrayPost([])
                                        }
                                    })}
                                    className={'form-control'}>
                                {
                                    users.branches?.map(item =>
                                        <option value={item.id}>{item.name}</option>)
                                }
                            </select>
                            {
                                errors.branchId &&
                                <div>
                                    <p className={'text-danger text-center m-0 p-0'}>{errors.branchId.message}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className="col-md-12 p-2 px-lg-5 mt-4 gap-3 d-flex flex-wrap justify-content-start align-items-center">
                        <h5 className={'text-center'}>Umumiy bazadan qidirish</h5>
                        <Switch checked={isMainBase} onChange={(e) => {
                            setIsMainBase(e)
                        }}/>
                    </div>
                    <div className={'col-md-12 p-2 px-lg-5'}>
                    <div className="row">
                            <div className="col-md-12 position-relative m-0 p-0">
                                <SearchAnt value={search} onChange={XaridSearch}  loading={searchProductLoading} inputRef={inputRef} name={t('ol.50')}/>
                                {
                                    isView && IsSearchProductList?.length > 0 ?
                                        <div className={'Combo-array scroll'}>
                                            {
                                                IsSearchProductList?.map(item =>
                                                    <p className={'d-flex justify-content-start gap-4  m-0'}
                                                       onClick={() => AddXaridArray(item)}>
                                                        {item.name} ({item.barcode})
                                                        {
                                                            !item?.branchIds?.some(ids => ids === (mainBranchId ? mainBranchId : users.branchId)) &&
                                                            <strong className={'text-danger m-0'}>Yangi
                                                                mahsulot</strong>
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
                                            <th>{t('Purchase.20')}</th>
                                            <th>{t('Purchase.21')}</th>
                                            <th>{t('Purchase.22')}</th>
                                            <th>{t('ProductList.12')}</th>
                                            <th>Tugash sanasi</th>
                                            <th>Eslatma sanasi</th>
                                            <th>x</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            XaridArrayPost.map((item, index) =>
                                                !item.delete &&
                                                <tr className={'text-start'}>
                                                    <td>
                                                        <div style={{width: '120px'}}>
                                                            <h5 style={{color: !item.isNew ? 'red' : 'black'}}>{item.name}</h5>
                                                            <p>{item.amount} {item.measurement}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className={'d-flex justify-content-start gap-2 align-items-center'}>
                                                            <input
                                                                className={'form-control'}
                                                                style={{width: '80px'}}
                                                                step="any"
                                                                name={'quantity'}
                                                                value={item.quantity}
                                                                onChange={(e) => ComboChangeAmount(e, index)}
                                                                type="number"
                                                                min={0}
                                                                size={10}
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
                                                        <div className={'d-flex align-items-center'}>
                                                            <input type="number" min={0} className={'form-control'}
                                                                   name={"buyPrice"}
                                                                   style={{width: '120px'}}
                                                                   onChange={(e) => ComboChangeAmount(e, index)}
                                                                   value={item.buyPrice} placeholder={item.buyPrice}/>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <h6>{item.quantity * item.buyPrice}</h6>
                                                    </td>
                                                    <td>

                                                        <div className={'d-flex align-items-center'}>
                                                            <input type="number" min={0} className={'form-control'}
                                                                   name={"salePrice"}
                                                                   style={{width: '120px'}}
                                                                   onChange={(e) => ComboChangeAmount(e, index)}
                                                                   value={item.salePrice}/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input type="date" className={'form-control'}
                                                               name={"endDate"}
                                                               style={{width: '120px'}}
                                                               onChange={(e) => ComboChangeAmount(e, index)}
                                                               value={item.endDate}/>
                                                    </td>
                                                    <td>
                                                        <input type="number" min={0} className={'form-control'}
                                                               name={"warningDay"}
                                                               style={{width: '60px'}}
                                                               onChange={(e) => ComboChangeAmount(e, index)}
                                                               value={item.warningDay}/>
                                                    </td>
                                                    <td className={'text-danger'}><ImCancelCircle
                                                        onClick={() => DeleteXaridArrayPost(index, item.id)}
                                                        style={{width: '30px', height: '30px'}}/></td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <h6>{t('Purchase.23')}: {totalQuantity}</h6>
                                <h6>{t('Purchase.22')}: {totalSumPurchase} {t('ol.34')}</h6>
                            </div>
                        </div>
                    </div>
                    <h5 className={'text-center mt-5'}>{t('Purchase.24')}</h5>
                    <div className="col-md-12 p-2 px-lg-5 gap-3 d-flex align-items-end">
                        <div className="flex-grow-1">
                            {
                                match.params.id &&
                                <h6>{t('ol.52')} {totalLastSumPurchase} {t('ol.51')}</h6>
                            }
                            <label htmlFor={'paidSum'}>{t('Purchase.25')}</label>
                            <input type="number" min={0} className={'form-control'}
                                   inputMode="numeric" pattern="[0-9]*"
                                   {...register('paidSum', {
                                       required: {
                                           value: true,
                                           message: (t('ol.53'))
                                       }, onChange: (e) => setPaidSum(parseFloat(e.target.value))
                                   })}
                                   id={'paisSum'}/>
                            {
                                errors.paidSum &&
                                <div>
                                    <p className={'text-danger text-center p-0 m-0'}>{errors.paidSum.message}</p>
                                </div>
                            }
                        </div>
                        <div className="flex-grow-1">
                            <label htmlFor={'tol'}>{t('Purchase.26')}</label>
                            <select id={'tol'} className={'form-control'}
                                    {...register('paymentMethodId', {
                                        required: {
                                            value: true,
                                            message: (t('ol.54'))
                                        }
                                    })}
                                    disabled={match.params.id}
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
                        <div className="flex-grow-1">
                            <h5 className={'p-0 m-0 text-center'}>{t('Purchase.32')}!: {totalSumPurchase - paidSum} {t('ol.51')}</h5>
                        </div>

                    </div>
                    <div className="col-md-12 p-2 px-lg-5 d-flex justify-content-end">
                        <button type={'submit'} className={'btn btn-success'}>{t('Buttons.6')} </button>
                    </div>

                </div>
            </form>
            <Modal isOpen={activeSupplier} toggle={toggleSupplier}>
                <form>
                    <ModalHeader>
                        {t('ol.55')}
                    </ModalHeader>
                    <ModalBody>
                        <div className="row mt-2">
                            <div className={'col-md-6 col-sm-12 mb-3'}>
                                <label htmlFor={'supplierName'}>{t('ol.56')}</label>
                                <input
                                    id={'supplierName'} value={supplierName}
                                    onChange={(e) => setSupplierName(e.target.value)} type="text"
                                    className={'form-control'}/>
                                {
                                    isCheck && !supplierName &&
                                    <div>
                                        <p className={'m-0 p-0 text-center text-danger'}>{t('ol.57')}</p>
                                    </div>
                                }
                            </div>
                            <div className={'col-md-6 col-sm-12 mb-3'}>
                                <label htmlFor={'phoneNumber'}>{t('Supplier.7')}</label>
                                <PhoneInput
                                    placeholder={t('ol.59')}
                                    value={phoneNumber}
                                    className={'form-control'}
                                    onChange={setPhoneNumber}/>
                                {
                                    isCheck && !phoneNumber &&
                                    <div>
                                        <p className={'m-0 p-0 text-center text-danger'}>{t('ol.58')}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type={"button"} className={'btn btn-danger'}
                                onClick={toggleSupplier}>{t('Buttons.7')}</button>
                        <button className={'btn btn-success'}
                                type={"button"} onClick={onSubmitSupplier}
                        >{t('ol.60')}
                        </button>
                    </ModalFooter>
                </form>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default connect((PayReducer, XaridReducer, users, TaminotReducer, MaxsulotlarRoyxariReducer), {
    getPurchaseById,
    saveXarid,
    getPay,
    editXarid,
    saveTaminot,
    getAllSupplier,
    getBarcodeAndName
})(Xarid)
