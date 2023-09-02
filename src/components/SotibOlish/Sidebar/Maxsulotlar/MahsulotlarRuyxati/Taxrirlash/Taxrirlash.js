import './taxrirl.css'
import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import MaxsulotlarRoyxariReducer, {
    editMaxsulotRuyxati, getMaxsulotById, saveMaxsulotRuyxati,
} from "../../reducer/MaxsulotlarRoyxariReducer";
import MahsulotTurlariReducer, {
    getProductType, getProductTypeByID
} from "../../reducer/MahsulotTurlariReducer";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import MeasurementReducer, {getMeasurement, saveMeasurement} from "../../../../../../reducer/MeasurementReducer";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma, saveFirma} from "../../reducer/FirmaReducer";
import BolimReducer, {getBolim, saveBolim} from "../../reducer/BolimReducer";
import photoreducer, {clearPhotoId, savephoto, savePhotoProduct} from "../../../../../../reducer/photoreducer";
import Select from 'react-select'
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import {BsCheckAll} from 'react-icons/bs';
import Imagecom from "../../../../../Imagecom";
import {toast} from "react-toastify";
import ModalLoading from "../../../../../ModalLoading";
import {BaseUrl} from "../../../../../../middleware";
import defaultProduct from "../../../../../../img/defaultProduct.png";

function Taxrirlash({
                        photoreducer,
                        savephoto,
                        editMaxsulotRuyxati,
                        savePhotoProduct,
                        BolimReducer,
                        getBolim,
                        saveMaxsulotRuyxati,
                        match,
                        MaxsulotlarRoyxariReducer,
                        MeasurementReducer,
                        getMeasurement,
                        users,
                        saveBolim,
                        saveMeasurement,
                        FirmaReducer,
                        getFirma,
                        saveFirma,
                        getMaxsulotById,
                        MahsulotTurlariReducer,
                        getProductType,
                        clearPhotoId
                    }) {
    const [activeMeasurement, setActiveMeasurement] = useState(false)
    const [measurementName, setMeasurementName] = useState('')
    const [activeCategory, setActiveCategory] = useState(false)
    const [activeBrand, setActiveBrand] = useState(false)
    const [brandName, setBrandName] = useState('')


    const [isCheck, setIsCheck] = useState(false)
    const {t} = useTranslation()
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
    const {
        register: registerCategory,
        handleSubmit: handleSubmitCategory,
        reset: resetCategory,
        formState: {errors: errorsCategory}
    } = useForm()

    const [input, setInput] = useState({
        val: [],
        photoIds: '', // ----
        bazalar: [],
        mahsulotrasmi: '',
        selectvalue: [],
        photoID: null,
        idSave: '',
    })


    function mahsulotrasmi(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        savephoto(data)
    }

    const [indexForPhoto, setIndexForPhoto] = useState(null)

    function saveProductImage(e, index) {
        console.log(index)
        setIndexForPhoto(index)
        const data = new FormData();
        data.append('file', e.target.files[0]);
        savePhotoProduct(data)
    }

    useEffect(() => {
        if (indexForPhoto !== null) {
            form[indexForPhoto].photoId = photoreducer.photoManyProduct
            let b = [...form]
            setForm(b)
            setIndexForPhoto(null)
        }
        console.log(form)
    }, [photoreducer.ManyCurrent])


    function toggleMeasurement() {
        setActiveMeasurement(!activeMeasurement)
        setIsCheck(false)
    }

    function toggleBrand() {
        setActiveBrand(!activeBrand)
        setIsCheck(false)
    }

    function toggleCategory() {
        setActiveCategory(!activeCategory)
        resetCategory('')
    }

    function saqlakg() {
        if (!measurementName) {
            setIsCheck(true)
        } else {
            saveMeasurement({
                name: measurementName,
                businessId: users.businessId
            })
            setSaveModal(true)
        }
    }


    useEffect(() => {
        if (MeasurementReducer.saveBoolean) {
            setMeasurementName('')
            setActiveMeasurement(false)
        }
        getMeasurement(users.businessId)
    }, [MeasurementReducer.current])

    function saqlaBolim(data) {
        saveBolim({
            ...data, businessId: users.businessId
        })
        setSaveModal(true)
    }

    useEffect(() => {
        if (BolimReducer.saveBoolean) {
            resetCategory('')
            setActiveCategory(false)
        }
        getBolim(users.businessId)
    }, [BolimReducer.current])


    function saqlabrand() {
        if (!brandName) {
            setIsCheck(true)
        } else {
            saveFirma({
                name: brandName, businessId: users.businessId
            })
            setSaveModal(true)
        }
    }

    useEffect(() => {
        if (FirmaReducer.saveBoolean) {
            setBrandName('')
            setActiveBrand(false)
        }
        getFirma(users.businessId)
    }, [FirmaReducer.current])

    useEffect(() => {
        setTimeout(() => {
            setSaveModal(false)
            setIsCheck(false)
        }, 500)
    }, [MeasurementReducer.current, BolimReducer.current, FirmaReducer.current])


    useEffect(() => {
        if (match.params.id) {
            getMaxsulotById(match.params.id)
        }
    }, [])

    useEffect(() => {
        input.photoID = photoreducer?.photo
        let a = {...input}
        setInput(a)
    }, [photoreducer.current])


    useEffect(() => {
        if (match.params.id) {
            editMax()
        }
    }, [MaxsulotlarRoyxariReducer.active])


    function changeselect(e) {
        setIsCheck(false)
        input.selectvalue = e
        input.bazalar = []
        e?.map(item => {
            let b = input.bazalar
            b.push(item.value)
        })
        let a = {...input}
        setInput(a)
    }

    function save(data) {
        saveMaxsulotRuyxati({
            ...data,
            photoId: photoreducer?.photo,
            branches: input.bazalar,
            businessId: users.businessId,
            productManyDtoList: form,
            many: changedtype === 'SINGLE' ? false : true
        })
    }

    function editProduct(data) {
        editMaxsulotRuyxati({
            ...data,
            photoId: input.photoID,
            branches: input.bazalar,
            businessId: users.businessId,
            productManyDtoList: form,
            many: changedtype === 'SINGLE' ? false : true,
            id: match.params.id,
        })
    }

    const [saveModal, setSaveModal] = useState(false)

    useEffect(() => {
        if (MaxsulotlarRoyxariReducer.saveBoolean) {
            history.push('/main/productList')
            input.photoID = null
            clearPhotoId()
        }
        setSaveModal(false)
    }, [MaxsulotlarRoyxariReducer.current])

    function onSubmit(data) {
        if (input.bazalar.length === 0) {
            setIsCheck(true)
        } else {
            if (match.params.id) {
                editProduct(data)
            } else {
                save(data)
            }
            setSaveModal(true)
        }
    }

    const history = useHistory()
    const [changedtype, setChangedType] = useState('SINGLE')

    function changeType(e) {
        setChangedType(e.target.value)
    }

    useEffect(() => {
        if (changedtype === "MANY") {
            getProductType(users.businessId)
        }
    }, [changedtype])

    const [changedVariant, setChangedVariant] = useState(null)

    const [form, setForm] = useState([{
        barcode: '',
        typeId: '',
        buyPrice: '',
        profitPercent: '',
        grossPrice: '',
        salePrice: '',
        photoId: '',
        typeName: '',
    }])


    function removeProductType(index, valId) {
        console.log(form)
        if (valId) {
            let newForm = form.map((val, ind) => {
                if (val.id === valId) {
                    return {...val, delete: true}
                }
                return val;
            })
            console.log(newForm)
            setForm(newForm)
        } else {
            form.splice(index, 1)
            let a = [...form]
            setForm(a)
        }
    }


    const [typeDataList, setTypeDateList] = useState(null)
    const [typeData, setTypeDate] = useState({
        typeName: '',
        typeId: ''
    })
    const [typeDataListActive, setTypeDateListActive] = useState(false)
    const [addButton, setAddButton] = useState(false)


    function addElseProductType(e) {
        if (e.target.value === 'all') {
            toast.warning('Bu Mahsulot turini tanlang')
            setAddButton(false)
        } else {
            console.log(form)
            let a = form.find(item => item.typeId === e.target.value)
            if (a) {
                if (a.delete) {
                    a.delete = false
                    let b = [...form]
                    setTypeDateListActive(false)
                    setForm(b)
                } else {
                    setAddButton(false)
                    toast.error('Bu Mahsulot turi formada bor!')
                }

            } else {
                setAddButton(true)
                let findType = typeDataList[0].values.filter(item => item.id === e.target.value)
                typeData.typeName = findType[0].name
            }
        }
        typeData.typeId = e.target.value
        let b = {...typeData}
        setTypeDate(b)
    }


    function addTypeToForm() {
        let a = form?.length
        form.push({
            barcode: '',
            typeId: typeData.typeId,
            buyPrice: '',
            taxPrice: '',
            delete: false,
            profitPercent: 0,
            photoId: '',
            salePrice: '',
            typeName: typeData.typeName,
            productTypePriceId: "",
        })
        setTypeDateListActive(false)
    }

    function addProductType() {
        setTypeDateListActive(true)
    }

    function changeVariant(e) {
        let a = []
        setChangedVariant(e.target.value)
        let findType = MahsulotTurlariReducer.productType.filter(item => item.id === e.target.value)
        setTypeDateList(findType)
        findType[0].values.map((item, index) => {
            a.push({
                barcode: '',
                typeId: item.id,
                buyPrice: '',
                taxPrice: '',
                profitPercent: 0,
                photoId: '',
                salePrice: '',
                typeName: item.name,
            })
        })
        setForm(a)
    }

    useEffect(() => {
        if (changedVariant !== null) {
            let findType = MahsulotTurlariReducer.productType.filter(item => item.id === changedVariant)
            let a = findType[0].values
            let size = a?.length
            form.push({
                barcode: '',
                productTypeValueId: a[size]?.id,
                buyPrice: '',
                taxPrice: '',
                profitPercent: 0,
                salePrice: '',
                photoId: '',
                typeName: a[size]?.name,
                activeInput: false,
                productTypePriceId: "",
                subProductTypeValueId: null
            })
            let f = [...form]
            setForm(f)
        }
    }, [MahsulotTurlariReducer.active, MahsulotTurlariReducer.current])


    function changeTypeForm(e, index) {
        let a = form
        if (e.target.name === 'buyPrice' || e.target.name === 'taxPrice') {
            a[index].buyPrice = e.target.value
            a[index].taxPrice = e.target.value

            a[index].salePrice = parseFloat(e.target.value) + parseFloat((a[index].profitPercent === '' ? 0 : a[index].profitPercent) / 100 * e.target.value)

        }
        if (e.target.name === 'profitPercent') {
            a[index].profitPercent = e.target.value
            a[index].salePrice = parseFloat(a[index].buyPrice) + parseFloat(e.target.value / 100 * a[index].buyPrice)

        }
        if (e.target.name === 'salePrice') {
            a[index].salePrice = e.target.value
            a[index].profitPercent = Math.round(parseFloat(e.target.value / a[index].buyPrice - 1) * 100)

        }
        if (e.target.name === 'barcode') {
            a[index].barcode = e.target.value
        }
        if (e.target.name === 'grossPrice') {
            a[index].grossPrice = e.target.value
        }
        let b = [...form]
        setForm(b)
    }

    function AllChange(index, name) {
        let a = form
        if (name === 'buyPrice') {
            form.map((item, idx) => {
                a[idx].buyPrice = a[index].buyPrice
                a[idx].salePrice = parseFloat(a[index].taxPrice) + parseFloat((a[idx].profitPercent === '' ? 0 : a[idx].profitPercent) / 100 * a[index].buyPrice)

            })
        } else if (name === 'profitPercent') {
            form.map((item, idx) => {
                a[idx].profitPercent = a[index].profitPercent
                a[idx].salePrice = parseFloat(a[idx].buyPrice) + parseFloat(a[index].profitPercent / 100 * a[idx].buyPrice)

            })
        } else if (name === 'grossPrice') {
            form.map((item, idx) => {
                a[idx].grossPrice = a[index].grossPrice
            })
        }
        let b = [...form]
        setForm(b)
    }


    function editMax() {
        const {
            brandId,
            barcode,
            buyPrice,
            grossPrice,
            categoryId,
            measurementId,
            many,
            name,
            photoId,
            branches,
            salePrice,
            profitPercent,
            minQuantity,
            typeId,
            productManyDtoList
        } = MaxsulotlarRoyxariReducer.product
        setValue('name', name)
        setValue('barcode', barcode)
        setValue('minQuantity', minQuantity)
        setValue('measurementId', measurementId)
        setValue('categoryId', categoryId)
        setValue('brandId', brandId)
        setValue('profitPercent', profitPercent)
        setValue('buyPrice', buyPrice)
        setValue('salePrice', salePrice)
        setValue('grossPrice', grossPrice)
        setChangedType(many ? 'MANY' : 'SINGLE')
        let photos = photoId
        if (branches) {
            let branch = users.branches.filter(item => branches.includes(item.id)).map(({
                                                                                            name: label,
                                                                                            id: value,
                                                                                            ...rest
                                                                                        }) => ({
                label,
                value, ...rest
            }));
            changeselect(branch)
        }

        input.photoID = photos
        let a = {...input}
        setInput(a)
        if (productManyDtoList) {
            let a = []
            setChangedVariant(typeId)
            let typeValues = MahsulotTurlariReducer.productType.filter(item => item.id === typeId)
            setTypeDateList(typeValues)

            productManyDtoList.map(item => {
                a.push({
                    barcode: item?.barcode,
                    typeId: item?.typeId,
                    buyPrice: item?.buyPrice,
                    profitPercent: item?.profitPercent,
                    photoId: item.photoId,
                    salePrice: item?.salePrice,
                    grossPrice: item?.grossPrice,
                    typeName: item?.typeName,
                    id: item.id,
                    delete: item?.delete
                })
            })
            setForm(a)
        }


    }


    return (<div className={'mt-5 contanerT'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className={'text-center'}>{match.params.id ? "Taxrirlash" : 'Maxsulot qo\'shish'}</h4>
                <div className="row p-md-3 ">
                    <div className="col-md-4 mt-2">
                        <label htmlFor={'name'}>{t('ProductEdit.2')}</label>
                        <input type="text"
                               {...register('name', {required: {value: true, message: 'Maxsulot nomimi kiriting'}})}
                               placeholder={'Maxsulot nomi'}
                               id={'name'} className={'form-control '}/>
                        {
                            errors.name &&
                            <div>
                                <p className={'text-danger text-center p-0 m-0'}>{errors.name.message}</p>
                            </div>
                        }
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor="">Mahsulot turi</label>
                        <select name="type" className={'form-control'} value={changedtype} onChange={changeType}>
                            <option value="SINGLE">Bir turli</option>
                            <option value="MANY">Turli xil</option>
                        </select>
                    </div>
                    {
                        changedtype === "SINGLE" &&
                        <div className="col-md-4 mt-2">
                            <label htmlFor={'barcode'}>{t('ProductEdit.5')}</label>
                            <input type="text" id={'barcode'}
                                   {...register('barcode', {required: {value: true, message: 'Shtrix kodni kiriting'}})}
                                   placeholder={'Shtrix kod'}
                                   className={'form-control'}/>
                            {
                                errors.barcode &&
                                <div>
                                    <p className={'text-danger text-center p-0 m-0'}>{errors.barcode.message}</p>
                                </div>}
                        </div>

                    }
                    <div className="col-md-4 mt-2">
                        <label htmlFor="bazalar">{t('ProductList.8')}</label>
                        <Select options={users?.branchesValues}
                                styles={{
                                    control: (style) => {
                                        return ({...style, padding: "2.5px"})
                                    }
                                }}
                                isMulti={true} class={'form-control'}
                                value={input.selectvalue} onChange={changeselect}/>
                        {
                            isCheck && input.bazalar.length === 0 &&
                            <div>
                                <p className={'text-center text-danger p-0 m-0'}>Filia tanlang</p>
                            </div>
                        }
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor={'measurement'}>{t('ProductList.5')}</label>
                        <div className={'d-flex justify-content-between '}>
                            <select name="" id={'measurement'}
                                    {...register('measurementId', {required: true})}
                                    className={'form-control'}>
                                {MeasurementReducer.measurements.map((item) => <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>)}
                            </select>
                            {
                                users.measurementRoles &&
                                <button type={'button'} onClick={toggleMeasurement} className={'addBtn'}
                                        style={{width: "75px", background: "#6664e9"}}>
                                    <h2 style={{color: "#fff"}}>+</h2>
                                </button>
                            }
                        </div>
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor={'firma'}>{t('ProductList.7')}</label>
                        <div className={'d-flex justify-content-between'}>
                            <select name=""
                                    {...register('brandId', {required: false})}
                                    id={'firma'}
                                    className={'form-control'}>
                                <option value={''}>Tanlang</option>
                                {FirmaReducer.firmalar ? FirmaReducer.firmalar.map(item => <option key={item.id}
                                                                                                   value={item.id}>{item.name}</option>) : ''}
                            </select>
                            {
                                users.brandRoles &&
                                <button type={'button'} onClick={toggleBrand} className={'addBtn'}
                                        style={{width: "75px", background: "#6664e9"}}>
                                    <h2 style={{color: "#fff"}}>+</h2>
                                </button>
                            }
                        </div>
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor={'bol'}>{t('ProductList.4')}</label>
                        <div className={'d-flex select-group'}>
                            <select name="" className={'form-control'}
                                    {...register('categoryId', {
                                        required: false
                                    })}
                                    id={'bol'}>
                                <option value={''}>Tanlang</option>
                                {BolimReducer.bolimlar ? BolimReducer.bolimlar.map(item => <option key={item.id}
                                                                                                   value={item.id}>{item.name}</option>) : ''}
                            </select>
                            {
                                users.categoryRoles &&
                                <button type={'button'} onClick={toggleCategory} className={'addBtn'}
                                        style={{width: "75px", background: "#6664e9"}}>
                                    <h2 style={{color: "#fff"}}>+</h2>
                                </button>
                            }

                        </div>
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor={'minQuantity'}>{t('ProductEdit.8')}</label>
                        <input type="number"
                               {...register('minQuantity', {
                                   required: {
                                       value: true,
                                       message: 'Ogohlantirish miqdorini kiriting'
                                   }
                               })}
                               placeholder={'Ogohlantirish miqdori'}
                               className={'form-control'} id={'minQuantity'}/>
                        {
                            errors.minQuantity &&
                            <div>
                                <p className={'text-danger text-center p-0 m-0'}>{errors.minQuantity.message}</p>
                            </div>
                        }

                    </div>
                </div>

                <div className="row mt-4 p-md-3 ">
                    <div className="col-md-6">
                        <div className={'col-md-12 col-sm-12'}>
                            <p className={"p-0 m-0"}>{t('ProductEdit.10')}</p>
                            <label htmlFor={'productPicture'} style={{width: "100%"}}>
                                <p className={'btn btn-outline-primary form-control'}>{t('ProductEdit.10')}</p>
                            </label>
                            <input type="file" className={'form-control d-none'} value={input.mahsulotrasmi}
                                   onChange={mahsulotrasmi} id={'productPicture'}
                                   style={{background: 'transparent'}}/>
                        </div>

                    </div>
                    <div className={'col-md-6 d-flex justify-content-center align-items-center'}>
                        <div className="col-md-12 d-flex justify-content-center  align-items-center">
                            {input.photoID === null ? <Imagecom/> : <Imagecom id={input.photoID}/>}
                        </div>
                    </div>
                </div>
                <div className="row mt-5 p-3">
                    {
                        console.log(errors)
                    }
                    <div>
                        {changedtype === 'SINGLE' ? <div className="table-responsive">
                            <table className={'table'}>
                                <thead>
                                <tr>
                                    <th>{t('ProductEdit.17')}(%)</th>
                                    <th>{t('ProductList.11')}</th>
                                    <th>{t('ProductList.12')}</th>
                                    <th>Optom Sotish Narxi</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="number" id={'foy'}
                                               {...register("profitPercent", {
                                                   required: {value: true, message: 'Foizni kiriting!'},
                                                   onChange: (e) => {
                                                       setValue('salePrice', (parseFloat(e.target.value * getValues('buyPrice') / 100 + parseFloat(getValues('buyPrice')))).toFixed(2))
                                                   }
                                               })}
                                               placeholder={'Foiz'}
                                               className='taxrirlashInputValudetion form-control'/>
                                        {
                                            errors.profitPercent && !getValues('profitPercent') &&
                                            <div>
                                                <p className={'text-danger text-center p-0 m-0'}>{errors.profitPercent.message}</p>
                                            </div>}
                                    </td>
                                    <td>
                                        <input type="number" step="any" id='sotishNarxi'
                                               {...register("buyPrice", {
                                                   required: {value: true, message: 'Narxni kiriting!'},
                                                   onChange: (e) => {
                                                       setValue('salePrice', (parseFloat(e.target.value * getValues('profitPercent') / 100 + parseFloat(e.target.value))).toFixed(2))
                                                   }
                                               })}
                                               placeholder={'Sotib olish narxi'}
                                               className='taxrirlashInputValudetion form-control'/>
                                        {
                                            errors.buyPrice && !getValues('buyPrice') &&
                                            <div>
                                                <p className={'text-danger text-center p-0 m-0'}>{errors.buyPrice.message}</p>
                                            </div>}

                                    </td>
                                    <td>
                                        <input type="number" step="any" id='sotibOlishNarxi'
                                               className={'form-control'}
                                               {...register('salePrice', {
                                                   required: {value: true, message: 'Narxni kiriting!'},
                                                   onChange: (e) => {
                                                       setValue('profitPercent', Math.round(parseFloat(e.target.value / getValues('buyPrice') - 1) * 100))
                                                   }
                                               })}
                                               placeholder={'Sotish narxi'}
                                        />
                                        {
                                            errors.salePrice && !getValues('salePrice') &&
                                            <div>
                                                <p className={'text-danger text-center p-0 m-0'}>{errors.salePrice.message}</p>
                                            </div>}
                                    </td>
                                    <td>
                                        <input type="number" step="any" id='sotibOlishNarxi'
                                               className={'form-control'}
                                               {...register('grossPrice', {
                                                   required: {
                                                       value: true,
                                                       message: 'Narxni kiriting!'
                                                   }
                                               })}

                                               placeholder={'Optom Narxi'}
                                        />
                                        {
                                            errors.grossPrice &&
                                            <div>
                                                <p className={'text-danger text-center p-0 m-0'}>{errors.grossPrice.message}</p>
                                            </div>}
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                        </div> : ''}

                    </div>

                    {changedtype === 'MANY' ? <div>

                        <div className={'d-flex align-items-center'}>
                            <h4>Tavar turini qo'shish:* </h4>
                        </div>
                        <div className="col-md-12 table-responsive">
                            <table className={'table'}>
                                <thead>
                                <tr>
                                    <th>Variatsiya</th>
                                    <th>Tavar turining razmeri</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={'col-md-12'}>
                                    <td className={'col-md-3'}>
                                        <select id=""
                                                className={'form-control'}
                                                value={changedVariant}
                                                onChange={(e) => changeVariant(e)}
                                                disabled={match.params.id && changedtype === 'MANY'}
                                        >
                                            <option value={null}>Tanlang</option>
                                            {changedtype === 'MANY' ? MahsulotTurlariReducer?.productType?.map(item =>
                                                <option key={item.id}
                                                        value={item.id}>{item.name}</option>) : ''}
                                        </select>
                                    </td>
                                    <td className={'table-responsive col-md-9'}>
                                        <table className={'table table-bordered'}>
                                            <thead>
                                            <tr className={'bg-primary'}>
                                                <th className={'table-text-add-product'}>Shtrix kodi</th>
                                                <th className={'table-text-add-product'}>Hajmi</th>
                                                <th className={'table-text-add-product'}>Sotib olish narxi</th>
                                                <th className={'table-text-add-product'}>Foyda(%)</th>
                                                <th className={'table-text-add-product'}>Sotish Narxi</th>
                                                <th className={'table-text-add-product'}>Optom Sotish narx</th>
                                                <th className={'table-text-add-product'}>Maxsulot turining rasmi</th>
                                                <th className={'table-text-add-product'}>
                                                    <button onClick={addProductType} type={'button'}
                                                            className={'btn btn-success'}>+
                                                    </button>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {form.map((val, index, ind) =>
                                                !val.delete &&
                                                <tr className={'bg-info'} key={index}>
                                                    <td><input className={'manytype-input'}
                                                               onChange={(e) => changeTypeForm(e, index)}
                                                               name={'barcode'}
                                                               required={'required'}
                                                               value={val.barcode}
                                                               type="text"/></td>
                                                    <td><input className={'manytype-input'}
                                                               onChange={(e) => changeTypeForm(e, index)}
                                                               required={'required'}
                                                               name={'typeName'}
                                                               value={val.typeName} type="text"/></td>
                                                    <td>
                                                        <div className={'d-flex align-items-start'}>
                                                            <div className={'d-flex'}>
                                                                <input className={'manytype-input'}
                                                                       onChange={(e) => changeTypeForm(e, index)}
                                                                       value={val.buyPrice} name={'buyPrice'}
                                                                       required
                                                                       placeholder={'Sotib olish narxi'}
                                                                       type="number"/>
                                                            </div>
                                                            {index === 0 ? <div>
                                                                <button
                                                                    onClick={() => AllChange(index, 'buyPrice')}
                                                                    type={'button'}
                                                                    className={'p-1 btn btn-primary rounded-0'}
                                                                    data-tip="Hammasida qo'llash"
                                                                ><BsCheckAll/></button>
                                                                <ReactTooltip/>
                                                            </div> : ''}
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <div className={'d-flex align-items-start'}>
                                                            <input className={'manytype-input'}
                                                                   onChange={(e) => changeTypeForm(e, index)}
                                                                   name={'profitPercent'}
                                                                   required
                                                                   value={val.profitPercent}
                                                                   placeholder={'foyda'} type="number"/>

                                                            {index === 0 ? <div>
                                                                <button
                                                                    onClick={() => AllChange(index, 'profitPercent')}
                                                                    type={'button'}
                                                                    className={'p-1 btn btn-primary rounded-0'}
                                                                    data-tip="Hammasida qo'llash"
                                                                ><BsCheckAll/></button>
                                                                <ReactTooltip/>
                                                            </div> : ''}
                                                        </div>


                                                    </td>
                                                    <td>
                                                        <div className={'d-flex align-items-start'}>
                                                            <input className={'manytype-input'}
                                                                   onChange={(e) => changeTypeForm(e, index)}
                                                                   name={'salePrice'} required value={val.salePrice}
                                                                   placeholder={'sotish narxi'} type="number"/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={'d-flex align-items-start'}>
                                                            <input className={'manytype-input'}
                                                                   onChange={(e) => changeTypeForm(e, index)}
                                                                   name={'grossPrice'} value={val.grossPrice}
                                                                   placeholder={'optom sotish narxi'} required
                                                                   type="number"/>
                                                            {index === 0 ? <div>
                                                                <button
                                                                    onClick={() => AllChange(index, 'grossPrice')}
                                                                    type={'button'}
                                                                    className={'p-1 btn btn-primary rounded-0'}
                                                                    data-tip="Hammasida qo'llash"
                                                                ><BsCheckAll/></button>
                                                                <ReactTooltip/>
                                                            </div> : ''}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div
                                                            className={'d-flex align-items-center justify-content-around'}>
                                                            <div>
                                                                <input type="file" id='productPicture' value={''}
                                                                       onChange={(e) => saveProductImage(e, index)}/>
                                                            </div>
                                                            <div style={{width: '100px', height: '100px'}}>
                                                                {
                                                                    val.photoId ?
                                                                        <img style={{width: '100%', height: '100%'}}
                                                                             src={`${BaseUrl}/attachment/download/${val.photoId}`}
                                                                             alt="###"/>
                                                                        : <img style={{width: '100%', height: '100%'}}
                                                                               src={defaultProduct}
                                                                               alt="###"/>
                                                                }
                                                            </div>
                                                        </div>


                                                    </td>
                                                    <td>
                                                        {
                                                            val?.update ? " " :
                                                                <button onClick={() => removeProductType(index, val.id)}
                                                                        type={'button'}
                                                                        className={'btn btn-danger'}>-</button>
                                                        }

                                                    </td>
                                                </tr>)

                                            }

                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                    </div> : ''

                    }
                    <div className='d-flex justify-content-end'>
                        <button className={'btn btn-success mt-4'} type={"submit"}>{t('Buttons.6')}</button>
                    </div>

                </div>
            </form>
            <Modal isOpen={activeMeasurement} toggle={toggleMeasurement}>
                <form>
                    <ModalHeader>
                        {t('ProductEdit.12')}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor={'nomi'}>{t('ProductEdit.13')}</label>
                        <input type="text"
                               className={'form-control'}
                               value={measurementName}
                               onChange={(e) => setMeasurementName(e.target.value)}
                               placeholder="O'lchov birligi nomini kiriting..."/>
                        {
                            isCheck && !measurementName &&
                            <div>
                                <p className={'text-danger text-center m-0 p-0'}>Ma'lumotni kiriting!</p>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button type={'button'} className={'btn btn-danger'}
                                onClick={toggleMeasurement}>{t('Buttons.7')}</button>
                        <button type={'button'} className={'btn btn-success'}
                                onClick={saqlakg}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <Modal isOpen={activeCategory} toggle={toggleCategory}>
                <form onSubmit={handleSubmitCategory(saqlaBolim)}>
                    <ModalHeader>
                        {t('ProductEdit.3')}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor={'categoryName'}>{t('ProductEdit.4')}</label>
                        <input type="text" id={'categoryName'} className={'form-control'}
                               placeholder={'Bo\'lim nomi'}
                               {...registerCategory('name', {
                                   required: {
                                       value: true,
                                       message: "Bo'lim nomini kiriting!"
                                   }
                               })}/>
                        {
                            errorsCategory.name &&
                            <div>
                                <p className={'m-0 p-0 text-danger text-center'}>{errorsCategory.name.message}</p>
                            </div>
                        }
                        <label htmlFor={'categoryDescription'}>{t('ProductEdit.4')}</label>
                        <input type="text" id={'categoryDescription'} className={'form-control'}
                               placeholder={'Tavsifi'}
                               {...registerCategory('description')}/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={toggleCategory} type={'button'}
                                className={'btn btn-danger'}>{t('Buttons.7')}</button>
                        <button onClick={saqlaBolim} type={'submit'}
                                className={'btn btn-success'}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <Modal isOpen={activeBrand} toggle={toggleBrand}>
                <ModalHeader>
                    {t('ProductEdit.15')}
                </ModalHeader>
                <ModalBody>
                    <label htmlFor={'brandName'}>{t('ProductEdit.16')}</label>
                    <input onChange={(e) => setBrandName(e.target.value)} value={brandName} type="text"
                           className={'form-control'}
                           id={'brandName'}/>
                    {
                        isCheck && !brandName &&
                        <div>
                            <p className={'text-danger text-center p-0 m-0'}>Ma'lumotni kiriting !</p>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={toggleBrand}>{t('Buttons.7')}</button>
                    <button onClick={saqlabrand} className={'btn btn-success'}>{t('Buttons.6')}</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={typeDataListActive} toggle={() => setTypeDateListActive(prev => !prev)}>
                <ModalHeader>
                    <h4>Turini qo'shish</h4>
                </ModalHeader>
                <ModalBody>
                    {typeDataList &&
                        typeDataList.map(item =>
                            <div key={item.name}>
                                <h4>Turi nomi: {item?.name}</h4>
                                <select name="" id="" className={'form-control'} value={typeData?.id}
                                        onChange={(e) => addElseProductType(e)}>
                                    <option value="all">Tanlang</option>
                                    {
                                        item?.values?.map(val =>
                                            <option key={item?.id} value={val?.id}>{val?.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={() => setTypeDateListActive(prev => !prev)}>Chiqish
                    </button>
                    {
                        addButton ? <button className={"btn btn-primary"} onClick={addTypeToForm}>Qo'shish</button> : ''
                    }
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
        </div>

    )
}

export default connect((MaxsulotlarRoyxariReducer, users, MeasurementReducer, FirmaReducer, BolimReducer, photoreducer, MahsulotTurlariReducer), {
    getProductType,
    getMaxsulotById,
    saveMaxsulotRuyxati,
    editMaxsulotRuyxati,
    getMeasurement,
    saveMeasurement,
    saveBolim,
    getFirma,
    saveFirma,
    getBolim,
    savephoto,
    getProductTypeByID,
    clearPhotoId,
    savePhotoProduct,
})(Taxrirlash)

