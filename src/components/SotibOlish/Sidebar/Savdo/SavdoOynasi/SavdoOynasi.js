import ReactTooltip from 'react-tooltip';
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
import {InputNumber, QRCode} from "antd";
import allbusinessreducer, {getOneBusiness} from "../../SUPERADMIN/reducers/allbusinessreducer";
import Edit from "../../../../../img/Edit.png";
import Loading from "../../../../Loading";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import kassa from "../../../../../img/money bag coin2.svg"
import lastTrade from "../../../../../img/shopping basket.svg"
import back from "../../../../../img/arrow back.svg"
import searchIcon from "../../../../../img/Search.svg"
import waiting from "../../../../../img/money bag coinshop.svg"
import turliTolov from "../../../../../img/card-withdrawshop.svg"
import debtTrade from "../../../../../img/donate coin.svg"
import plastik from "../../../../../img/money check2.svg"
import bank from "../../../../../img/bank.svg"
import naqd from "../../../../../img/money coin.svg"
import trash from "../../../../../img/Trash.svg"
import products from "../../../../../img/package box 07shop.svg"
import minus from "../../../../../img/minus.svg"
import plus from "../../../../../img/plus.svg"
import remove from "../../../../../img/remove.svg"
import defaultProduct from '../../../../../img/image 3.jpg'
import {AddOrEditText} from "../../../../Components/MainHeaderText";
import {DeleteOutlined, EditOutlined, EnterOutlined, EyeOutlined, RetweetOutlined} from "@ant-design/icons";
import CommonTable from "../../../../Components/CommonTable";
import {CustomButton, DeleteButton, EditButton} from "../../../../Components/Buttons";
import XodimReducer, {getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import {BaseUrl} from "../../../../../middleware";
import {Input, Space, Typography} from 'antd';

const {Title} = Typography;

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
                         getBarcodeAndName, match, getTradeById, getTradeByBranch, getUserForFiltering, XodimReducer
                     }) {
    const {t} = useTranslation();
    const history = useHistory();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: t('Trade.5'),
            dataIndex: 'invoice',
            key: 'invoice',
            width: '80px'
        },
        // {
        //     title: t('Pagination.10'),
        //     dataIndex: 'customerName',
        //     key: 'customerName',
        // },
        // {
        //     title: t('ol.10'),
        //     dataIndex: 'userFio',
        //     key: 'userFio',
        // },
        // {
        //     title: t('ol.13'),
        //     dataIndex: 'branchName',
        //     key: 'branchName',
        // },
        // {
        //     title: t('ol.18'),
        //     dataIndex: 'paymentStatus',
        //     key: 'paymentStatus',
        // },
        // {
        //     title: t('ol.15'),
        //     dataIndex: 'totalSum',
        //     key: 'totalSum',
        //     render: (item) => <p className={'m-0'}>{item} so'm</p>
        // },
        // {
        //     title: t('ol.16'),
        //     dataIndex: 'paidSum',
        //     key: 'paidSum',
        //     render: (item) => <p className={'m-0'}>{item} so'm</p>,
        //     width: '100px'
        // },
        // {
        //     title: t('ol.17'),
        //     dataIndex: 'debtSum',
        //     key: 'debtSum',
        //     render: (item) => <p className={'m-0'}>{item} so'm</p>
        // },
        // {
        //     title: t('ol.20'),
        //     key: 'operation',
        //     width: 150,
        //     render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
        //         {
        //             users.getTrade &&
        //             <ButtonAnt type={'primary'} text={'Ko\'rish'} bgColor={'aqua'} onClick={() => {
        //                 viewTradeInfoById(item?.id)
        //             }
        //             } icon={<EyeOutlined/>}/>
        //         }
        //
        //         {
        //             users.editTrade && values.editable &&
        //             <ButtonAnt text={t('ol.78')} type={'primary'} onClick={() => {
        //                 history.push('/shopping/' + values?.id)
        //             }
        //             } icon={<EditOutlined/>}/>
        //         }
        //         {
        //             users.editTrade && values.editable &&
        //             <ButtonAnt text={t('mah.40')} type={'primary'} bgColor={'green'} onClick={() => {
        //                 history.push('/repeatProducts/' + values?.id + "/" + values?.id)
        //             }
        //             } icon={<EditOutlined/>}/>
        //         }
        //         {
        //             users.deleteTrade && values.editable && <ButtonAnt text={t('ol.79')} danger={true} type={'primary'}
        //                                                                onClick={() => values?.customerName ? deleteTradeByIdIsCustomer(item.id) : deleteTradeById(item.id)}
        //                                                                icon={<DeleteOutlined/>}/>
        //         }
        //
        //     </div>,
        // },
    ];

    const [open, setOpen] = useState(false);
    const [pinCode, setPinCode] = useState('')
    const [confirmedOpen, setConfirmedOpen] = useState(true);

    const showDrawer = () => {
        setOpen(!open);
    };
    const debtRef = useRef();
    const inputRef = useRef();
    const [changesId, setChangesId] = useState(null);
    const [paymentTypeCheck, setPaymentTypeCheck] = useState(null);
    const [mainBranchId, setMainBranchId] = useState(null)
    const [userId, setUserId] = useState({})
    const [thisDay, setThisDay] = useState(formatDateMinus(new Date()))
    const [IsCheck, setIsCheck] = useState(false)
    const [categoryId, setCategoryId] = useState('')
    const [state, dispatch] = useReducer(reducer, {
        name: '',
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


    const onCheckedPinCode = (text) => {
        setPinCode(text)
    };
    const sharedProps = {
        onChange: onCheckedPinCode,
    };


    useEffect(() => {
        console.log(pinCode, 'pincode')
        if (pinCode.length === 4) {
            if (userId?.pinCode) {
                if (userId?.pinCode == pinCode) {
                    setConfirmedOpen(false)
                    setPinCode('')
                } else {
                    if (pinCode) {
                        toast.error('Kodni to\'g\'ri kiriting !!!')
                    } else {
                        toast.warning('Kodni  kiriting !!!')
                    }
                }
            } else {
                toast.warning('Xodimni tanglang')

            }
        }
    }, [pinCode]);


    useEffect(() => {
        getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
    }, [mainBranchId]);

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


    const [addCustomerActive, setAddCustomerActive] = useState(false)

    function addCustomerToggle() {
        setAddCustomerActive(!addCustomerActive)
        setIsCheck(false)
        dispatch({
            type: 'reset',
            payload: {}
        })
    }

    function addCustomer() {
        if (!state.name || !state.phoneNumber || !state.percent) {
            setIsCheck(true)
        } else {
            saveCustomer({...state, branchId: mainBranchId ? mainBranchId : users.branchId})
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
            setChangesId(null)
        }
    }, [holdOnReducer.current])

    function savdooynakochirish(id) {
        if (holdOnReducer.holdOn) {
            holdOnReducer.holdOn.filter(val => {
                if (id == val.id) {
                    let holdOnArray = []
                    changeGrossPriceType(val.gross ? (t('mah.65')) : (t('mah.66')))
                    const findUser = XodimReducer.usersFiltering?.find(item => item.id === userId?.id)
                    setUserId(findUser)
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
                    toast.warning(t('mah.67'))
                }
            })
            toggle()
        }

    }


    const [IsSearchProductList, setIsSearchProduct] = useState([])

    function mahsulotnomi(e) {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search) {
            if (6 < search?.length) {
                const searchPro = setTimeout(() => {
                    getBarcodeAndName({
                        branchId: mainBranchId ? mainBranchId : users.branchId,
                        params: {
                            search,
                            isPurchase: false,
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
                            isPurchase: false,
                        }
                    })
                }, 500)
                return () => clearTimeout(searchPro)
            }
        } else {
            setIsSearchProduct([])
        }
    }, [search])

    useEffect(() => {
        if (MaxsulotlarRoyxariReducer?.productSearch && search) {
            setIsSearchProduct(MaxsulotlarRoyxariReducer.productSearch)
            let findProduct = MaxsulotlarRoyxariReducer.productSearch.length == 1
            if (findProduct) pushesh(MaxsulotlarRoyxariReducer.productSearch[0])
        }
        if (MaxsulotlarRoyxariReducer.isClearInput) {
            setIsSearchProduct([])
            setSearch('')
            inputRef.current.focus()
        }
    }, [MaxsulotlarRoyxariReducer.productSearch])


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


    function pushesh(val) {
        if (val.amount <= 0 && checkMinusShop) {
            toast.warning(t('mah.68'))
        } else {
            let someProduct = arr1.some(item => item.productId === val.id)
            if (someProduct) {
                setCount(val.id)
            } else {
                let mainPriceType = grossPriceType ? val.grossPrice : val.salePrice
                let mainPrice = mainPriceType - (mainPriceType * customerPercent / 100)
                setChangesId(val.id)
                arr1.unshift({
                    productId: val.id,
                    quantity: val.totalKg ? val.totalKg : 1,
                    changeInput: val.totalKg ? true : false,
                    name: val.name,
                    price: mainPrice,
                    totalSalePrice: (val.totalKg ? val.totalKg : 1) * mainPrice,
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
        setIsSearchProduct([])
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

    function sMinus() {
        arr1.map((item) => {
            if (item.productId === changesId) {
                item.quantity = item.quantity === 0 ? 0 : item.quantity - 1
                item.totalSalePrice = item.quantity * item.price
                item.noChangesTotalSalePrice = item.quantity * item.noChangesPrice
                item.active = item.quantity > item.amount;
                item.disabled = item.quantity === 0
            }
        })
        let a = [...arr1]
        setarr1(a)
    }


    function deleteM() {
        let IsTradeId = arr1.find(item => item.productId === changesId)
        if (!IsTradeId.id) {
            arr1.map((item, index) => {
                if (changesId === item.productId) {
                    arr1.splice(index, 1)
                }
            })
        } else {
            arr1.map((item) => {
                if (changesId === item.productId) {
                    item.delete = true
                }
            })
        }
        setChangesId(null)
        let a = [...arr1]
        setarr1(a)
    }

    const [customerPercent, setCustomerPercent] = useState(0)

    function selectCustomer(e) {
        setCustomer(e === "" ? null : e)
        if (e === '') {
            setCustomerPercent(0)
        } else {
            if (CustomerReducer.customersTrade.length > 0) {
                let customer = CustomerReducer.customersTrade.find(item => item.id === e)
                setCustomerPercent(customer.percent)
            }
        }

    }

    useEffect(() => {
        const productsArray = arr1.map(item => {
            let mainPrice = item.noChangesPrice - (item.noChangesPrice * customerPercent / 100)
            let totalPrice = item.noChangesTotalSalePrice - (item.noChangesTotalSalePrice * customerPercent / 100)
            return {...item, price: mainPrice, totalSalePrice: totalPrice}
        })
        console.log(productsArray)
        setarr1(productsArray)
    }, [customerPercent]);

    const [saveModal, setSaveModal] = useState(false)
    const [printDisplay, setPrintDisplay] = useState('none')


    useEffect(() => {
        if (SavdoQoshishReducer.success) {
            setTimeout(() => {
                if (ushlanumber) {
                    deleteHoldOn(ushlanumber)
                }
                handlePrint()
                setushlanumber(null)
                setarr1([])
                setTradeDebt(0)
                setTrader([])
                setThisDay(formatDateMinus(new Date()))
                setturli(false)
                setactiveqarz(false)
                setCustomerPercent(0)
                setCustomer(null)
                setEnterPaidSum(0)
                setTradeIdForEdit(null)
                setTradeIdSearch('')
                setDescriptionHoldOn('')
                setChangesId(null)
                clearSuccess()
                setPayForm([])
                if (SavdoQoshishReducer.editBoolean) {
                    history.push('/main/tradeList')
                }
            }, 1000)
        }
        setSaveModal(false)
    }, [SavdoQoshishReducer.current])


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


    function saveTrade() {
        let paymentName = PayReducer.paymethod.find(item => item.id === paymentTypeCheck)
        let a = []
        a.push({
            sum: jamixisob,
            paymentMethodId: paymentTypeCheck,
            paymentMethodName: paymentName.name,
        })
        setPayForm(a)
        saqla(a, jamixisob, jamixisob, 'TOLANGAN')
        setSaveModal(true)

    }

    function saveAllTrade() {
        if (arr1.length > 0) {
            if (paymentTypeCheck) {
                if (paymentTypeCheck === 'turli') {
                    payDetails()
                } else if (paymentTypeCheck === 'qarz') {
                    qarz()
                } else {
                    saveTrade()
                }
            } else {
                toast.warning('To\'lov usulini tanlang')
            }
        } else {
            toast.warning('Maxsulot tanlang')
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
                userId: userId.id,
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
                userId: userId.id,
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
            toast.warning(t('mah.69'))
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


    const [reactToast, setReactToast] = useState(false)

    function toggle() {
        if (!holdOnReducer.holdOn) {
            setReactToast(true)
            toast.info(t('mah.70'))
            setTimeout(() => {
                setReactToast(false)
            }, 1500)
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

    let componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    useEffect(() => {
        if (tradeIdForEdit) {
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
                changeGrossPriceType(gross ? (t('mah.65')) : (t('mah.66')))
                setMainBranchId(branchId)
                setCustomer(SavdoQoshishReducer.tradeOne?.customerId)
                setCustomerPercent(SavdoQoshishReducer.tradeOne?.customerPercent)
                const findUser = XodimReducer.usersFiltering?.find(item => item.id === userId)
                setUserId({...findUser,pinCode: (findUser?.pinCode ? findUser.pinCode : 1111)})
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
                        setEditActiveButton(t('mah.71'))
                        let editFormPay = []
                        SavdoQoshishReducer.tradeOne.paymentDtoList.map(item => {
                            editFormPay.push({...item, edit: false})
                        })
                        setPayForm(editFormPay)
                    } else if (debtSum > 0) {
                        setEditActiveButton(t('mah.72'))
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
        getPay(users.businessId)
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
        setLoadingProduct(true)
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
        setLoading(true)
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

    // const CustomerOptions = CustomerReducer.customersTrade.map((item) => ({
    //     name: item.debt > 0 ? <span style={{color: "red"}} key={item.name}>{`${item.name} (${item.debt})`}</span> :
    //         <span style={{color: "green"}} key={item.name}>{`${item.name} (${item.debt})`}</span>,
    //     id: item.id,
    // }))


    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toUpperCase() : word.toLowerCase();
        }).replace('_', ' ');
    }

    function checkImg(name) {
        if (name === 'NAQD') {
            return naqd;
        } else if (name === 'PLASTIK') {
            return plastik;
        } else {
            return bank
        }
    }


    return (
        <div>
            <div className={"shopping"}>
                <div className="shopping-header">
                    <div className="shopping-header-item">
                        <div>
                            <h6 className={'shop-header-text'}>{userId?.fio}</h6>
                            <p className={'m-0 p-0'}
                               style={{fontSize: '14px'}}>{users.branches?.find(item => item.id === mainBranchId ? mainBranchId : users.branchId)?.name}
                            </p>
                        </div>

                        <CustomButton size={'small'} icon={<RetweetOutlined/>}
                                      onClick={() => setConfirmedOpen(!confirmedOpen)}/>
                        {
                            (tradeIdForEdit) && match.params.remainId ? <h5>
                                    <h5 className={'shop-header-text'}>{t('mah.74')}</h5>
                                </h5> :
                                tradeIdForEdit ?
                                    <h5 className={'shop-header-text'}>{t('mah.75')}</h5> :
                                    <h5 className={'shop-header-text'}>{t('mah.76')}</h5>
                        }
                        <input type="date" value={thisDay} className={'shopping-datepicker'}
                               onChange={(e) => setThisDay(e.target.value)}
                        />

                    </div>
                    <div className="shopping-header-item">
                        <div>
                            <SelectAnt disabled={tradeIdForEdit ? true : IsGross}
                                       selectList={[{id: 'DONA', name: 'Dona'}, {id: 'OPTOM', name: 'Optom'}]}
                                       value={grossPriceTypeString}
                                       permission={false} onChange={(e) => changeGrossPriceType(e)}/>
                        </div>
                        {tradeIdForEdit ? "" :
                            <button className={'shopping-btn-header'} disabled={reactToast} onClick={toggle}
                                    data-tip={t('mah.79')}>
                                <p className={'shopping-btn-text-header'}>Kassaga olish</p>
                                <img src={kassa} className={'shopping-btn-header-icon'} alt="kassa"/>
                            </button>
                        }
                        <ReactTooltip/>
                        {
                            users.getTrade && !tradeIdForEdit &&
                            <div className={'shopping-btn-header'} onClick={toggle4}
                            ><p className={'shopping-btn-text-header'}>
                                {t('mah.80')}
                            </p>
                                <img src={lastTrade} className={'shopping-btn-header-icon'} alt="lastTrade"/>
                            </div>
                        }

                        <Link to={'/main/dashboard'} style={{backgroundColor: 'red'}} onClick={() => {
                            savdooynasi()
                            clear()
                        }} className={'shopping-btn-header'}>
                            <p className={'shopping-btn-text-header'} style={{color: '#ffffff'}}>Ortga</p>
                            <img src={back} className={'shopping-btn-header-icon'} alt="back"/>
                        </Link>
                    </div>
                </div>
                <div className="shopping-body">
                    <div style={{width: open ? '25%' : '5%'}} className="shopping-body-left">
                        <div className="shopping-products">
                            <div style={{justifyContent: open ? 'space-between' : "center"}} className={'d-flex'}>
                                {
                                    open && <div style={{width: '60%'}}>
                                        {
                                            BolimReducer.bolimlar?.length > 0
                                            &&
                                            <SelectAnt value={categoryId} onChange={(e) => setCategoryId(e)}
                                                       all={'Kategoriya tanlang'}
                                                       permission={true} selectList={BolimReducer.bolimlar}/>
                                        }
                                    </div>

                                }
                                {
                                    tradeIdForEdit ? '' :
                                        <div onClick={showDrawer}
                                             className={'shopping-left-product-btn'}>
                                            <img src={products} className={'btn-icon'} alt="waiting"/>
                                        </div>
                                }
                            </div>
                            {
                                open &&
                                <div className={'shopping-product-list'}>
                                    {
                                        MaxsulotlarRoyxariReducer.productForShopping.length > 0 ?
                                            MaxsulotlarRoyxariReducer.productForShopping.map((item, index) => <div
                                                className={'shop-product-card'}
                                                key={index} onClick={() => {
                                                pushesh(item)
                                            }}>
                                                {
                                                    item.photoId === null ?
                                                        <img className={'shop-product-image'} src={defaultProduct}
                                                             alt={item.name}/>
                                                        : <img className={'shop-product-image'}
                                                               src={`${BaseUrl}/attachment/download/${item.photoId}`}
                                                               alt="###"/>

                                                }
                                                <p className={'shop-product-name'}>{item.name}</p>
                                                <p className={'shop-product-price'}>{!grossPriceType ? item.salePrice : item.grossPrice} {t('mah.39')}</p>
                                            </div>) : <div>
                                                <h4 className={'text-center'}>{MaxsulotlarRoyxariReducer.message}</h4>
                                            </div>

                                    }
                                </div>

                            }
                        </div>
                    </div>
                    <div style={{width: open ? '45%' : '60%'}} className="shopping-body-middle">
                        <div className="shopping-body-header">
                            <div style={{width: '250px'}}>
                                <SelectAnt disabled={tradeIdForEdit ? true : false}
                                           all={'Mijozni tanlang'}
                                           selectList={CustomerReducer.customersTrade}
                                           onChange={selectCustomer}
                                           permission={true}
                                />
                            </div>
                            {
                                !tradeIdForEdit && users.addCustomer ?
                                    <button onClick={addCustomerToggle}
                                            className={'shopping-plus'}>+
                                    </button> : ''
                            }
                            {
                                match.params.remainId ? " " :
                                    <div className="shopping-search">
                                        <input ref={inputRef} type="text"
                                               value={search}
                                               onChange={mahsulotnomi}
                                               autoFocus={true}
                                               placeholder={"Maxsulot nomi yoki barcode"}/>
                                        <img src={searchIcon} alt="search"/>
                                        {
                                            IsSearchProductList.length > 0 &&
                                            <div className={'shopping-search-list'}>
                                                {
                                                    IsSearchProductList.map(item =>
                                                        <button className={'shopping-search-button'} key={item.id}
                                                                onClick={() => pushesh(item)}>
                                                            <p className={'p-0 m-0'}>{item.name} ({item.barcode}) </p>
                                                            <p className={'p-0 m-0'}>{t('mah.83')} {item.amount} {item.measurementName} ({grossPriceType ? item.grossPrice : item.salePrice} so'm)</p>

                                                        </button>
                                                    )
                                                }
                                            </div>
                                        }
                                    </div>

                            }
                        </div>
                        <div className="shopping-body-body">
                            <div className="table-responsive">
                                <table className={'shopping-table'}>
                                    <thead>
                                    <tr>
                                        <th width={30}>ID</th>
                                        <th>{t('ProductList.1')}</th>
                                        <th className={'text-center'}>{t('ProductEdit.7')}</th>
                                        <th className={'text-center'}>Narxi</th>
                                        <th className={'text-center'}>Jami</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        arr1.map((item, index) =>
                                                !item.delete
                                                && (
                                                    <tr style={{
                                                        height: '70px',
                                                        border: item.productId === changesId ? '2px solid red' : 'none',
                                                        cursor: 'pointer',
                                                    }}
                                                        key={item?.id} onClick={() => setChangesId(item.productId)}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.name}</td>
                                                        <td className={'text-center'}>
                                                            {
                                                                item.productId === changesId ?
                                                                    <div>
                                                                        <InputNumber
                                                                            value={item?.quantity}
                                                                            min={0}
                                                                            step={'number'}
                                                                            disabled={item.changeInput}
                                                                            max={match.params.remainId && item?.noQuantity}
                                                                            onChange={(e) => {
                                                                                changeCount(e, index)
                                                                            }}
                                                                            className={'shop-change-number'}
                                                                        />
                                                                        {item.measurementName}
                                                                    </div> :
                                                                    <p className={'m-0'}>{item.quantity} {item.measurementName}</p>
                                                            }

                                                            <div className="col-md-12"> {
                                                                item?.active ?
                                                                    <p style={{fontSize: '10px'}}
                                                                       className={'text-danger text-center p-0 m-0'}><strong
                                                                        style={{fontSize: '14px'}}> {item?.amount}</strong> {item?.measurementName} bor
                                                                        ! </p> : ''
                                                            }</div>
                                                        </td>
                                                        <td className={'text-center'}>
                                                            <div
                                                                className={'d-flex flex-column justify-content-start align-items-center'}>
                                                                {
                                                                    item?.noChangesPrice !== item?.price &&
                                                                    <del
                                                                        className={'mb-1 text-danger'}>{parseFloat(item?.noChangesPrice).toFixed(0)} {t('mah.39')}</del>
                                                                }
                                                                {
                                                                    item.productId === changesId ?
                                                                        <InputNumber
                                                                            value={item?.price}
                                                                            min={0}
                                                                            disabled={IsDiscount || item?.changeInput}
                                                                            onChange={(e) =>
                                                                                handleChangeBuyPrice(e, index)}
                                                                            className={'shop-change-number'}
                                                                        /> : item.price
                                                                }

                                                            </div>
                                                        </td>
                                                        <td className={'text-center'}>
                                                            <div className={'d-flex align-items-center flex-column'}>
                                                                {
                                                                    item?.noChangesPrice !== item?.price &&
                                                                    <del
                                                                        className={'mt-3 mb-1 text-danger'}>{parseFloat(item?.noChangesTotalSalePrice).toFixed(0)} {t('mah.39')}</del>
                                                                }
                                                                <p>                                                        {parseFloat(item?.totalSalePrice).toFixed(0)} {t('mah.39')}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        {/*<td>*/}
                                                        {/*    <button*/}
                                                        {/*        onClick={() => deleteM(index, item.id)}*/}
                                                        {/*        className={'shopTable-btn shopTable-btn-delete'}>x*/}
                                                        {/*    </button>*/}
                                                        {/*</td>*/}
                                                    </tr>
                                                )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style={{width: open ? '30%' : '35%'}} className="shopping-body-right">
                        <div className={'button-changes'}>
                            <div className={'btn-change'} onClick={sMinus}>
                                <img src={minus} className={'btn-change-icon'} alt="minus"/>
                                <p className={'btn-change-text'} style={{color: '#FF7272'}}>Kamaytirish</p>
                            </div>
                            {
                                !tradeIdForEdit &&
                                <div className={'btn-change'} onClick={() => setCount(changesId)}>
                                    <img src={plus} alt="plus" className={'btn-change-icon'}/>
                                    <p className={'btn-change-text'} style={{color: '#377DFF'}}>Qo'shish</p>
                                </div>
                            }

                            <button className={'btn-change border-0'} disabled={changesId ? false : true}
                                    onClick={deleteM}>
                                <img src={remove} alt="remove" className={'btn-change-icon'}/>
                                <p className={'btn-change-text'} style={{color: '#B0B7C3'}}>O'chirish</p>
                            </button>
                        </div>
                        <div className={'d-flex justify-content-between flex-wrap  align-items-center w-100'}>
                            {
                                tradeIdForEdit ? '' :
                                    <div onClick={toggle8}
                                         className={'shopping-btn-top2'}>
                                        <img src={waiting} className={'shopping-btn-icon'} alt="waiting"/>
                                        <p style={{color: '#FFC040'}} className={'shopping-btn-text'}>Ushlab turish</p>
                                    </div>
                            }
                            {
                                !tradeIdForEdit &&
                                <div onClick={clear} className={'shopping-btn-top2'}><img src={trash}
                                                                                          className={'shopping-btn-icon'}
                                                                                          alt="waiting"/>
                                    <p style={{color: '#4E5D78'}} className={'shopping-btn-text'}>Tozalash</p>
                                </div>
                            }
                        </div>
                        <div className={'d-flex justify-content-between flex-wrap  align-items-center w-100'}>
                            {
                                tradeIdForEdit ? editActiveButton === "qarz" ? '' :
                                        <div className={'shopping-btn-top2'}
                                             style={{border: paymentTypeCheck === 'turli' ? '3px solid red' : 'none'}}
                                             onClick={() => setPaymentTypeCheck('turli')}><img src={turliTolov}
                                                                                               className={'shopping-btn-icon'}
                                                                                               alt="waiting"/>
                                            <p style={{color: '#38CB89'}} className={'shopping-btn-text'}>To'lov turi</p>
                                        </div>
                                    : <div className={'shopping-btn-top2'}
                                           style={{border: paymentTypeCheck === 'turli' ? '3px solid red' : 'none'}}
                                           onClick={() => setPaymentTypeCheck('turli')}><img src={turliTolov}
                                                                                             className={'shopping-btn-icon'}
                                                                                             alt="waiting"/>
                                        <p style={{color: '#38CB89'}} className={'shopping-btn-text'}>To'lov turi</p></div>
                            }
                            {
                                tradeIdForEdit ? editActiveButton === "turli" ? "" :
                                        <div onClick={customer ? () => setPaymentTypeCheck('qarz')
                                            : () => {
                                                toast.error(t('mah.88'))
                                            }
                                        } style={{border: paymentTypeCheck === 'qarz' ? '3px solid red' : 'none'}}
                                             className={'shopping-btn-top2'}><img
                                            src={debtTrade} className={'shopping-btn-icon'}
                                            alt="waiting"/>
                                            <p style={{color: '#FF7272'}} className={'shopping-btn-text'}>Qarzga sotish</p>
                                        </div>
                                    : <div onClick={customer ? () => setPaymentTypeCheck('qarz') : () => {
                                        toast.error(t('mah.88'))
                                    }
                                    } style={{border: paymentTypeCheck === 'qarz' ? '3px solid red' : 'none'}}
                                           className={'shopping-btn-top2'}><img src={debtTrade}
                                                                                className={'shopping-btn-icon'}
                                                                                alt="waiting"/>
                                        <p style={{color: '#FF7272'}} className={'shopping-btn-text'}>Qarzga sotish</p>
                                    </div>
                            }

                        </div>
                        <div className={'d-flex justify-content-between flex-wrap   align-items-center w-100'}>
                            {
                                PayReducer.paymethod &&
                                PayReducer.paymethod.filter(value => value.main === true).map((item, index) =>
                                    match.params.remainId || tradeIdForEdit ?
                                        editActiveButton === item.id &&
                                        <button key={item.id}
                                                onClick={() => setPaymentTypeCheck(item.id)}
                                                className={'shopping-btn'}
                                                style={{border: paymentTypeCheck === item.id ? '3px solid red' : 'none'}}
                                        >
                                            <img src={checkImg(item.name)} alt="waiting"
                                                 className={'shopping-btn-icon-pay'}/>
                                            <p style={{color: '#377DFF'}}
                                               className={'shopping-btn-text'}> {camelize(item.name)}</p>
                                        </button> : <button key={item.id}
                                                            style={{border: paymentTypeCheck === item.id ? '3px solid red' : 'none'}}
                                                            onClick={() => setPaymentTypeCheck(item.id)}
                                                            className={'shopping-btn'}>
                                        <img src={checkImg(item.name)} alt="waiting"
                                             className={'shopping-btn-icon-pay'}/>
                                        <p style={{color: '#377DFF'}}
                                           className={'shopping-btn-text'}> {camelize(item.name)}</p>
                                    </button>
                                )
                            }
                        </div>
                        {
                            tradeIdForEdit || match.params.remainId ?
                                <div className={'shop-totalSum'}>
                                    <p>{t('mah.86')} </p>
                                    <p> {noChangesPaidSum} {t('mah.27')}</p>
                                </div> : ''
                        }
                        <div className={'shop-totalSum'}>
                            <p>{t('Trade.14')}: </p>
                            <p>{Math.round(jamixisob)} {t('mah.39')}</p>
                        </div>
                        <div className={'d-flex justify-content-end align-items-center w-100'}>
                            {/*<p className='shop-productSum'>{t('Trade.15')}:{xisob}</p>*/}
                            <div className={'discount-percent'}>
                                <p>{t('Trade.28')}: {customerPercent} %</p>
                            </div>
                        </div>
                        <button className={'btn-payment'} onClick={saveAllTrade}>
                            To'lov
                        </button>
                    </div>
                </div>

                {/*<div className="shopping-body">*/}
                {/*    <div style={{width: open ? '25%' : '5%'}} className="shopping-body-left">*/}
                {/*        <div className="shopping-products">*/}
                {/*            <div style={{justifyContent: open ? 'space-between' : "center"}} className={'d-flex'}>*/}
                {/*                {*/}
                {/*                    open && <div style={{width: '60%'}}>*/}
                {/*                        {*/}
                {/*                            BolimReducer.bolimlar?.length > 0*/}
                {/*                            &&*/}
                {/*                            <SelectAnt value={categoryId} onChange={(e) => setCategoryId(e)}*/}
                {/*                                       all={'Kategoriya tanlang'}*/}
                {/*                                       permission={true} selectList={BolimReducer.bolimlar}/>*/}
                {/*                        }*/}
                {/*                    </div>*/}

                {/*                }*/}
                {/*                {*/}
                {/*                    tradeIdForEdit ? '' :*/}
                {/*                        <div onClick={showDrawer}*/}
                {/*                             className={'shopping-left-product-btn'}>*/}
                {/*                            <img src={products} className={'btn-icon'} alt="waiting"/>*/}
                {/*                        </div>*/}
                {/*                }*/}
                {/*            </div>*/}
                {/*            {*/}
                {/*                open && <div className={'shopping-product-list'}>*/}
                {/*                    {*/}

                {/*                        MaxsulotlarRoyxariReducer.productForShopping.length > 0 ?*/}
                {/*                            MaxsulotlarRoyxariReducer.productForShopping.map((item, index) => <div*/}
                {/*                                className={'shop-product-card'}*/}
                {/*                                key={index} onClick={() => {*/}
                {/*                                pushesh(item)*/}
                {/*                            }}>*/}
                {/*                                {*/}
                {/*                                    item.photoId === null ?*/}
                {/*                                        <img className={'shop-product-image'} src={defaultProduct}*/}
                {/*                                             alt={item.name}/>*/}
                {/*                                        : <img className={'shop-product-image'}*/}
                {/*                                               src={`${BaseUrl}/attachment/download/${item.photoId}`}*/}
                {/*                                               alt="###"/>*/}

                {/*                                }*/}
                {/*                                <p className={'shop-product-name'}>{item.name}</p>*/}
                {/*                                <p className={'shop-product-price'}>{!grossPriceType ? item.salePrice : item.grossPrice} {t('mah.39')}</p>*/}
                {/*                            </div>) : <div>*/}
                {/*                                <h4 className={'text-center'}>{MaxsulotlarRoyxariReducer.message}</h4>*/}
                {/*                            </div>*/}

                {/*                    }*/}
                {/*                </div>*/}

                {/*            }*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div style={{width: open ? '45%' : '60%'}} className="shopping-body-middle">*/}
                {/*        <div className="shopping-body-header-item">*/}
                {/*            <h5 className={'shop-header-text'}>Filial</h5>*/}
                {/*            <div style={{width: '250px'}}>*/}
                {/*                <SelectAnt disabled={match.params.remainId || tradeIdForEdit ? true : false}*/}
                {/*                           value={mainBranchId ? mainBranchId : users.branchId} permission={false}*/}
                {/*                           selectList={users.branches} onChange={(e) => {*/}
                {/*                    setMainBranchId(e)*/}
                {/*                    setarr1([])*/}
                {/*                    setSearch('')*/}
                {/*                    setIsViewSearchProduct(false)*/}
                {/*                }}/>*/}
                {/*            </div>*/}
                {/*            /!*{*!/*/}
                {/*            /!*    (tradeIdForEdit) && match.params.remainId ? <h5>*!/*/}
                {/*            /!*            <h5 className={'shop-header-text'}>{t('mah.74')}</h5>*!/*/}
                {/*            /!*        </h5> :*!/*/}
                {/*            /!*        tradeIdForEdit ?*!/*/}
                {/*            /!*            <h5 className={'shop-header-text'}>{t('mah.75')}</h5> :*!/*/}
                {/*            /!*            <h5 className={'shop-header-text'}>{t('mah.76')}</h5>*!/*/}
                {/*            /!*}*!/*/}
                {/*            <input type="date" value={thisDay} className={'shopping-datepicker'}*/}
                {/*                   onChange={(e) => setThisDay(e.target.value)}*/}
                {/*            />*/}
                {/*            <div style={{width: '150px'}}>*/}
                {/*                <SelectAnt disabled={tradeIdForEdit ? true : IsGross}*/}
                {/*                           selectList={[{id: 'DONA', name: 'Dona'}, {id: 'OPTOM', name: 'Optom'}]}*/}
                {/*                           value={grossPriceTypeString}*/}
                {/*                           permission={false} onChange={(e) => changeGrossPriceType(e)}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="shopping-body-header">*/}
                {/*            <div style={{width: '250px'}}>*/}
                {/*                <SelectAnt disabled={tradeIdForEdit ? true : false}*/}
                {/*                           all={'Mijozni tanlang'}*/}
                {/*                           selectList={CustomerReducer.customersTrade}*/}
                {/*                           onChange={selectCustomer}*/}
                {/*                           permission={true}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            {*/}
                {/*                !tradeIdForEdit && users.addCustomer ?*/}
                {/*                    <button onClick={addCustomerToggle}*/}
                {/*                            className={'shopping-plus'}>+*/}
                {/*                    </button> : ''*/}
                {/*            }*/}
                {/*            {*/}
                {/*                match.params.remainId ? " " :*/}
                {/*                    <div className="shopping-search">*/}
                {/*                        <input ref={inputRef} type="text"*/}
                {/*                               value={search}*/}
                {/*                               onChange={mahsulotnomi}*/}
                {/*                               autoFocus={true}*/}
                {/*                               placeholder={"Maxsulot nomi yoki barcode"}/>*/}
                {/*                        <img src={searchIcon} alt="search"/>*/}
                {/*                        {*/}
                {/*                            MaxsulotlarRoyxariReducer.productSearch.length > 0 && isViewSearchProduct &&*/}
                {/*                            <div className={'shopping-search-list'}>*/}
                {/*                                {*/}
                {/*                                    MaxsulotlarRoyxariReducer.productSearch.map(item =>*/}
                {/*                                        <button className={'shopping-search-button'} key={item.id}*/}
                {/*                                                onClick={() => pushesh(item)}>*/}
                {/*                                            <p className={'p-0 m-0'}>{item.name} ({item.barcode})</p>*/}
                {/*                                            <p className={'p-0 m-0'}>{t('mah.83')} {item.amount} {item.measurementName}</p>*/}
                {/*                                        </button>*/}
                {/*                                    )*/}
                {/*                                }*/}
                {/*                            </div>*/}
                {/*                        }*/}
                {/*                    </div>*/}

                {/*            }*/}
                {/*        </div>*/}
                {/*        <div className="shopping-body-body">*/}
                {/*            <div className="table-responsive">*/}
                {/*                <table className={'shopping-table'}>*/}
                {/*                    <thead>*/}
                {/*                    <tr>*/}
                {/*                        <th width={30}>ID</th>*/}
                {/*                        <th>{t('ProductList.1')}</th>*/}
                {/*                        <th className={'text-center'}>{t('ProductEdit.7')}</th>*/}
                {/*                        <th className={'text-center'}>Narxi</th>*/}
                {/*                        <th className={'text-center'}>Jami</th>*/}
                {/*                    </tr>*/}
                {/*                    </thead>*/}
                {/*                    <tbody>*/}
                {/*                    {*/}
                {/*                        arr1.map((item, index) =>*/}
                {/*                                !item.delete*/}
                {/*                                && (*/}
                {/*                                    <tr style={{*/}
                {/*                                        height: '70px',*/}
                {/*                                        border: item.productId === changesId ? '2px solid red' : 'none',*/}
                {/*                                        cursor: 'pointer',*/}
                {/*                                    }}*/}
                {/*                                        key={item?.id} onClick={() => setChangesId(item.productId)}>*/}
                {/*                                        <td>{index + 1}</td>*/}
                {/*                                        <td>{item?.name}</td>*/}
                {/*                                        <td className={'text-center'}>*/}
                {/*                                            {*/}
                {/*                                                item.productId === changesId ?*/}
                {/*                                                    <div>*/}
                {/*                                                        <InputNumber*/}
                {/*                                                            value={item?.quantity}*/}
                {/*                                                            min={0}*/}
                {/*                                                            step={'number'}*/}
                {/*                                                            max={match.params.remainId && item?.noQuantity}*/}
                {/*                                                            onChange={(e) => {*/}
                {/*                                                                changeCount(e, index)*/}
                {/*                                                            }}*/}
                {/*                                                            className={'shop-change-number'}*/}
                {/*                                                        />*/}
                {/*                                                    </div> : item.quantity*/}
                {/*                                            }*/}

                {/*                                            <div className="col-md-12"> {*/}
                {/*                                                item?.active ?*/}
                {/*                                                    <p style={{fontSize: '10px'}}*/}
                {/*                                                       className={'text-danger text-center p-0 m-0'}><strong*/}
                {/*                                                        style={{fontSize: '14px'}}> {item?.amount}</strong> {item?.measurementName} bor*/}
                {/*                                                        ! </p> : ''*/}
                {/*                                            }</div>*/}
                {/*                                        </td>*/}
                {/*                                        <td className={'text-center'}>*/}
                {/*                                            <div*/}
                {/*                                                className={'d-flex flex-column justify-content-start align-items-center'}>*/}
                {/*                                                {*/}
                {/*                                                    item?.noChangesPrice !== item?.price &&*/}
                {/*                                                    <del*/}
                {/*                                                        className={'mb-1 text-danger'}>{parseFloat(item?.noChangesPrice).toFixed(0)} {t('mah.39')}</del>*/}
                {/*                                                }*/}
                {/*                                                {*/}
                {/*                                                    item.productId === changesId ?*/}
                {/*                                                        <InputNumber*/}
                {/*                                                            value={item?.price}*/}
                {/*                                                            min={0}*/}
                {/*                                                            disabled={IsDiscount}*/}
                {/*                                                            onChange={(e) =>*/}
                {/*                                                                handleChangeBuyPrice(e, index)}*/}
                {/*                                                            className={'shop-change-number'}*/}
                {/*                                                        /> : item.price*/}
                {/*                                                }*/}

                {/*                                            </div>*/}
                {/*                                        </td>*/}
                {/*                                        <td className={'text-center'}>*/}
                {/*                                            <div className={'d-flex align-items-center flex-column'}>*/}
                {/*                                                {*/}
                {/*                                                    item?.noChangesPrice !== item?.price &&*/}
                {/*                                                    <del*/}
                {/*                                                        className={'mt-3 mb-1 text-danger'}>{parseFloat(item?.noChangesTotalSalePrice).toFixed(0)} {t('mah.39')}</del>*/}
                {/*                                                }*/}
                {/*                                                <p>                                                        {parseFloat(item?.totalSalePrice).toFixed(0)} {t('mah.39')}*/}
                {/*                                                </p>*/}
                {/*                                            </div>*/}
                {/*                                        </td>*/}
                {/*                                        /!*<td>*!/*/}
                {/*                                        /!*    <button*!/*/}
                {/*                                        /!*        onClick={() => deleteM(index, item.id)}*!/*/}
                {/*                                        /!*        className={'shopTable-btn shopTable-btn-delete'}>x*!/*/}
                {/*                                        /!*    </button>*!/*/}
                {/*                                        /!*</td>*!/*/}
                {/*                                    </tr>*/}
                {/*                                )*/}
                {/*                        )*/}
                {/*                    }*/}
                {/*                    </tbody>*/}
                {/*                </table>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div style={{width: open ? '30%' : '35%'}} className="shopping-body-right">*/}
                {/*        <div className={'d-flex justify-content-between flex-wrap align-items-center w-100'}>*/}
                {/*            {tradeIdForEdit ? "" :*/}
                {/*                <div className={'shopping-btn-top'}  onClick={toggle}*/}
                {/*                     data-tip={t('mah.79')}><img src={kassa} className={'shopping-btn-icon'} alt="kassa"/>*/}
                {/*                    <p className={'shopping-btn-text'}>Kassaga olish</p>*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*            <ReactTooltip/>*/}
                {/*            {*/}
                {/*                users.getTrade &&*/}
                {/*                <div className={'shopping-btn-top'} onClick={toggle4}*/}
                {/*                ><img src={lastTrade}  className={'shopping-btn-icon'} alt="lastTrade"/>*/}
                {/*                    <p className={'shopping-btn-text'}>*/}
                {/*                        {t('mah.80')}*/}

                {/*                    </p>*/}
                {/*                </div>*/}
                {/*            }*/}

                {/*            <Link to={'/main/tradeList'} style={{backgroundColor:'red'}} onClick={() => {*/}
                {/*                savdooynasi()*/}
                {/*                clear()*/}
                {/*            }} className={'shopping-btn-top'}>*/}
                {/*                <img src={back} className={'shopping-btn-icon'} alt="back"/>*/}
                {/*                <p className={'shopping-btn-text'}>Ortga</p>*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*        <div className={'d-flex justify-content-between flex-wrap  align-items-center w-100'}>*/}
                {/*            {*/}
                {/*                tradeIdForEdit ? '' :*/}
                {/*                    <div onClick={toggle8}*/}
                {/*                         className={'shopping-btn-top2'}>*/}
                {/*                        <img src={waiting} className={'shopping-btn-icon'} alt="waiting"/>*/}
                {/*                        <p className={'shopping-btn-text'}>Ushlab turish</p>*/}
                {/*                    </div>*/}
                {/*            }*/}
                {/*            {*/}
                {/*                !tradeIdForEdit &&*/}
                {/*                <div onClick={clear} className={'shopping-btn-top2'}><img src={trash} className={'shopping-btn-icon'}*/}
                {/*                                                                          alt="waiting"/>*/}
                {/*                    <p className={'shopping-btn-text'} >Tozalash</p>*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*        <div className={'button-changes'}>*/}
                {/*            <div className={'btn-change'} onClick={sMinus}>*/}
                {/*                <img src={minus} className={'btn-change-icon'} alt="minus"/>*/}
                {/*                <p className={'btn-change-text'} style={{color: '#FF7272'}}>Kamaytirish</p>*/}
                {/*            </div>*/}
                {/*            <div className={'btn-change'} onClick={() => setCount(changesId)}>*/}
                {/*                <img src={plus} alt="plus" className={'btn-change-icon'}/>*/}
                {/*                <p className={'btn-change-text'} style={{color: '#377DFF'}}>Qo'shish</p>*/}
                {/*            </div>*/}
                {/*            <div className={'btn-change'} onClick={deleteM}>*/}
                {/*                <img src={remove} alt="remove" className={'btn-change-icon'}/>*/}
                {/*                <p className={'btn-change-text'} style={{color: '#B0B7C3'}}>O'chirish</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className={'d-flex justify-content-between flex-wrap  align-items-center w-100'}>*/}
                {/*            {*/}
                {/*                tradeIdForEdit ? editActiveButton === "qarz" ? '' :*/}
                {/*                        <div className={'shopping-btn2'}*/}
                {/*                             style={{border: paymentTypeCheck === 'turli' ? '3px solid red' : 'none'}}*/}
                {/*                             onClick={() => setPaymentTypeCheck('turli')}><img src={turliTolov}*/}
                {/*                                                                               className={'shopping-btn-icon'}*/}
                {/*                                                                               alt="waiting"/>*/}
                {/*                            <p className={'shopping-btn-text'} >Turli to'lov</p></div>*/}
                {/*                    : <div className={'shopping-btn2'}*/}
                {/*                           style={{border: paymentTypeCheck === 'turli' ? '3px solid red' : 'none'}}*/}
                {/*                           onClick={() => setPaymentTypeCheck('turli')}><img src={turliTolov}*/}
                {/*                                                                             className={'shopping-btn-icon'}*/}
                {/*                                                                             alt="waiting"/>*/}
                {/*                        <p className={'shopping-btn-text'} >Turli to'lov</p></div>*/}
                {/*            }*/}
                {/*            {*/}
                {/*                tradeIdForEdit ? editActiveButton === "turli" ? "" :*/}
                {/*                        <div onClick={customer ? () => setPaymentTypeCheck('qarz')*/}
                {/*                            : () => {*/}
                {/*                                toast.error(t('mah.88'))*/}
                {/*                            }*/}
                {/*                        } style={{border: paymentTypeCheck === 'qarz' ? '3px solid red' : 'none'}}*/}
                {/*                             className={'shopping-btn2'}><img*/}
                {/*                            src={debtTrade} className={'shopping-btn-icon'}*/}
                {/*                            alt="waiting"/>*/}
                {/*                            <p className={'shopping-btn-text'}>Qarzga sotish</p></div>*/}
                {/*                    : <div onClick={customer ? () => setPaymentTypeCheck('qarz') : () => {*/}
                {/*                        toast.error(t('mah.88'))*/}
                {/*                    }*/}
                {/*                    } style={{border: paymentTypeCheck === 'qarz' ? '3px solid red' : 'none'}}*/}
                {/*                           className={'shopping-btn2'}><img src={debtTrade} className={'shopping-btn-icon'}*/}
                {/*                                                            alt="waiting"/>*/}
                {/*                        <p className={'shopping-btn-text'}>Qarzga sotish</p></div>*/}
                {/*            }*/}

                {/*        </div>*/}
                {/*        <div className={'d-flex justify-content-between flex-wrap  align-items-center w-100'}>*/}
                {/*            {*/}
                {/*                PayReducer.paymethod &&*/}
                {/*                PayReducer.paymethod.map(item =>*/}
                {/*                    match.params.remainId || tradeIdForEdit ?*/}
                {/*                        editActiveButton === item.id &&*/}
                {/*                        <button key={item.id}*/}
                {/*                                onClick={() => setPaymentTypeCheck(item.id)}*/}
                {/*                                className={'shopping-btn'}*/}
                {/*                                style={{border: paymentTypeCheck === item.id ? '3px solid red' : 'none'}}*/}
                {/*                        >*/}
                {/*                            <img src={checkImg(item.name)} alt="waiting" className={'shopping-btn-icon'}/>*/}
                {/*                            <p className={'shopping-btn-text'}> {camelize(item.name)}</p>*/}
                {/*                        </button> : <button key={item.id}*/}
                {/*                                            style={{border: paymentTypeCheck === item.id ? '3px solid red' : 'none'}}*/}
                {/*                                            onClick={() => setPaymentTypeCheck(item.id)}*/}
                {/*                                            className={'shopping-btn'}>*/}
                {/*                        <img src={checkImg(item.name)} alt="waiting" className={'shopping-btn-icon'}/>*/}
                {/*                        <p className={'shopping-btn-text'}> {camelize(item.name)}</p>*/}
                {/*                    </button>*/}
                {/*                )*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*        {*/}
                {/*            tradeIdForEdit || match.params.remainId ?*/}
                {/*                <div className={'shop-totalSum'}>*/}
                {/*                    <p>{t('mah.86')} </p>*/}
                {/*                    <p> {noChangesPaidSum} {t('mah.27')}</p>*/}
                {/*                </div> : ''*/}
                {/*        }*/}
                {/*        <div className={'shop-totalSum'}>*/}
                {/*            <p>{t('Trade.14')}: </p>*/}
                {/*            <p>{jamixisob} {t('mah.39')}</p>*/}
                {/*        </div>*/}
                {/*        <div className={'d-flex justify-content-between align-items-center w-100'}>*/}
                {/*            <p className='shop-productSum'>{t('Trade.15')}:{xisob}</p>*/}
                {/*            <div className={'discount-percent'}>*/}
                {/*                <p>{t('Trade.28')}: {customerPercent} %</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <button className={'btn-payment'} onClick={saveAllTrade}>*/}
                {/*            To'lov*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

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
                                <th className={'text-center'}>{t('as.6')}</th>
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
                                        <td className={'d-flex gap-2'}>
                                            {
                                                users.editTrade &&
                                                <CustomButton icon={<EnterOutlined/>} size={'small'}
                                                              text={'Savdo oynaga ko\'chirish'}
                                                              onClick={() => savdooynakochirish(item.id)}/>
                                            }
                                            {
                                                users.deleteTrade &&
                                                <DeleteButton onClick={() => deleteHoldOn(item.id)}/>

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
                            <label htmlFor={'nomi'}>{t('mah.90')}</label>
                            <input
                                id={'nomi'} type="text"
                                placeholder={t('mah.91')}
                                className={'form-control mt-1'}
                                onChange={(e) => dispatch(
                                    {
                                        type: 'name',
                                        payload: e.target.value
                                    }
                                )}
                            />
                            {IsCheck && !state.name && <p
                                className={'text-danger text-center p-0 m-0'}>{t('mah.92')}</p>}
                            {/*<label className={'mt-1'} htmlFor={'filial'}>{t('CustomAll.5')}</label>*/}
                            {/*<Select*/}
                            {/*    required={true}*/}
                            {/*    onChange={(e) => dispatch({type: 'branchId', payload: e.value})}*/}
                            {/*    placeholder={t('mah.93')}*/}
                            {/*    options={users.branches.map(item => ({label: item.name, value: item.id}))}*/}
                            {/*    isClearable={true}*/}
                            {/*/>*/}
                            {/*{IsCheck && !state.branchId && <p*/}
                            {/*    className={'text-danger text-center p-0 m-0'}>{t('mah.94')}</p>}*/}
                            <label className={'mt-1'} htmlFor={'tel'}>{t('Buttons.14')}</label>
                            <PhoneInput
                                placeholder={t('mah.95')}
                                className={'form-control'}
                                onChange={(e) => dispatch({type: 'phoneNumber', payload: e})}/>
                            {IsCheck && !state.phoneNumber && <p
                                className={'text-danger text-center p-0 m-0'}>{t('mah.95')}</p>}
                            <label htmlFor={'foizda'}>Chegirma</label>
                            <input type="text"
                                   onChange={(e) => dispatch({type: 'percent', payload: e.target.value})}
                                   placeholder={t('mah.96')}
                                   defaultValue={''}
                                   className={'form-control mt-1'}
                                   id={'foizda'}/>
                            {IsCheck && !state.percent && <p
                                className={'text-danger text-center p-0 m-0'}>{t('mah.97')}</p>}
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
                        <h4 className={'text-error'}>{t('mah.98')}</h4>
                    </ModalHeader>
                    <ModalBody>
                        {
                            payForm.map((item, index) =>
                                <div key={index} className={'d-flex justify-content-around align-items-end mb-2'}>
                                    <div className={'col-md-4'}>
                                        <label htmlFor={'turi'}>{t('mah.99')}</label>
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
                                        <label htmlFor={'miqdor'}>{t('mah.100')}</label>
                                        <input type="number" value={item.sum} placeholder={'0'}
                                               name={'sum'} onChange={(e) => changePayForm(e, index)}
                                               className={'form-control'}/>
                                    </div>
                                    {
                                        item.edit && <div className="col-md-3">
                                            <label htmlFor=""></label>
                                            <DeleteButton size={'big'} onClick={() => deletePayForm(index)}/>
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
                            <p>{t('mah.102')} {jamixisob} {t('mah.27')} </p>
                            <p>{t('mah.103')} {payTotalSum} {t('mah.27')}</p>
                            <p>{t('mah.104')} {jamixisob - parseFloat(payTotalSum)} {t('mah.27')}</p>
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
                        <h3><strong>{t('Purchase.22')}:</strong> {jamixisob} {t('mah.39')}
                        </h3>
                        <h4 className={'text-error'}>{t('mah.105')}</h4>
                        <div className={'col-md-12 d-flex align-items-end justify-content-between'}>
                            <div className={'col-md-6'}>
                                <label htmlFor={'rrr'}>{t('mah.104')} {jamixisob - enterPaidSum} {t('mah.27')} </label>

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
                        <p data-tip={t('mah.106')}
                           className={'btn btn-outline-primary mt-2 form-control'}>{t('mah.107')}</p>
                        <ReactTooltip/>
                    </ModalBody>
                    <ModalFooter>
                        <button type={'button'} onClick={qarz} className={'btn btn-danger'}>{t('mah.108')}</button>
                        <button onClick={saveTradeByDebt} className={'btn btn-success'}>
                            {t('Buttons.6')}
                        </button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={lastTradeActive} toggle={toggle4}>
                    <ModalHeader>
                        <AddOrEditText text={t('Trade.26')}/>
                    </ModalHeader>
                    <ModalBody>
                        <div className={'col-md-12 '}>
                            <div className="col-md-12">
                                <SearchAnt name={"Savdo raqami bo'yicha qidirish"}
                                           onChange={(e) => setTradeIdSearch(e.target.value)}/>
                            </div>
                            <div className={'d-flex justify-content-between mt-2'}>
                                {
                                    users.getTrade || users.getTradeAdmin ?
                                        <Loading spinning={loading}>
                                            {
                                                SavdoQoshishReducer?.trades?.list?.length > 0 ?
                                                    <div>
                                                        <div className="table-responsive table-wrapper-scroll-y"
                                                             style={{height: '400px'}}>
                                                            <table className='table table-striped table-bordered mt-4'>
                                                                <thead>
                                                                <tr>
                                                                    <th>T/R</th>
                                                                    <th>{t('Trade.4')}</th>
                                                                    <th>{t('mah.110')}</th>
                                                                    <th>{t('Pagination.10')}</th>
                                                                    <th>{t('as.6')}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    SavdoQoshishReducer.trades?.list?.map((item, index) =>
                                                                        <tr
                                                                            key={item?.id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{moment(new Date(item?.createdAt)).format('lll')}</td>
                                                                            <td className={item.edit && 'bg-warning'}>{item?.invoice}</td>
                                                                            <td>{item?.customerName}</td>
                                                                            <td>
                                                                                <div className={'d-flex'}>
                                                                                    {
                                                                                        users.editTrade && item?.editable ?
                                                                                            <EditButton
                                                                                                onClick={() => getTradeByForEdit(item?.id)}
                                                                                            />
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
                                                    </div>
                                            }
                                        </Loading>
                                        : ''
                                }
                            </div>
                            {/*<CommonTable pagination={false} page={0} size={10}  columns={columns}*/}
                            {/*             data={SavdoQoshishReducer.trades?.list}  />*/}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={toggle4}
                                className={'btn btn-outline-primary'}>{t('Buttons.7')}</button>
                    </ModalFooter>
                </Modal>
                <ModalLoading isOpen={saveModal}/>
                <Modal isOpen={confirmedOpen} size={'lg'}>
                    <ModalHeader>
                        Ma'lumotlarni kiriting !
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <h5 className={'shop-header-text'}>Filial</h5>
                            <div>
                                <SelectAnt value={mainBranchId ? mainBranchId : users.branchId} permission={false}
                                           selectList={users.branches} onChange={(e) => {
                                    setMainBranchId(e)
                                    setarr1([])
                                    setSearch('')
                                    setIsSearchProduct([])
                                    setPinCode('')
                                }}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <h5 className={'shop-header-text'}>Xodimlar</h5>
                            <div>
                                <SelectAnt value={userId?.id} permission={true} all={'Tanlang'}
                                           selectList={XodimReducer.usersFiltering.map((item) => ({
                                               id: item.id,
                                               name: item.fio
                                           }))}
                                           onChange={(e) => {
                                               const findUser = XodimReducer.usersFiltering?.find(item => item.id === e)
                                               setUserId({
                                                   ...findUser,
                                                   pinCode: (findUser?.pinCode ? findUser.pinCode : 1111)
                                               })
                                               setIsSearchProduct([])
                                               setPinCode('')
                                           }}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <h5 className={'shop-header-text text-center'}>PinCode kiriting</h5>
                            <div className={'mt-2 text-center'}>
                                <Space direction="vertical">
                                    <Input.OTP size={'large'} length={4} type={'number'} value={pinCode}
                                               formatter={(str) => str.toUpperCase()}   {...sharedProps}

                                    />
                                </Space>
                            </div>
                        </div>
                        <div className={'row mt-2'}>
                            <div className="d-flex col-12 justify-content-center flex-wrap">
                                <div className="col-12 col-md-6 col-lg-4 d-flex gap-2 flex-wrap justify-content-center">
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(item =>
                                            <button disabled={pinCode.length === 4} onClick={() => {
                                                setPinCode(`${pinCode}${item}`)
                                            }} className={'btn btn-primary'}
                                                    style={{
                                                        width: '64px',
                                                        height: '64px',
                                                        fontSize: '32px'
                                                    }}>{item}</button>
                                        )
                                    }
                                    <button onClick={() => {
                                        setPinCode('')
                                    }} className={'btn btn-danger'}
                                            style={{width: '136px', height: '64px', fontSize: '24px'}}>Tozalash
                                    </button>
                                    <Link to={'/main/dashboard'} style={{backgroundColor: 'red'}} onClick={() => {
                                        savdooynasi()
                                        clear()
                                        setPinCode('')
                                    }} className={'shopping-btn-header'}>
                                        <p className={'shopping-btn-text-header'} style={{color: '#ffffff'}}>Ortga</p>
                                        <img src={back} className={'shopping-btn-header-icon'} alt="back"/>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    {/*<ModalFooter>*/}
                    {/*    <button onClick={toEnter} className={'btn btn-success'}>{t('Kirish')} </button>*/}
                    {/*</ModalFooter>*/}
                </Modal>

            </div>
            <div style={{display: 'none'}}>
                <div ref={componentRef} className={'p-3'}>
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
                        <div style={{fontSize: 12, fontWeight: 600}}>
                            {
                                moment(thisDay).format("DD:MM:YYYY")
                            }
                        </div>
                        <div style={{fontSize: 12, fontWeight: 600}}>
                            {
                                moment(new Date()).format("HH:mm:ss")
                            }
                        </div>
                    </div>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <div style={{fontSize: 12, fontWeight: 600}}>
                            {t('mah.41')}
                        </div>
                        <div style={{fontSize: 12, fontWeight: 600}}>
                            {
                                SavdoQoshishReducer.treadeId?.invoice
                            }
                        </div>
                    </div>
                    {
                        customer ?
                            <div className={'d-flex align-items-center justify-content-between'}>
                                <h1 style={{fontSize: 12, fontWeight: 600}}>{t('mah.42')} </h1>
                                {
                                    CustomerReducer.customersTrade?.filter(val => {
                                        if (val.id === customer) {
                                            return val
                                        }
                                    })?.map(item => <h1 style={{fontSize: 12, fontWeight: 600}}
                                                        key={item.id}> {item.name}</h1>)}
                            </div> : null
                    }
                    <div style={{borderBottom: "1px dashed #000"}}></div>
                    <div className={'mt-3 table-responsive'}>
                        {
                            traderArray.filter(itemDelete => itemDelete.delete === false).map((item, index) => <div
                                key={item.id}>
                                <h1 style={{fontSize: 12, fontWeight: 600}}>{index + 1}{".  "}{item.name}</h1>
                                <div style={{marginLeft: 20, marginTop: -7}}
                                     className={"d-flex align-items-center justify-content-between"}>
                                    <h1 style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        lineHeight: 1
                                    }}>
                                        {item.quantity} {item.measurementName} * {item.price} {t('mah.39')}</h1>
                                    <h1 style={{fontSize: 12, fontWeight: 600, lineHeight: 1}}>
                                        = {parseFloat(item.totalSalePrice).toFixed(0)} {t('mah.39')}
                                    </h1>
                                </div>
                            </div>)
                        }
                    </div>
                    <div style={{borderBottom: "1px dashed #000", marginTop: 20}}></div>
                    <div className={'d-flex'}>

                        <div style={{width: "100%"}}>
                            <div className={"d-flex justify-content-between"}>
                                <h1 style={{fontSize: 14, fontWeight: 800}}>{t('mah.43')} </h1>
                                <h1 style={{
                                    fontSize: 14,
                                    fontWeight: 800
                                }}>{jamixisob} {t('mah.39')}</h1>
                            </div>

                            {
                                payForm.map(item =>
                                    <div className={"d-flex justify-content-between"}>
                                        <h1 style={{
                                            fontSize: 13,
                                            fontWeight: 600
                                        }}>{camelize(item.paymentMethodName)}:</h1>
                                        <h1 style={{
                                            fontSize: 13,
                                            fontWeight: 600
                                        }}>{item.sum} {t('mah.39')}</h1>
                                    </div>
                                )
                            }
                            <div className={"d-flex justify-content-between"}>
                                <h1 style={{fontSize: 13, fontWeight: 600}}>{t('mah.44')}</h1>
                                <h1 style={{
                                    fontSize: 13,
                                    fontWeight: 600
                                }}>
                                    {jamixisob - tradeDebt} {t('mah.39')}</h1>
                            </div>
                            {
                                customer ?
                                    <div className={"d-flex justify-content-between"}>
                                        <h1 style={{fontSize: 14}}>{t('mah.45')} </h1>
                                        <h1 style={{
                                            fontSize: 14,
                                        }}>{tradeDebt} {t('mah.39')}</h1>
                                    </div> : ''
                            }
                            {
                                customer ?
                                    <div className={"d-flex justify-content-between"}>
                                        <h1 style={{fontSize: 14, fontWeight: 800}}>{t('mah.46')} </h1>
                                        <h1 style={{
                                            fontSize: 14,
                                            fontWeight: 800
                                        }}>{SavdoQoshishReducer.treadeId?.customerDebt} {t('mah.39')}</h1>
                                    </div> : ''
                            }

                        </div>
                    </div>
                    <div style={{borderBottom: "1px dashed #000"}}></div>
                    {
                        checkReducer.check ?
                            <div dangerouslySetInnerHTML={{__html: checkReducer.check.footer}}>
                            </div>
                            : null
                    }
                    {
                        checkReducer?.check?.qrCode ? <div className="d-flex align-items-center justify-content-center">
                            <QRCode
                                value={checkReducer?.check?.qrCode || '-'}
                                errorLevel={"H"}
                                size={200}
                            />
                        </div> : null
                    }
                </div>

            </div>

        </div>
    )
}

export default connect((checkReducer, holdOnReducer, MaxsulotlarRoyxariReducer, CustomerReducer, BolimReducer,
    PayReducer, users, SavdoQoshishReducer, allbusinessreducer, XodimReducer), {
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
    getTradeByBranch,
    getUserForFiltering
})(SavdoOynasi)
