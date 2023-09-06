import ReactTooltip from 'react-tooltip';
import img6 from '../../../../../img/backward6.png'
import React, {useEffect, useState, useRef, useReducer} from "react";
import {connect} from "react-redux";
import './savdoOynasi.css'
import MaxsulotlarRoyxariReducer, {
    getBarcodeAndName,
    getProductForShopping
} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link, Route, Switch, useHistory} from 'react-router-dom'
import users from "../../../../../reducer/users";
import {savdooynasi} from "../../../../../reducer/users";
import {useReactToPrint} from 'react-to-print';
import SavdoQoshishReducer, {
    saveSavdolar,
    clearSuccess,
    getTradeById,
    editSavdolar,
    getTradeByBranch
} from "../reducer/SavdoQoshishReducer";
import BolimReducer, {getBolim} from "../../Maxsulotlar/reducer/BolimReducer";
import {getFirma} from "../../Maxsulotlar/reducer/FirmaReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import Imagecom from "../../../../Imagecom";
import {formatDateMinus} from "../../../../../util";
import ModalLoading from "../../../../ModalLoading";
import checkReducer, {getInvoice} from "../../../../../reducer/checkReducer";
import Select from "react-select";
import holdOnReducer, {saveHoldOn, getHoldOn, deleteHoldOn} from "../../../../../reducer/holdOnReducer";
import moment from "moment";
import CustomerReducer, {getCustomersForTrade, saveCustomer} from "../../Hamkorlar/reducer/CustomerReducer";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {InputNumber} from "antd";
import allbusinessreducer, {getOneBusiness} from "../../SUPERADMIN/reducers/allbusinessreducer";
import Korish from "../../../../../img/Korish.png";
import Edit from "../../../../../img/Edit.png";
import Delete from "../../../../../img/Delete.png";
import {Box, TablePagination} from "@mui/material";
import Loading from "../../../../Loading";

function SavdoOynasi({
                         allbusinessreducer,
                         getOneBusiness,
                         saveHoldOn,
                         getCustomersForTrade,
                         CustomerReducer,
                         saveCustomer,
                         deleteHoldOn,
                         getHoldOn,
                         holdOnReducer,
                         checkReducer,
                         getInvoice,
                         clearSuccess,
                         getBolim,
                         BolimReducer,
                         getProductForShopping,
                         getPay, PayReducer,
                         editSavdolar, SavdoQoshishReducer, saveSavdolar,
                         users, savdooynasi,
                         getFirma, MaxsulotlarRoyxariReducer,
                         getBarcodeAndName, match, getTradeById, getTradeByBranch
                     }) {
    const {t} = useTranslation();
    const history = useHistory();
    const debtRef = useRef();
    const inputRef = useRef();
    const [mainBranchId, setMainBranchId] = useState(null)
    const [isViewSearchProduct, setIsViewSearchProduct] = useState(false)
    const [thisDay, setThisDay] = useState(formatDateMinus(new Date()))
    const [IsCheck, setIsCheck] = useState(false)
    const [categoryId, setCategoryId] = useState(users.businessId)
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        branchId: '',
        phoneNumber: '',
        percent: ''
    })
    const [descriptionHoldOn, setDescriptionHoldOn] = useState('')
    const [enterPaidSum, setEnterPaidSum] = useState(0)
    const [search, setSearch] = useState('')
    const [customer, setCustomer] = useState(null)
    const [editActiveButton, setEditActiveButton] = useState('')
    const [noChangesPaidSum, setNoChangesPaidSum] = useState(0)
    const [tradeIdSearch, setTradeIdSearch] = useState('')
    const [tradeIdForEdit, setTradeIdForEdit] = useState(null)

    function reducer(state, action) {
        switch (action.type) {
            case 'name':
                return {...state, name: action.payload}
            case 'branchId':
                return {...state, branchId: action.payload}
            case 'phoneNumber':
                return {...state, phoneNumber: action.payload}
            case 'percent':
                return {...state, percent: action.payload}
            case 'reset':
                return {name: '', phoneNumber: '', percent: '', branchId: ''}
        }
    }


    const [checkMinusShop, setCheckMinuShop] = useState(false)
    const [IsDiscount, setIsDiscount] = useState(false)
    const [IsGross, setIsGross] = useState(false)

    useEffect(() => {
        setCheckMinuShop(!allbusinessreducer.onebusiness?.saleMinus)
        setIsDiscount(!allbusinessreducer.onebusiness?.discount)
        setIsGross(!allbusinessreducer.onebusiness?.gross)
    }, [allbusinessreducer.businessMinusSHopBoolean])


    const [userHoldOn, setUserHoldOn] = useState(null)

    const [addCustomerActive, setAddCustomerActive] = useState(false)


    // useEffect(() => {
    //     getOneBusiness(users.businessId)
    // }, [])

    // function ClickSumm() {
    //     input.qaytim = 50000
    //     let a = {...input}
    //     setInput(a)
    // }
    //
    // function qaytimchange(e) {
    //     input.qaytim = e.target.value
    //     let a = {...input}
    //     setInput(a)
    // }


    function addCustomerToggle() {
        setAddCustomerActive(!addCustomerActive)
        setIsCheck(false)
        dispatch({
            type: 'reset',
            payload: {}
        })
    }

    function addCustomer() {
        if (!state.name || !state.branchId || !state.phoneNumber || !state.percent) {
            setIsCheck(true)
        } else {
            saveCustomer(state)
            addCustomerToggle()
        }

    }


    const [arr1, setarr1] = useState([])
    const [lastTradeActive, setlastTradeActive] = useState(false)

    function toggle4() {
        setlastTradeActive(!lastTradeActive)
    }

    const [activeHoldOn, setActiveHoldOn] = useState(false)

    let [xisob, setxisob] = useState(0)
    let [jamixisob, setjamixisob] = useState(0)
    const [ushla2, setushla2] = useState(false)
    const [ushlanumber, setushlanumber] = useState(null)
    const [qaytim, setQaytim] = useState(false)


    function toggleQaytim() {
        setQaytim(!qaytim)

    }

    function toggle8() {
        setushla2(!ushla2)
    }


    function ushla() {
        let saveArray = []
        arr1.map(item => {
            saveArray.push({
                productId: item.productId,
                quantity: item.quantity,
                totalPrice: item.totalSalePrice,
            })

        })

        saveHoldOn({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                customerId: customer,
                description: descriptionHoldOn,
                gross: grossPriceType,
                totalSum: jamixisob,
                quantity: xisob,
                userId: users.id,
                waitingProductDtoList: saveArray,
            }
        )

    }

    useEffect(() => {
        if (holdOnReducer.saveBoolean) {
            if (ushlanumber) {
                deleteHoldOn(ushlanumber)
            }
            setarr1([])
            setDescriptionHoldOn('')
            setushlanumber(null)
            setushla2(false)
            setxisob(0)
            setjamixisob(0)
        }
    }, [holdOnReducer.current])

    function savdooynakochirish(id) {
        if (holdOnReducer.holdOn) {
            holdOnReducer.holdOn.filter(val => {
                if (id == val.id) {
                    let holdOnArray = []
                    changeGrossPriceType(val.gross ? 'OPTOM' : 'DONA')
                    setUserHoldOn(val.userId)
                    setushlanumber(val.id)
                    setjamixisob(val.totalSum)
                    setxisob(val.quantity)
                    setCustomer(val.customerId)
                    setDescriptionHoldOn(val.description)
                    val?.waitingProductDtoList.map(item => {
                        holdOnArray.push({
                            productId: item?.productId,
                            noChangesPrice: item?.salePrice,
                            noChangesTotalSalePrice: item?.salePrice * item?.quantity,
                            totalSalePrice: item?.totalPrice,
                            quantity: item?.quantity,
                            name: item?.productName,
                            price: item?.totalPrice / item.quantity,
                            measurementName: item?.measurementName,
                            amount: item?.amount,
                            delete: false,
                            disabled: false,
                            active: false,
                        })
                    })
                    setarr1(holdOnArray)
                    toast.warning('Mahsulot Savdo bo`limida')
                }
            })
            toggle()
        }

    }

    function mahsulotnomi(e) {
        setSearch(e.target.value)
        getBarcodeAndName({
            branchId: mainBranchId ? mainBranchId : users.branchId,
            name: e.target.value
        })
        setIsViewSearchProduct(true)
    }


    function xisobkitob(array) {
        let b = 0
        let c = 0
        array.filter(val => val.delete === false).map(item => {
            b += parseFloat(item.quantity)
            c += (item.quantity * item.price)

        })
        setxisob(b)
        setjamixisob(c)
    }

    useEffect(() => {
        xisobkitob(arr1)
    }, [arr1])


    useEffect(() => {
        if (MaxsulotlarRoyxariReducer.productSearch) {
            let findProduct = MaxsulotlarRoyxariReducer.productSearch
                .find(val => val.barcode === search || val.name.toLowerCase() === search.toLowerCase())
            if (findProduct) pushesh(findProduct)
        }
        if (MaxsulotlarRoyxariReducer.isClearInput) {
            setSearch('')
            inputRef.current.focus()
        }
    }, [MaxsulotlarRoyxariReducer.getBoolean])


    function pushesh(val) {
        if (val.amount <= 0 && checkMinusShop) {
            toast.warning('Mahsulot bazada qolmagan!')
        } else {
            let someProduct = arr1.some(item => item.productId === val.id)
            if (someProduct) {
                setCount(val.id)
            } else {
                let mainPriceType = grossPriceType ? val.grossPrice : val.salePrice
                let mainPrice = mainPriceType - (mainPriceType * customerPercent / 100)
                arr1.push({
                    productId: val.id,
                    quantity: 1,
                    name: val.name,
                    price: mainPrice,
                    totalSalePrice: 1 * mainPrice,
                    noChangesPrice: val.salePrice,
                    noChangesTotalSalePrice: 1 * val.salePrice,
                    measurementName: val.measurementName,
                    amount: val.amount,
                    delete: false,
                    disabled: false,
                    active: false,
                })
            }
            let b = [...arr1]
            setarr1(b)
            inputRef.current.focus()
        }
        setSearch('')
        setIsViewSearchProduct(false)
    }

    function changeCount(e, id) {
        arr1.map((item, index) => {
            if (index === id) {
                item.quantity = e
                item.totalSalePrice = item.quantity * item.price
                item.noChangesTotalSalePrice = item.quantity * item.noChangesPrice
                item.active = e >= item.amount
                item.disabled = false
            }
        })
        let a = [...arr1]
        setarr1(a)
    }

    function handleChangeBuyPrice(e, ind) {
        arr1.map((item, index) => {
            if (index === ind) {
                item.price = e
                item.totalSalePrice = item.quantity * e
            }
        })
        let a = [...arr1]
        setarr1(a)
    }

    function setCount(id) {
        arr1.map((item) => {
            if (item.productId === id) {
                item.quantity += 1
                item.totalSalePrice = item.quantity * item.price
                item.noChangesTotalSalePrice = item.quantity * item.noChangesPrice
                item.active = item.quantity >= item.amount
                item.disabled = false
            }
        })
        let a = [...arr1]
        setarr1(a)
    }

    function sMinus(id) {
        arr1.map((item, index) => {
            if (index === id) {
                item.quantity -= 1
                item.totalSalePrice = item.quantity * item.price
                item.noChangesTotalSalePrice = item.quantity * item.noChangesPrice
                item.active = item.quantity > item.amount;
                item.disabled = item.quantity === 0
            }
        })
        let a = [...arr1]
        setarr1(a)
    }

    function deleteM(ind, tradedId) {
        if (!tradedId) {
            arr1.map((item, index) => {
                if (index === ind) {
                    arr1.splice(index, 1)
                }
            })
        } else {
            arr1.map((item, index) => {
                if (index === ind) {
                    item.delete = true
                }
            })
        }
        let a = [...arr1]
        setarr1(a)
    }

    const [customerPercent, setCustomerPercent] = useState(0)

    function selectCustomer(e) {
        setCustomer(e.value === "ALL" ? null : e.value)
        if (e.value === 'ALL') {
            setCustomerPercent(0)
        } else {
            if (CustomerReducer.customersTrade.length > 0) {
                let customer = CustomerReducer.customersTrade.find(item => item.id === e.value)
                setCustomerPercent(customer.percent)
            }
        }
        setarr1([])
    }

    const [saveModal, setSaveModal] = useState(false)
    const [printDisplay, setPrintDisplay] = useState('none')


    useEffect(() => {
        if (SavdoQoshishReducer.success) {
            setPrintDisplay('block')
            setTimeout(() => {
                if (ushlanumber) {
                    deleteHoldOn(ushlanumber)
                }
                setushlanumber(null)
                handlePrint()
                setarr1([])
                setTradeDebt(0)
                setTrader([])
                setThisDay(formatDateMinus(new Date()))
                setturli(false)
                setUserHoldOn(null)
                setactiveqarz(false)
                setCustomerPercent(0)
                setCustomer(null)
                setEnterPaidSum(0)
                setTradeIdForEdit(null)
                setTradeIdSearch('')
                setDescriptionHoldOn('')
                setPrintDisplay('none')
                clearSuccess()
                if (SavdoQoshishReducer.editBoolean) {
                    history.push('/main/tradeList')
                }
            }, 1000)
        }
        setSaveModal(false)
    }, [SavdoQoshishReducer.current])

    const [paymentMethodId, setPaymentMethodId] = useState('')

    const [traderArray, setTrader] = useState([])

    function makeTraderDto() {
        let a = []
        arr1.map(item => {
            a.push({
                delete: item.delete,
                name: item.name,
                productId: item.productId,
                measurementName: item.measurementName,
                price: item.price,
                totalSalePrice: item.totalSalePrice,
                id: item.id,
                quantity: item.quantity,
            })
        })
        setTrader(a)

        return a
    }


    // function naqdSotish() {
    //     let traderArrayDto = makeTraderDto()
    //     if (match.params.id) {
    //         editSavdolar({
    //             id: match.params.id,
    //             backing: match.params.remainId ? true : false,
    //             customerId: input.customer,
    //             userId: userHoldOn ? userHoldOn : users.id,
    //             dollar: valyuta,
    //             gross: grossPriceType,
    //             productTraderDto: traderArrayDto,
    //             payDate: thisDay,
    //             branchId: input.branch === null ? users.branchId : input.branch,
    //             paymentDtoList: payForm,
    //             debtSum: 0,
    //             paidSum: jamixisob,
    //             totalSum: jamixisob,
    //             // paymentStatusId: tolovreducer.tolovholati[0].id
    //         })
    //     } else {
    //         saveSavdolar({
    //             backing: false,
    //             customerId: input.customer,
    //             userId: userHoldOn ? userHoldOn : users.id,
    //             dollar: valyuta,
    //             gross: grossPriceType,
    //             productTraderDto: traderArrayDto,
    //             payDate: thisDay,
    //             branchId: input.branch === null ? users.branchId : input.branch,
    //             paymentDtoList: payForm,
    //             debtSum: 0,
    //             paidSum: jamixisob,
    //             totalSum: jamixisob,
    //             // paymentStatusId: tolovreducer.tolovholati[0].id
    //         })
    //     }
    //
    //     setSaveModal(true)
    //     setPaymentMethodId('')
    //     input.qaytim = 0
    //     let a = {...input}
    //     setInput(a)
    //     toggleQaytim()
    // }

    function saveTrade(id, type) {
        let a = []
        a.push({
            sum: jamixisob,
            paymentMethodId: id,
            paymentMethodName: type,
        })
        setPayForm(a)
        if (type === "Naqd") {
            toggleQaytim()
            setPaymentMethodId(id)
        } else {
            saqla(a, jamixisob, jamixisob, 'TOLANGAN')
            setSaveModal(true)
        }
    }

    function saqla(a, paidSum, totalSum, paymentStatus) {
        let traderArrayDto = makeTraderDto()
        if (tradeIdForEdit) {
            editSavdolar({
                id: tradeIdForEdit,
                backing: match.params.remainId ? true : false,
                branchId: mainBranchId ? mainBranchId : users.branchId,
                customerId: customer,
                date: thisDay,
                debtSum: totalSum - paidSum,
                gross: grossPriceType,
                paidSum: paidSum,
                paymentDtoList: a,
                paymentStatus: paymentStatus,
                totalSum: totalSum,
                tradeProductDtoList: traderArrayDto,
                userId: userHoldOn ? userHoldOn : users.id,
            })
        } else {
            saveSavdolar({
                backing: false,
                branchId: mainBranchId ? mainBranchId : users.branchId,
                customerId: customer,
                date: thisDay,
                debtSum: totalSum - paidSum,
                gross: grossPriceType,
                paidSum: paidSum,
                paymentDtoList: a,
                paymentStatus: paymentStatus,
                totalSum: totalSum,
                tradeProductDtoList: traderArrayDto,
                userId: userHoldOn ? userHoldOn : users.id,
            })
        }
    }

    const [tradeDebt, setTradeDebt] = useState(0)

    function saveTradeByDifferentPayment() {
        let totalsum = jamixisob
        let paySum = 0
        payForm.map(item => {
            paySum += parseFloat(item.sum)
        })
        setEnterPaidSum(paySum)
        setTradeDebt((totalsum - paySum) === null ? 0 : (totalsum - paySum))
        if (jamixisob !== paySum) {
            toast.warning('To\'lovni to\'liq kiriting')
        } else {
            saqla(payForm, paySum, jamixisob, 'TOLANGAN')
            setSaveModal(true)
        }

    }

    const [payMethodIds, setPayMethodId] = useState(null)

    function saveTradeByDebt() {
        let totalsum = jamixisob
        let paySum = parseInt(enterPaidSum === 0 ? 0 : enterPaidSum)
        let paymentId;
        if (jamixisob === parseInt(enterPaidSum)) {
            paymentId = 'TOLANGAN'
        } else if (jamixisob > parseInt(enterPaidSum) && parseInt(enterPaidSum) !== 0) {
            paymentId = 'QISMAN_TOLANGAN'
        } else {
            paymentId = 'TOLANMAGAN'
        }

        let a = []
        let type = payMethodIds ? PayReducer.paymethod.find(item => item.id === payMethodIds).name : PayReducer.paymethod[0].name
        a.push({
            sum: paySum,
            paymentMethodId: payMethodIds ? payMethodIds : PayReducer.paymethod[0].id,
            paymentMethodName: type,
        })
        setPayForm(a)
        setTradeDebt((totalsum - paySum) === null ? 0 : (totalsum - paySum))
        saqla(a, paySum, jamixisob, paymentId)
        setSaveModal(true)
    }

    const [activeqarz, setactiveqarz] = useState(false)

    function qarz() {
        setactiveqarz(!activeqarz)
        setTimeout(() => {
            debtRef.current.focus()
        }, 100)
        if (!tradeIdForEdit) {
            setEnterPaidSum(0)
        }
    }


    useEffect(() => {
        // if (saveCustomer) {
        //     if (MijozGuruxReducer.mijozgurux) {
        //         const ArrayLength = MijozGuruxReducer.mijozgurux.length
        //         selectCustomer({value: MijozGuruxReducer.mijozgurux[ArrayLength - 1].id})
        //     }
        //     setSaveCustomer(false)
        // }
    }, [])


    function toggle() {
        if (!holdOnReducer.holdOn) {
            toast.info("Ma'lumot yo'q")
        } else {
            setActiveHoldOn(!activeHoldOn)
        }

    }


    const [turli, setturli] = useState(false)
    const [payForm, setPayForm] = useState([])


    function clear() {
        setushlanumber(null)
        setarr1([])
        setPayForm([])
        setturli(false)
        clearSuccess()
        setCustomerPercent(0)
        setactiveqarz(false)
        setEnterPaidSum(0)
        setDescriptionHoldOn('')
    }

    const [grossPriceType, setGrossPriceType] = useState(false)
    const [grossPriceTypeString, setGrossPriceTypeString] = useState('DONA')


    function changeGrossPriceType(value) {
        setGrossPriceTypeString(value)
        setGrossPriceType(value === 'OPTOM')
        setarr1([])
    }


    function toggle9() {
        setturli(!turli)
        if (!tradeIdForEdit) {
            setPayForm([])
        }
    }

    function payDetails() {
        setturli(!turli)
        if (!tradeIdForEdit) {
            payForm.push({
                sum: jamixisob,
                paymentMethodId: PayReducer.paymethod[0].id,
                paymentMethodName: PayReducer.paymethod[0].name,
                edit: true
            })
            let a = [...payForm]
            setPayForm(a)
        }
    }

    const [payTotalSum, setTotalSUm] = useState(0)

    function CalcPayForm() {
        let sum = 0
        payForm.map(item => {
            sum += parseInt(item.sum)
        })
        setTotalSUm(sum)
    }

    useEffect(() => {
        CalcPayForm()
    }, [payForm])


    function AddPayForm() {
        let sum = 0
        payForm.map(item => {
            sum += parseInt(item.sum)
        })
        let IsIndex = payForm.length
        payForm.push({
            sum: jamixisob - sum,
            paymentMethodId: PayReducer.paymethod[IsIndex].id,
            paymentMethodName: PayReducer.paymethod[IsIndex].name,
            edit: true
        })
        let a = [...payForm]
        setPayForm(a)
    }

    function deletePayForm(index) {
        payForm.splice(index, 1)
        let a = [...payForm]
        setPayForm(a)
    }

    function changePayForm(e, index) {
        let a = payForm
        console.log(a)
        if (e.target.name === 'paymentMethodId') {
            let type = PayReducer.paymethod.find(item => item.id === e.target.value).name
            a[index][e.target.name] = e.target.value
            a[index].paymentMethodName = type
            let b = [...payForm]
            setPayForm(b)
        } else {
            const newArr = payForm.map((obj, val) => {
                if (val === index) {
                    return {...obj, sum: e.target.value};
                }
                return obj;
            })
            setPayForm(newArr)
        }
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const style = {
        position: "absolute",
        top: '400px',
        right: '500px'

    }


    useEffect(() => {
        if (tradeIdForEdit) {
            console.log('tradeIdFor',tradeIdForEdit)
            if (SavdoQoshishReducer.tradeOne) {
                setlastTradeActive(false)
                const {
                    branchId,
                    date,
                    debtSum,
                    gross,
                    userId,
                    paidSum,
                } = SavdoQoshishReducer.tradeOne
                let editArray = []
                changeGrossPriceType(gross ? 'OPTOM' : 'DONA')
                setMainBranchId(branchId)
                setCustomer(SavdoQoshishReducer.tradeOne?.customerId)
                setCustomerPercent(SavdoQoshishReducer.tradeOne?.customerPercent)
                setUserHoldOn(userId)
                setThisDay(formatDateMinus(date))
                setNoChangesPaidSum(paidSum)
                SavdoQoshishReducer.tradeOne?.tradeProductDtoList?.map(val =>
                    editArray.push({
                        id: val?.id,
                        productId: val?.productId,
                        noChangesPrice: val?.salePrice,
                        totalSalePrice: val?.totalSalePrice,
                        noChangesTotalSalePrice: val?.salePrice * val?.quantity,
                        price: val?.totalSalePrice / val?.quantity,
                        measurementName: val?.measurementName,
                        quantity: val?.quantity,
                        noQuantity: val?.quantity,
                        amount: val?.amount + val?.quantity,
                        name: val?.productName,
                        delete: val.delete,
                        disabled: false,
                        active: false,
                    })
                )
                if (SavdoQoshishReducer.tradeOne?.paymentDtoList) {
                    if (SavdoQoshishReducer.tradeOne.paymentDtoList.length > 1) {
                        setEditActiveButton('turli')
                        let editFormPay = []
                        SavdoQoshishReducer.tradeOne.paymentDtoList.map(item => {
                            editFormPay.push({...item, edit: false})
                        })
                        setPayForm(editFormPay)
                    } else if (debtSum > 0) {
                        setEditActiveButton('qarz')
                        setEnterPaidSum(paidSum)
                        setPayMethodId(SavdoQoshishReducer.tradeOne.paymentDtoList[0].paymentMethodId)
                    } else {
                        SavdoQoshishReducer.tradeOne.paymentDtoList?.map(item => {
                            setEditActiveButton(item.paymentMethodId)
                            let editFormPay = []
                            SavdoQoshishReducer.tradeOne.paymentDtoList.map(item => {
                                editFormPay.push({...item, edit: false})
                            })
                            setPayForm(editFormPay)
                            setEnterPaidSum(paidSum)
                            setPayMethodId(SavdoQoshishReducer.tradeOne.paymentDtoList[0].paymentMethodId)
                        })
                    }
                }
                setarr1(editArray)
            }
        }
    }, [SavdoQoshishReducer.getOneBoolean])


    useEffect(() => {
        // if (users.getTrade && activeHoldOn) {
            getHoldOn(mainBranchId ? mainBranchId : users.branchId)
        // }
    }, [SavdoQoshishReducer.current, holdOnReducer.current, mainBranchId, activeHoldOn])
    useEffect(() => {
        getBolim(users.businessId)
        getFirma(users.businessId)
        getPay()
        getOneBusiness(users.businessId)
    }, [])
    useEffect(() => {
        if (!tradeIdForEdit) {
            setCustomer(null)
            setCustomerPercent(0)
        }
        getInvoice(mainBranchId ? mainBranchId : users.branchId)
    }, [mainBranchId])


    const [loadingProduct, setLoadingProduct] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadingProduct(true)
        }, 200)
    }, [MaxsulotlarRoyxariReducer.getBoolean])

    useEffect(() => {
            setLoadingProduct(false)
    }, [])

    useEffect(() => {
        setLoadingProduct(false)
        if (BolimReducer.bolimlar.length > 0) {
            getProductForShopping({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                categoryId: categoryId
            })
        }
    }, [BolimReducer.getBoolean, mainBranchId, categoryId])
    useEffect(() => {
        getCustomersForTrade(mainBranchId ? mainBranchId : users.branchId)
    }, [CustomerReducer.current, mainBranchId])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [SavdoQoshishReducer.getTradeBool])

    useEffect(() => {
        setLoading(false)
        if (users.getTrade && lastTradeActive) {
            getTradeByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page: 0,
                    size: 10,
                    invoice: tradeIdSearch === "" ? null : tradeIdSearch
                }
            })
        }

    }, [tradeIdSearch, mainBranchId, lastTradeActive])

    function getTradeByForEdit(tradeId) {
        setTradeIdForEdit(tradeId)
        getTradeById(tradeId)
    }

    useEffect(() => {
        if (match.params.id) {
            getTradeById(match.params.id)
            setTradeIdForEdit(match.params.id)
        }
    }, [])

    const CustomerOptions = CustomerReducer.customersTrade.length > 0 ? [{
        value: "ALL",
        label: "Mijozni tanglang",
        search: "Mijozni tanglang",
        phoneNumber: null,
    }, ...CustomerReducer.customersTrade.map((item) => ({
        label: item.debt > 0 ? <span style={{color: "red"}} key={item.name}>{`${item.name} (${item.debt})`}</span> :
            <span style={{color: "green"}} key={item.name}>{`${item.name} (${item.debt})`}</span>,
        value: item.id,
        search: item.name,
        phoneNumber: item.phoneNumber,
    }))] : [{
        value: "ALL",
        label: "Mijozni tanglang",
        search: "Mijozni tanglang",
        phoneNumber: null,
    }]


    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toUpperCase() : word.toLowerCase();
        }).replace('_', ' ');
    }

    return (
        <div className={"shopping"}>
            <div style={{display: printDisplay}} className={'shoppingmodal p-2'} ref={componentRef}>
                <div className={'d-flex justify-content-center align-items-center'}>
                    {
                        checkReducer.check ?
                            checkReducer.check.photoId ?
                                <Imagecom id={checkReducer.check.photoId}/> : ''
                            : ''
                    }
                </div>
                <h2 className={'text-center'}>{
                    checkReducer.check ?
                        checkReducer.check.name : ''
                }
                </h2>
                {
                    checkReducer.check ?
                        <div dangerouslySetInnerHTML={{__html: checkReducer.check.description}}>
                        </div>
                        : ''
                }
                <br/>
                <div className={'d-flex justify-content-between align-items-center'}>
                    <h4 style={{fontSize: 12, fontWeight: 600}}>
                        {
                            moment(thisDay).format("DD:MM:YYYY")
                        }
                    </h4>
                    <h4 style={{fontSize: 12, fontWeight: 600}}>
                        {
                            moment(new Date()).format("HH:mm:ss")
                        }
                    </h4>
                </div>
                <div className={'d-flex justify-content-between align-items-center'}>
                    <h4 style={{fontSize: 12, fontWeight: 600}}>
                        Savdo raqami:
                    </h4>
                    <h4 style={{fontSize: 12, fontWeight: 600}}>
                        {
                            SavdoQoshishReducer.treadeId?.invoice
                        }
                    </h4>
                </div>
                <div className={'d-flex align-items-center justify-content-between'}>
                    <h4 style={{fontSize: 12, fontWeight: 600}}>Mijoz: </h4>
                    {
                        CustomerReducer.customersTrade ?
                            CustomerReducer.customersTrade.filter(val => {
                                if (val.id === customer) {
                                    return val
                                }
                            })?.map(item => <h5 style={{fontSize: 12, fontWeight: 600}}
                                                key={item.id}> {item.name}</h5>) : ''
                    }
                </div>
                <div style={{borderBottom: "1px dashed #000"}}></div>
                <div className={'mt-3 table-responsive'}>
                    {
                        traderArray.filter(itemDelete => itemDelete.delete === false).map((item, index) => <div
                            key={item.id}>
                            <h4 style={{fontSize: 12, fontWeight: 600}}>{index + 1}{".  "}{item.name}</h4>
                            <div style={{marginLeft: 20, marginTop: -7}}
                                 className={"d-flex align-items-center justify-content-between"}>
                                <h4 style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    lineHeight: 1
                                }}>
                                    {item.quantity} {item.measurementName} * {item.price} So'm</h4>
                                <h4 style={{fontSize: 12, fontWeight: 600, lineHeight: 1}}>
                                    = {parseFloat(item.totalSalePrice).toFixed(0)} So'm
                                </h4>
                            </div>
                        </div>)
                    }
                </div>
                <div style={{borderBottom: "1px dashed #000", marginTop: 20}}></div>
                <div className={'d-flex'}>

                    <div style={{width: "100%"}}>
                        <div className={"d-flex justify-content-between"}>
                            <h4 style={{fontSize: 14, fontWeight: 800}}>Jami: </h4>
                            <h4 style={{
                                fontSize: 14,
                                fontWeight: 800
                            }}>{jamixisob} So'm</h4>
                        </div>

                        {
                            payForm.map(item =>
                                <div className={"d-flex justify-content-between"}>
                                    <h4 style={{fontSize: 13, fontWeight: 600}}>{camelize(item.paymentMethodName)}:</h4>
                                    <h4 style={{
                                        fontSize: 13,
                                        fontWeight: 600
                                    }}>{item.sum} So'm</h4>
                                </div>
                            )
                        }
                        <div className={"d-flex justify-content-between"}>
                            <h4 style={{fontSize: 13, fontWeight: 600}}>To'langan summa:</h4>
                            <h4 style={{
                                fontSize: 13,
                                fontWeight: 600
                            }}>
                                {jamixisob - tradeDebt} So'm</h4>
                        </div>
                        {
                            customer ?
                                <div className={"d-flex justify-content-between"}>
                                    <h4 style={{fontSize: 14}}>Bugungi nasiya: </h4>
                                    <h4 style={{
                                        fontSize: 14,
                                    }}>{tradeDebt} So'm</h4>
                                </div> : ''
                        }
                        {
                            customer ?
                                <div className={"d-flex justify-content-between"}>
                                    <h4 style={{fontSize: 14, fontWeight: 800}}>Umumiy qarz: </h4>
                                    <h4 style={{
                                        fontSize: 14,
                                        fontWeight: 800
                                    }}>{SavdoQoshishReducer.treadeId?.customerDebt} So'm</h4>
                                </div> : ''
                        }

                    </div>
                </div>
                <div style={{borderBottom: "1px dashed #000"}}></div>
                {
                    checkReducer.check ?
                        <div dangerouslySetInnerHTML={{__html: checkReducer.check.footer}}>
                        </div>
                        : ''
                }
            </div>
            <div className={'savdoOynaContainers'}>
                <div className="savdoNavbar">
                    <div className="navbarLeft d-flex justify-content-between align-items-center">
                        <div className={'d-flex align-items-center'}>
                            <h5 className={'me-4'}>{t('ProductList.8')}</h5>
                            <select className='bazaSelect1' onChange={(e) => {
                                setMainBranchId(e.target.value)
                                setarr1([])
                            }}
                                    disabled={match.params.remainId || tradeIdForEdit ? true : false}
                                    value={mainBranchId}>
                                {
                                    users.branches.map(item => <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>)
                                }
                            </select>
                        </div>

                        {
                            (tradeIdForEdit) && match.params.remainId ? <h5>
                                    <h5 className={'ms-5 align-items-center'}>Mahsulot Qaytarish</h5>
                                </h5> :
                                tradeIdForEdit ?
                                    <h5 className={'ms-5 align-items-center'}>Savdo Tahrirlanmoqda</h5> :
                                    <h5 className={'ms-5 align-items-center'}>Savdo</h5>
                        }
                        <div>
                            <input type="date" value={thisDay} onChange={(e) => setThisDay(e.target.value)}
                                   className={'form-control'}/>
                        </div>
                    </div>
                    <div className="navbarRigth d-flex overflow-hidden">
                        <select className={'sss2'} value={grossPriceTypeString}
                                onChange={(e) => changeGrossPriceType(e.target.value)}
                                id={'grossPriceType'} disabled={tradeIdForEdit ? true : IsGross}>
                            <option value={'DONA'}>dona</option>
                            <option value={'OPTOM'}>optom</option>
                        </select>
                        {tradeIdForEdit  ? "" :
                            <button className={'btn'} onClick={toggle} style={{lineHeight: '12px'}}
                                    data-tip="Bu menuda mijoz savdolari vaqtinchalik saqlanadi">{t('Trade.21')}</button>
                        }

                        <ReactTooltip/>

                        {
                            users.getTrade &&
                            <button className={'btn btn-primary'} onClick={toggle4} style={{lineHeight: '12px'}}
                            >Oxirgi savdolar
                            </button>
                        }


                        <Link to={'/main/dashboard'}><img className='headerImgStyle' src={img6} onClick={() => {
                            savdooynasi()
                            clear()
                        }}
                                                       alt=""/></Link>
                    </div>
                </div>
                <div className="savdoBlock col-md-12">
                    <div className="savdoBlockLeft">
                        <div className="selectBox">
                            <div className="col-md-12 p-0 d-flex justify-content-between">
                                <div className="col-md-5 d-flex justify-content-center">
                                    <div style={{width: 250}}>
                                        <Select
                                            isDisabled={tradeIdForEdit ? true : false}
                                            value={
                                                CustomerOptions.filter(option =>
                                                    option.value === customer)
                                            }
                                            placeholder={"Mijozni tanlang..."}
                                            options={CustomerOptions}
                                            onChange={selectCustomer}
                                            filterOption={(option, searchText) => {
                                                return option.data?.search?.toLowerCase().includes(searchText.toLowerCase()) || option.data?.phoneNumber?.toLowerCase().includes(searchText.toLowerCase());
                                            }}
                                        />
                                    </div>
                                    {
                                        !tradeIdForEdit && users.addCustomer ?
                                            <button onClick={addCustomerToggle}
                                                    className={'btn btn-outline-primary fw-bold'}>+
                                            </button> : ''
                                    }

                                </div>
                                {
                                    match.params.remainId ? " " :
                                        <div className="col-md-7 p-0 position-relative">
                                            <input ref={inputRef} className="form-control  img-fluid" type="text"
                                                   value={search}
                                                   onChange={mahsulotnomi}
                                                   autoFocus={true}
                                                   placeholder={'Product Name / Shtrix code'}/>
                                            {
                                                MaxsulotlarRoyxariReducer.productSearch.length > 0 && isViewSearchProduct &&
                                                <div className={'combo-trade-array position-absolute z-index'}
                                                     style={{maxHeight: 400, overflowY: "scroll"}}>
                                                    {
                                                        MaxsulotlarRoyxariReducer.productSearch.map(item =>
                                                            <button key={item.id} onClick={() => pushesh(item)}>
                                                                <p className={'p-0 m-0'}>{item.name} ({item.barcode})</p>
                                                                <p className={'p-0 m-0'}>Miqdori: {item.amount} {item.measurementName}</p>
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            }
                                        </div>

                                }
                            </div>
                        </div>
                        <div className="table-responsive tbodyY">
                            <table className={'table '}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('ProductList.1')}</th>
                                    <th className={'text-center'}>{t('ProductEdit.7')}</th>
                                    <th>{t('Trade.14')}</th>
                                    <th>. . .</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    arr1.map((item, index) =>
                                            !item.delete
                                            && (
                                                <tr
                                                    key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>
                                                        <div className="p-0 align-items-center d-flex gap-2"
                                                             style={{width: 'max-content'}}>
                                                            <div>
                                                                <button disabled={item?.disabled}
                                                                        onClick={() => sMinus(index)}
                                                                        className={'btn btn-outline-danger rounded-circle border-3'}>-
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <InputNumber
                                                                    value={item?.quantity}
                                                                    min={0}
                                                                    step={'number'}
                                                                    max={match.params.remainId && item?.noQuantity}
                                                                    onChange={(e) => {
                                                                        changeCount(e, index)
                                                                    }}
                                                                    style={{
                                                                        padding: '5px',
                                                                        border: '1px solid darkred',
                                                                        width: '100px',
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={() => setCount(item?.productId)}
                                                                    className={'btn btn-outline-primary rounded-circle border-3'}>+
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <p className={'m-0 p-0 '}>{item?.measurementName}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10"> {
                                                            item?.active ?
                                                                <p className={'text-danger text-center fw-2 p-0 m-0'}>Omborda {item?.amount} {item?.measurementName} mahsulot
                                                                    bor ! </p> : ''
                                                        }</div>
                                                    </td>
                                                    <td>
                                                        {
                                                            item?.noChangesPrice !== item?.price &&
                                                            <del>{parseFloat(item?.noChangesPrice).toFixed(0)} So'm</del>
                                                        }
                                                        <InputNumber
                                                            value={item?.price}
                                                            min={0}
                                                            disabled={IsDiscount}
                                                            onChange={(e) =>
                                                                handleChangeBuyPrice(e, index)}
                                                            style={{
                                                                padding: '5px',
                                                                border: '1px solid darkred',
                                                                width: '100px',
                                                            }}
                                                        />
                                                    </td>
                                                    <td>

                                                        {
                                                            item?.noChangesPrice !== item?.price &&
                                                            <del>{parseFloat(item?.noChangesTotalSalePrice).toFixed(0)} So'm</del>
                                                        }
                                                        <br/>
                                                        <p>                                                        {parseFloat(item?.totalSalePrice).toFixed(0)} So'm
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteM(index, item.id)}
                                                            className={'btn btn-outline-dark border-2 rounded-circle'}>x
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="maxSoniBox">
                            <h6 className='d-flex align-items-center'>{t('Trade.15')}:{xisob}</h6>
                            <div>
                                {
                                    tradeIdForEdit || match.params.remainId ?
                                        <h6>Eski to'lov: {noChangesPaidSum} so'm</h6> : ''
                                }
                                <h6>{t('Trade.14')}: {
                                    jamixisob
                                } So'm</h6>

                            </div>
                        </div>
                        <hr style={{margin: '2px'}}/>
                        <div className={'chegirmalarBox'}>
                            <div className='d-flex'>
                                <p>{t('Trade.28')}:</p>
                                <img src="" alt=""/>
                                <p>{customerPercent} %</p>
                            </div>
                        </div>
                    </div>
                    {
                        match.params.remainId ? <div className="savdoBlockRigth"></div> :
                            <div className="savdoBlockRigth">
                                {
                                    BolimReducer.bolimlar?.length > 0
                                    && <select className={'form-control'} value={categoryId}
                                               onChange={(e) => setCategoryId(e.target.value)} style={{width: '50%'}}>
                                        {
                                            BolimReducer.bolimlar.map(item =>
                                                <option value={item.id}>{item.name}</option>)
                                        }
                                        <option value={users.businessId}>--- Kategoriyalar</option>
                                    </select>
                                }
                                <div className={'maxsulotImgBlock'}>
                                    {
                                        loadingProduct ?
                                            MaxsulotlarRoyxariReducer.productForShopping.length > 0 ?
                                                MaxsulotlarRoyxariReducer.productForShopping.map((item, index) => <div
                                                    className={'maxsuImgBox'}
                                                    key={index}>
                                                    <button onClick={() => {
                                                        pushesh(item)
                                                    }} className={'trade-button'}>
                                                        {
                                                            item.photoId === null ?
                                                                <Imagecom/>
                                                                : <Imagecom id={item.photoId}/>
                                                        }
                                                        <h6>{item.name}</h6>
                                                        <p className={'fw-bold'}>{!grossPriceType ? item.salePrice : item.grossPrice} So'm</p>
                                                    </button>
                                                </div>) : <div>
                                                    <h4 className={'text-center'}>{MaxsulotlarRoyxariReducer.message}</h4>
                                                </div>
                                            : <Loading/>
                                    }
                                </div>
                            </div>

                    }
                </div>
                <div className="col-md-12 p-2 py-3 gap-4 d-flex justify-content-center flex-wrap">
                    {
                        tradeIdForEdit ? '' :
                            <button onClick={toggle8}
                                    className={'col-sm-6  col-md-2 p-3 btn btn-warning'}>{t('Trade.21')}
                            </button>
                    }
                    {
                        tradeIdForEdit ? editActiveButton === "qarz" ? '' :
                                <button className={'col-sm-6 col-md-2  p-3 btn btn-primary'}
                                        onClick={payDetails}>{t('Trade.39')} </button>
                            : <button className={'col-sm-6 col-md-2 p-3 btn btn-primary'}
                                      onClick={payDetails}>{t('Trade.39')} </button>
                    }
                    {
                        tradeIdForEdit ? editActiveButton === "turli" ? "" :
                                <button onClick={customer ? qarz : () => {
                                    toast.error('Mijoz tanlanmagan !')
                                }
                                } className={'col-sm-6 col-md-2 p-3 btn btn-info'}>{t('Trade.45')}</button>
                            : <button onClick={customer ? qarz : () => {
                                toast.error('Mijoz tanlanmagan !')
                            }
                            } className={'col-sm-6 col-md-2 p-3 btn btn-info'}>{t('Trade.45')}</button>
                    }

                    {
                        PayReducer.paymethod &&
                        PayReducer.paymethod.map(item =>
                            match.params.remainId || tradeIdForEdit ?
                                editActiveButton === item.id &&
                                <button key={item.id} style={{width: 'max-content'}}
                                        onClick={() => saveTrade(item.id, item.name)}
                                        className={'btn btn-success col-md-3 p-3 '}>
                                    {camelize(item.name)}
                                </button> : <button key={item.id} style={{width: 'max-content'}}
                                                    onClick={() => saveTrade(item.id, item.name)}
                                                    className={'btn btn-success p-3  col-md-3'}>
                                {camelize(item.name)}
                            </button>
                        )

                    }
                    {
                        !tradeIdForEdit &&
                        <button onClick={clear} className={'btn btn-danger p-2 col-md-2'}>Tozalash</button>
                    }
                </div>
            </div>
            <Modal isOpen={activeHoldOn} toggle={toggle}>
                <ModalHeader>
                    {t('Trade.21')}
                </ModalHeader>
                <ModalBody>
                    <table className={'table'}>
                        <thead>
                        <tr>
                            <th>T/R</th>
                            <th>{t('Trade.18')}</th>
                            <th>{t('Trade.12')}</th>
                            <th>{t('Trade.14')}</th>
                            <th className={'text-center'}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            holdOnReducer?.holdOn ?
                                holdOnReducer?.holdOn.map((item, index) => <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.totalSum} {grossPriceType === "DOLLAR" ? '$' : "so'm"}</td>
                                    <td>{item?.quantity} </td>
                                    <td>
                                        {
                                            users.editTrade &&
                                            <button onClick={() => savdooynakochirish(item.id)} className={'kv'}> |
                                            </button>
                                        }
                                        {
                                            users.deleteTrade &&
                                            <button onClick={() => deleteHoldOn(item.id)} className={'ocbutton'}>X
                                            </button>
                                        }

                                    </td>
                                </tr>)
                                : <div>
                                    <h4 className={'text-center'}>{holdOnReducer.message}</h4>
                                </div>
                        }
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'}
                            onClick={() => setActiveHoldOn(false)}>{t('Buttons.7')}</button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={addCustomerActive} toggle={addCustomerToggle}>
                <form>
                    <ModalHeader>
                        {t('CustomAll.4')}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor={'nomi'}>Mijoz qo'shish</label>
                        <input
                            id={'nomi'} type="text"
                            placeholder={'Mijoz ismi'}
                            className={'form-control mt-1'}
                            onChange={(e) => dispatch(
                                {
                                    type: 'name',
                                    payload: e.target.value
                                }
                            )}
                        />
                        {IsCheck && !state.name && <p
                            className={'text-danger text-center p-0 m-0'}>Ismni kiriting !</p>}
                        <label className={'mt-1'} htmlFor={'filial'}>{t('CustomAll.5')}</label>
                        <Select
                            required={true}
                            onChange={(e) => dispatch({type: 'branchId', payload: e.value})}
                            placeholder={"Filialni tanlang..."}
                            options={users.branches.map(item => ({label: item.name, value: item.id}))}
                            isClearable={true}
                        />
                        {IsCheck && !state.branchId && <p
                            className={'text-danger text-center p-0 m-0'}>Filialni tanglang</p>}
                        <label className={'mt-1'} htmlFor={'tel'}>{t('Buttons.14')}</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            className={'form-control'}
                            onChange={(e) => dispatch({type: 'phoneNumber', payload: e})}/>
                        {IsCheck && !state.phoneNumber && <p
                            className={'text-danger text-center p-0 m-0'}>Telefon raqamni
                            kiriting</p>}
                        <label htmlFor={'foizda'}>{t('Buttons.15')}</label>
                        <input type="text"
                               onChange={(e) => dispatch({type: 'percent', payload: e.target.value})}
                               placeholder={'Foiz'}
                               defaultValue={''}
                               className={'form-control mt-1'}
                               id={'foizda'}/>
                        {IsCheck && !state.percent && <p
                            className={'text-danger text-center p-0 m-0'}>Foizni kiriting</p>}
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-danger'} type={"button"}
                                onClick={addCustomerToggle}>{t('Buttons.7')}</button>
                        <button className={'btn btn-success'} type={"button"}
                                onClick={addCustomer}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <Modal isOpen={turli} toggle={toggle9}>
                <ModalHeader>

                    <h3><strong>{t('Trade.39')}:</strong> {
                        jamixisob}</h3>
                    <h4 className={'text-error'}>Faqat So'mda kiriting !</h4>
                </ModalHeader>
                <ModalBody>
                    {
                        payForm.map((item, index) =>
                            <div key={index} className={'d-flex justify-content-around align-items-end mb-2'}>
                                <div className={'col-md-4'}>
                                    <label htmlFor={'turi'}>To'lov turi</label>
                                    <select className={'form-control'} name={'paymentMethodId'}
                                            value={item.paymentMethodId}
                                            onChange={(e) => changePayForm(e, index)}
                                            disabled={!item.edit}
                                            id={'turi'}>
                                        {
                                            PayReducer.paymethod.map(item =>
                                                <option key={item.id} value={item.id}
                                                        disabled={payForm.some(val => val.paymentMethodId === item.id)}
                                                >{camelize(item.name)}</option>)
                                        }
                                    </select>
                                </div>
                                <div className={'col-md-4'}>
                                    <label htmlFor={'miqdor'}>To'lov summasi</label>
                                    <input type="number" value={item.sum} placeholder={'0'}
                                           name={'sum'} onChange={(e) => changePayForm(e, index)}
                                           className={'form-control'}/>
                                </div>
                                {
                                    item.edit && <div className="col-md-3">
                                        <label htmlFor=""></label>
                                        <button onClick={() => deletePayForm(index)}
                                                className={'btn btn-danger mt-2'}>Delete
                                        </button>
                                    </div>
                                }

                            </div>
                        )
                    }
                    <div style={{width: '94%', marginLeft: '3%', marginTop: '15px'}}>
                        {
                            payForm.length < 3 && <button className={'btn btn-outline-primary form-control'}
                                                          onClick={AddPayForm}>Add Pay Method
                            </button>
                        }

                    </div>
                    <div>
                        <p>Jami
                            Summa: {jamixisob} so'm </p>
                        <p>To'langan Summa :{payTotalSum} so'm</p>
                        <p>Qarz: {jamixisob - parseFloat(payTotalSum)} so'm</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={toggle9}>{t('Buttons.7')}</button>
                    <button onClick={saveTradeByDifferentPayment}
                            className={'btn btn-success m-1'}>
                        {t('Buttons.6')}
                    </button>
                </ModalFooter>
            </Modal>
            {/*<Modal isOpen={qaytim} toggle={toggleQaytim}>*/}
            {/*    <ModalHeader>*/}
            {/*        <h6>Qaytim </h6>*/}
            {/*        <h6>To'lanishi kerak bo'lgan summa: {jamixisob} UZB</h6>*/}
            {/*    </ModalHeader>*/}
            {/*    <ModalBody>*/}
            {/*        <label htmlFor="">Berilgan summani kiriting</label>*/}
            {/*        <input type="number" className={'form-control'} value={input.qaytim}*/}
            {/*               onChange={qaytimchange}/>*/}
            {/*        <button onClick={ClickSumm} className={'btn btn-outline-success mt-2'}>50 000</button>*/}
            {/*        <button onClick={ClickSumm100} className={'btn btn-outline-success mt-2 ms-2'}>100 000*/}
            {/*        </button>*/}
            {/*        <button onClick={ClickSumm150} className={'btn btn-outline-success mt-2 ms-2'}>150 000*/}
            {/*        </button>*/}
            {/*        <button onClick={ClickSumm200} className={'btn btn-outline-success mt-2 ms-2'}>200 000*/}
            {/*        </button>*/}
            {/*        <button onClick={ClickSumm300} className={'btn btn-outline-success mt-2 ms-2'}>300 000*/}
            {/*        </button>*/}
            {/*        <button onClick={ClickSumm400} className={'btn btn-outline-success mt-2 ms-2'}>400 000*/}
            {/*        </button>*/}
            {/*        <br/>*/}
            {/*        <label className={'mt-2'} htmlFor="">Qaytim</label>*/}
            {/*        <input className={'form-control'} type="number"*/}
            {/*               value={input.qaytim == 0 || input.qaytim == "" ? 0 : input.qaytim - jamixisob}/>*/}
            {/*    </ModalBody>*/}
            {/*    <ModalFooter>*/}
            {/*        <button onClick={naqdSotish} className={'btn btn-outline-primary'}>Sotish</button>*/}
            {/*        <button onClick={toggleQaytim} className={'btn btn-outline-primary'}>Chiqish</button>*/}
            {/*    </ModalFooter>*/}
            {/*</Modal>*/}

            <Modal isOpen={ushla2} toggle={toggle8}>
                <ModalHeader>
                    {t('Trade.21')}
                </ModalHeader>
                <ModalBody>
                    <label htmlFor={'qisqa'}>{t('Trade.18')}</label>
                    <textarea className={'form-control'} id={'qisqa'} cols="20" rows="3" value={descriptionHoldOn}
                              onChange={(e) => setDescriptionHoldOn(e.target.value)}> </textarea>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggle8} className={'btn btn-danger'}>{t('Buttons.7')}</button>
                    <button onClick={ushla} className={'btn btn-success'}>{t('Buttons.6')} </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={activeqarz} toggle={qarz}>
                <ModalHeader>
                    {t('Trade.45')}
                </ModalHeader>
                <ModalBody>
                    <h3><strong>{t('Purchase.22')}:</strong> {jamixisob} So'm
                    </h3>
                    <h4 className={'text-error'}>Faqat So'mda kiriting !</h4>
                    <div className={'col-md-12 d-flex align-items-end justify-content-between'}>
                        <div className={'col-md-6'}>
                            <label htmlFor={'rrr'}>Qarz :{jamixisob - enterPaidSum} so'm </label>

                            <input type="number" ref={debtRef} className={'form-control'} id={'rrr'}
                                   value={enterPaidSum} onChange={(e) => {
                                if (/^0/.test(e.target.value)) {
                                    let value = e.target.value.replace(/^0/, "")
                                    setEnterPaidSum(value)
                                } else {
                                    setEnterPaidSum(e.target.value)

                                }
                            }}/>
                        </div>
                        <div className={'col-md-6'}>
                            <select className={'form-control'}
                                    value={payMethodIds}
                                    disabled={tradeIdForEdit}
                                    onChange={(e) => setPayMethodId(e.target.value)}
                            >
                                {PayReducer.paymethod &&
                                    PayReducer.paymethod.map(item =>
                                        <option value={item.id} key={item.id}>{camelize(item.name)}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <p data-tip="Avans berishingiz shart emas (To'lov qilinmasa hammasi qarz sifatida yoziladi)"
                       className={'btn btn-outline-primary mt-2 form-control'}>BATAFSIL</p>
                    <ReactTooltip/>
                </ModalBody>
                <ModalFooter>
                    <button type={'button'} onClick={qarz} className={'btn btn-danger'}>Chiqish</button>
                    <button onClick={saveTradeByDebt} className={'btn btn-success'}>
                        {t('Buttons.6')}
                    </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={lastTradeActive} toggle={toggle4}>
                <ModalHeader>
                    <p>{t('Trade.26')}</p>
                </ModalHeader>
                <ModalBody>
                    <div className={'col-md-12 '}>
                        <div className="col-md-12">
                            <label htmlFor="tradeId">Savdo raqami bo'yicha qidirish</label>
                            <input type="text" value={tradeIdSearch} onChange={(e) => setTradeIdSearch(e.target.value)}
                                   id={'tradeId'} className={'form-control'}/>
                        </div>
                        <div className={'d-flex justify-content-between mt-2'}>
                            {
                                users.getTrade || users.getTradeAdmin ?
                                    loading ?
                                        SavdoQoshishReducer?.trades?.list?.length > 0 ?
                                            <div>
                                                <div className="table-responsive table-wrapper-scroll-y"
                                                     style={{height: '400px'}}>
                                                    <table className='table table-striped table-bordered mt-4'>
                                                        <thead>
                                                        <tr>
                                                            <th>T/R</th>
                                                            <th>{t('Trade.4')}</th>
                                                            <th>Chek raqami</th>
                                                            <th>{t('Pagination.10')}</th>
                                                            <th>Amallar</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            SavdoQoshishReducer.trades?.list?.map((item, index) => <tr
                                                                key={item?.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{moment(new Date(item?.createdAt)).format('lll')}</td>
                                                                <td className={item.edit && 'bg-warning'}>{item?.invoice}</td>
                                                                <td>{item?.customerName}</td>
                                                                <td>
                                                                    <div className={'d-flex'}>
                                                                        {
                                                                            users.editTrade && item?.editable ?
                                                                                <button
                                                                                    onClick={() => getTradeByForEdit(item.id)}
                                                                                    className='taxrirlash'><img
                                                                                    src={Edit}
                                                                                    alt=""/> {t('Buttons.1')}
                                                                                </button>
                                                                                : ''
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>)
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> :
                                            <div className={'border border-2'}>
                                                <h4 className={'text-center'}>{SavdoQoshishReducer.message}</h4>
                                            </div> : <Loading/>
                                    : ''
                            }
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggle4}
                            className={'btn btn-outline-primary'}>{t('Buttons.7')}</button>
                </ModalFooter>
            </Modal>

            <ModalLoading isOpen={saveModal}/>
        </div>
    )
}

export default connect((checkReducer, holdOnReducer, MaxsulotlarRoyxariReducer, CustomerReducer, BolimReducer,
    PayReducer, users, SavdoQoshishReducer, allbusinessreducer), {
    getCustomersForTrade,
    getInvoice,
    getFirma,
    getPay,
    getBolim,
    savdooynasi,
    saveSavdolar,
    clearSuccess,
    saveHoldOn,
    saveCustomer,
    getHoldOn,
    deleteHoldOn,
    getBarcodeAndName,
    getProductForShopping,
    getTradeById,
    editSavdolar,
    getOneBusiness,
    getTradeByBranch
})(SavdoOynasi)
