import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import './addLossProducts.css'
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {formatDateMinus} from "../../../../../util";
import ModalLoading from "../../../../ModalLoading";
import lossReducer, {saveLossProduct} from "../../../../../reducer/lossReducer";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";

function AddLossProducts({
                             getBarcodeAndName,
                             saveLossProduct,
                             lossReducer,
                             MaxsulotlarRoyxariReducer,
                             match,
                             users
                         }) {

    const {t} = useTranslation()
    const {handleSubmit, register, formState: {errors}, setValue, getValues} = useForm()
    const [input, setInput] = useState(
        {
            maxsulotnomishtrix: ''
        }
    )
    const [isView, setIsView] = useState(false)
    const [search, setSearch] = useState('')
    const [branch, setBranch] = useState(null)
    const [checkedWarning,setCheckedWarning] = useState(false)

    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [arr1, setarr1] = useState([])

    function pushesh(val) {
        if (val.amount == 0) {
            toast.warning(t('mah.20'))
        } else {
            let isProduct = arr1.some(item => item.productId === val.id)
            if (isProduct) {
                toast.success(t('mah.21'))
            }
            else {
                arr1.push({
                    amount: val.amount,
                    active: false,
                    name : val.name,
                    measurementName : val.measurementName,
                    productId: val.id,
                    quantity: 0,
                    price: val.buyPrice
                })
            }
            let b = [...arr1]
            setarr1(b)
            setIsView(false)
        }
        setSearch('')
    }


    useEffect(() => {
        if (search) {
            getBarcodeAndName({
                branchId: branch ? branch : users.branchId,
                name: search
            })
        } else {
            setIsView(false)
        }
    }, [search])

    function ChangeBranch(e) {
        setBranch(e.target.value)
        setSearch('')
        setarr1([])
    }

    function changeCount(e, id) {
        arr1.map((item, index) => {
            if (index === id) {
                if (parseFloat(e.target.value) > (parseFloat(item.amount))) {
                    item.quantity = parseFloat(e.target.value)
                    item.active = true
                    setCheckedWarning(true)
                } else {
                    item.active = false
                    item.quantity = parseFloat(e.target.value)
                    setCheckedWarning(false)
                }
            }
        })
        let a = [...arr1]
        setarr1(a)
    }


    function deleteM(ind) {
            arr1.map((item, index) => {
                if (index === ind) {
                    arr1.splice(index, 1)
                }
            })
        let ad = [...arr1]
        setarr1(ad)
    }

    const [saveModal, setSaveModal] = useState(false)


    const history = useHistory()

    function onSubmitTrade(data) {
        if (arr1.length > 0) {
            if (checkedWarning) {
                toast.warning(t('mah.22'))
            } else {
                saveLossProduct({
                    ...data,
                    userId: users.id,
                    lossProductDtoList: arr1
                })
                setSaveModal(true)
            }
        } else {
            toast.error(t('mah.23'))
        }
    }

    useEffect(() => {
        if (lossReducer.saveBoolean) {
            setarr1([])
            history.push("/main/lossProducts")
        }
        setTimeout(()=>{
            setSaveModal(false)
        },200)
    }, [lossReducer.current])

    function xisobkitob() {
        let a = 0
        let c = 0
        arr1.map(item => {
            a += item.quantity
            c += (item.quantity * item.price)
        })
        setTotalQuantity(a)
        setTotalSum(c)
    }
    useEffect(()=>{
        xisobkitob()
    },[arr1])

    return (
        <div className="savdoQBox">
            <div className={'row mt-5'}>
                <form onSubmit={handleSubmit(onSubmitTrade)}>
                    <h5 className="mt-1 text-center mb-3">
                        {
                            match.params.id ? (t('mah.24')) : (t('mah.25'))
                        }
                    </h5>
                    <div className="col-md-12 d-flex ">
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="">{t('ProductList.8')}</label>
                            <select {...register('branchId', {required: true})}
                                    onChange={ChangeBranch}
                                    className={'form-control'}>
                                {
                                    users.branches ?
                                        users.branches.map(item => <option value={item.id}>{item.name}</option>) : ''
                                }
                            </select>
                        </div>
                    </div>


                    <div className="col-md-12 border mt-5 p-3">
                        <div className="row">
                            <div className="col-md-6 offset-3 p-0 position-relative">
                                <input type="text" value={search} onChange={(e) => {
                                    setSearch(e.target.value)
                                    setIsView(true)
                                }}
                                       className={'form-control'} placeholder={t('mah.26')}/>
                                {
                                    isView && MaxsulotlarRoyxariReducer.productSearch.length > 0 ?
                                        <div className={'combo-trade-array position-absolute z-index'}>
                                            {
                                                MaxsulotlarRoyxariReducer.productSearch.map(item =>
                                                    <p onClick={() => pushesh(item)}>
                                                        {item.name} {item.barcode}
                                                    </p>
                                                )

                                            }
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className={'table mt-4'}>
                                <thead>
                                <tr>
                                    <th>{t('ProductList.1')}</th>
                                    <th>{t('Trade.12')}</th>
                                    <th>{t('Trade.13')}</th>
                                    <th>{t('Trade.14')}</th>
                                    <th>x</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    arr1.map((item, index) => <tr key={item.id}>
                                        <td><h5>{item.name}</h5></td>
                                        <td>
                                            <div className={'d-flex'}>
                                                <input value={item.quantity}
                                                       onChange={(e) => changeCount(e, index)}
                                                       type="number"
                                                       className={'form-control'}/>
                                                <input type="text" disabled={true} className={'form-control d-inline'}
                                                       value={item.measurementName}/>
                                            </div>

                                            {
                                                item.active ?
                                                    <p className={'text-danger text-center fw-2 mt-2'}>
                                                        Only {parseFloat(item.amount)} {item.measurementName} available
                                                        !</p> : ''
                                            }
                                        </td>
                                        <td>
                                            {item.price}
                                        </td>
                                        <td>
                                            {item.quantity * item.price}
                                        </td>
                                        <td>
                                            <button type={'button'}
                                                    onClick={() => deleteM(index)}
                                                    className={'btn btn-danger'}>X
                                            </button>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                            <div className={'d-flex justify-content-around'}>
                                <div><h4>{t('Trade.15')} : {totalQuantity}</h4></div>
                                <div><h4>{t('Trade.14')}: {totalSum} {t('mah.27')}</h4></div>
                            </div>
                        </div>
                    </div>

                    <div className={'col-md-12 mt-5 d-flex justify-content-end  p-4'}>
                        <button className={'btn btn-outline-primary px-5 py-2'}
                                type={'submit'}>{t('Buttons.6')} </button>
                    </div>
                </form>

                <ModalLoading isOpen={saveModal}/>
            </div>
        </div>
    )
}

export default connect((users, lossReducer, MaxsulotlarRoyxariReducer), {
    saveLossProduct, getBarcodeAndName
})(AddLossProducts)
