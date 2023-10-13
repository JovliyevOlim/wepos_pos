import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import {ImCancelCircle} from "react-icons/im";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import Barcode from "react-barcode";
import {useReactToPrint} from "react-to-print";
import "./shtrixcode.css"
import {useTranslation} from "react-i18next";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import MainHeaderText from "../../../../../Components/MainHeaderText";
import CardBody from "../../../../../Components/CardBody";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../../Components/SelectAnt";
import CommonTable from "../../../../../Components/CommonTable";
import moment from "moment/moment";
import {CloseCircleOutlined} from "@ant-design/icons";

const ShtrixCode = ({MaxsulotlarRoyxariReducer, users, getBarcodeAndName}) => {


    const [mainBranchId, setMainBranchId] = useState(null)
    const [search, setSearch] = useState('')
    const [isView, setIsView] = useState(false)
    const [display,setDisplay] = useState('d-none')

    const [XaridArrayPost, setXaridArrayPost] = useState([])
    const [shtrixData, setShtrixData] = useState({
        rowGap: 60,
        columnGap: 0,
        grid: 1,
        barcodeWIdth: '100%',
        barcodeHeight: 250,
        textHeight: 40,
        numberSize: 40,
        yon: 20,
        top: 20
    })
    const componentRef = useRef();
    const {t} = useTranslation()


    useEffect(() => {
        setXaridArrayPost([])
        setSearch('')
        setIsView(false)
    }, [mainBranchId])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: 'Maxsulot',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Soni',
            dataIndex: 'barcode',
            key: 'barcode',
            render: (item, values) => <div>
                <input className={'form-control w-50'} name={'purchasedQuantity'}
                       value={values.purchasedQuantity}
                       min={0}
                       onChange={(e) => ComboChangeAmount(e, values.productId)}
                       type="number"/>
            </div>
        },
        {
            title: 'Amallar',
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                <ButtonAnt type={'primary'} danger={true} text={'O\'chirish'}
                           onClick={() => DeleteXaridArrayPost(values.productId)} icon={<CloseCircleOutlined/>}/>
            </div>,
        },
    ];


    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if (e.target.value === '') {
            setIsView(false)
        } else {
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                name: e.target.value
            })
        }

    }

    function AddXaridArray(item) {
        setIsView(false)
        setSearch('')
        let a = XaridArrayPost
        let isHave = XaridArrayPost.some(val => val.productId === item.id)
        if (isHave) {
            toast.warning(t('ol.45'))
        } else {
            a.push({
                productId: item.id,
                purchasedQuantity: 1,
                name: item.name,
                barcode: item.barcode,
                price: item.salePrice
            })
        }
        setXaridArrayPost(a)
    }

    function ComboChangeAmount(e, id) {
        let b = XaridArrayPost.map(item => {
            if (item.productId === id) {
                return {...item, purchasedQuantity: e.target.value}
            }
            return item
        })
        setXaridArrayPost(b)
    }

    function DeleteXaridArrayPost(id) {
        let b = XaridArrayPost.filter(item => item.productId !== id)
        setXaridArrayPost(b)
    }

    const handlePrintCopy = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        setDisplay('d-flex')
        setTimeout(()=>{
            handlePrintCopy()
            setXaridArrayPost([])
            setSearch('')
            setDisplay('d-none')
        },1000)
    }


    return (
        <div>
            <div className="col-md-12 d-flex mb-4">
                <MainHeaderText text={t('mah.5')}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex row-gap-4 flex-wrap">
                    <div className="col-md-3 p-2">
                        <SelectAnt name={'Filiallar'} value={mainBranchId ? mainBranchId : users.branchId}
                                   onChange={(e) => setMainBranchId(e === '' ? null : e)}
                                   permission={false}
                                   selectList={users?.branches}
                        />
                    </div>
                    <div className="col-md-6 p-2">
                        <SearchAnt value={search} name={'Mahsulotni qidirish'} onChange={changeSearch}/>
                        {
                            isView && MaxsulotlarRoyxariReducer.productSearch?.length > 0 ?
                                <div className={'Combo-array'}>
                                    {
                                        MaxsulotlarRoyxariReducer.productSearch?.map(item =>
                                            <p
                                                onClick={() => AddXaridArray(item)}
                                            >
                                                {item.name}
                                            </p>
                                        )
                                    }
                                </div>
                                : ''
                        }
                    </div>

                </div>
            </CardBody>
            {
                XaridArrayPost.length > 0 && <CardBody>
                    <div className="table-responsive">
                        <CommonTable data={XaridArrayPost} columns={columns} size={0} page={XaridArrayPost.length}
                                     pagination={false}/>
                    </div>
                </CardBody>
            }

            <CardBody>
                <div className={'col-md-10 mt-4 mb-5 offset-1'}>
                    {/*<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='grid'>{t('mah.11')}</label>*/}
                    {/*        <input className='form-control' min='1' type='number' value={shtrixData.grid}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, grid: e.target.value}))}*/}
                    {/*               placeholder={t('mah.11')} name='grid' id='grid'/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='barcodeWidth'>{t('mah.12')} </label>*/}
                    {/*        <input className='form-control' min='1' max='8' type='number'*/}
                    {/*               value={shtrixData.barcodeWIdth}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, barcodeWIdth: e.target.value}))}*/}
                    {/*               placeholder={t('mah.12')} name='barcodeWidth' id='barcodeWidth'/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='barcodeHeight'>{t('mah.13')}</label>*/}
                    {/*        <input className='form-control' min='1' type='number' value={shtrixData.barcodeHeight}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, barcodeHeight: e.target.value}))}*/}
                    {/*               placeholder={t('mah.13')} name='barcodeHeight' id='barcodeHeight'/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='textHeight'>{t('mah.14')} </label>*/}
                    {/*        <input className='form-control' min='1' type='number' value={shtrixData.textHeight}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, textHeight: e.target.value}))}*/}
                    {/*               placeholder={t('mah.14')} name='textHeight' id='textHeight'/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='numberSize'>{t('mah.15')} </label>*/}
                    {/*        <input className='form-control' min='1' type='number' value={shtrixData.numberSize}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, numberSize: e.target.value}))}*/}
                    {/*               placeholder={t('mah.15')} name='numberSize' id='numberSize'/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='rowGap'>{t('mah.16')} </label>*/}
                    {/*        <input className='form-control' min='0' type='number' value={shtrixData.rowGap}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, rowGap: e.target.value}))}*/}
                    {/*               placeholder={t('mah.16')} name='rowGap' id='rowGap'/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='columnGap'>{t('mah.17')}</label>*/}
                    {/*        <input className='form-control' min='0' type='number' value={shtrixData.columnGap}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, columnGap: e.target.value}))}*/}
                    {/*               placeholder={t('mah.17')} name='columnGap' id='columnGap'*/}
                    {/*               disabled={shtrixData.grid <= 1}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='yon'>{t('mah.18')} </label>*/}
                    {/*        <input className='form-control' min='0' type='number' value={shtrixData.yon}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, yon: e.target.value}))}*/}
                    {/*               placeholder={t('mah.18')} name='yon' id='yon'*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <label className='font-w600' htmlFor='top'>{t('mah.19')} </label>*/}
                    {/*        <input className='form-control' min='0' type='number' value={shtrixData.top}*/}
                    {/*               onChange={(e) => setShtrixData((prev) => ({...prev, top: e.target.value}))}*/}
                    {/*               placeholder={t('mah.19')} name='top' id='top'*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={`${display} d-flex justify-content-between flex-wrap gap-2 align-items-center w-100`} ref={componentRef}>
                            {
                                XaridArrayPost.map((item) => {
                                    let array = [];
                                    let i = 0;
                                    while (i < item.purchasedQuantity) {
                                        i++;
                                        array = [...array,
                                            <div className={'barcode-card-check'}>
                                            <p className={"barcode-card-price"}>{item.price} so'm</p>
                                            <p className={"barcode-card-text"}>{item.name}</p>
                                            <div className={'d-flex col-md-12 mb-2'}>
                                                <div className="col-md-6 barcode-icon">
                                                    <Barcode format="CODE128"  value={item.barcode}/>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>

                                        </div>]
                                    }
                                    return array;
                                })
                            }
                    </div>
                </div>
                <div  className={`d-flex justify-content-between flex-wrap gap-2 align-items-center w-100`}>
                    {
                        XaridArrayPost.map((item) => <div className={'barcode-card'}>
                                <p className={"barcode-card-price"}>{item.price} so'm</p>
                                <p className={"barcode-card-text"}>{item.name}</p>
                                <div className={'d-flex col-md-12 mb-2'}>
                                    <div className="col-md-6 barcode-icon">
                                        <Barcode format="CODE128"  value={item.barcode}/>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div style={{display: 'flex', justifyContent: 'end', marginTop: 10}}>
                            <button className={'btn btn-primary'} onClick={handlePrint}>{t('mah.10')}</button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </div>
    )
}

export default connect((users, MaxsulotlarRoyxariReducer),
    {getBarcodeAndName})(ShtrixCode)